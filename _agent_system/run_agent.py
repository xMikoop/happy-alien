#!/usr/bin/env python3
"""
Delegator v4 — agenci z kontekstem przez plik (omija limit command line Windowsa).
"""
import argparse, subprocess, sys, time, json, io, os, tempfile
from pathlib import Path

HERE = Path(__file__).parent
PROJECT = HERE.parent
PROMPTS = HERE / "prompts"
FEEDBACK = PROJECT / "feedback"
AGENTS_JSON = HERE / "agents.json"
FEEDBACK.mkdir(parents=True, exist_ok=True)

AGENTS = json.loads(AGENTS_JSON.read_text(encoding="utf-8"))
PI_CMD = r"C:\Users\mikol\AppData\Roaming\npm\pi.cmd"

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

CONTEXT_FILES = [
    "src/app/layout.tsx", "src/app/page.tsx",
    "src/app/design/page.tsx", "src/app/microservices/page.tsx",
    "src/app/databases/page.tsx", "src/app/devops/page.tsx",
    "src/app/leaderboard/page.tsx",
    "src/components/Header.tsx", "src/components/Hero.tsx",
    "src/components/Footer.tsx", "src/components/AlienMentor.tsx",
    "src/components/GalaxyBackground.tsx", "src/components/JumpingAliens.tsx",
    "src/components/Leaderboard.tsx",
    "src/context/GamificationContext.tsx", "src/lib/ranks.ts",
    "src/app/globals.css", "package.json",
]

def load_context() -> str:
    parts = []
    for f in CONTEXT_FILES:
        path = PROJECT / f
        if path.exists():
            try:
                content = path.read_text(encoding="utf-8")
                parts.append(f"## {f}\n```\n{content}\n```")
            except:
                pass
    return "\n\n".join(parts)

_context_cache = None
def get_context() -> str:
    global _context_cache
    if _context_cache is None:
        _context_cache = load_context()
    return _context_cache

def run_agent(role: str, task: str, model_override: str | None = None) -> dict:
    agent = AGENTS.get(role)
    if not agent:
        return {"ok": False, "output": f"[BLAD] Nieznana rola: {role}", "model": "", "time": 0}

    prompt_file = PROMPTS / f"{role}.txt"
    model = model_override or agent["model"]
    short_model = model.split("/")[-1]
    system_prompt_text = prompt_file.read_text(encoding="utf-8").strip()

    # Zapisz kontekst do pliku
    ctx_file = PROJECT / ".agent_context.txt"
    ctx_file.write_text(get_context(), encoding="utf-8")

    full_task = f"""PRZECZYTAJ plik .agent_context.txt w katalogu projektu — to aktualny KOD WSZYSTKICH plikow.

ZADANIE:
{task}

WYMAGANIA:
1. Napisz PEŁNY kod zmienionych plikow (zero skrotow, zero '...reszta bez zmian')
2. Podaj sciezke pliku przed kazdym blokiem kodu w formacie:
   ### sciezka/do/pliku.tsx
   ```tsx
   ...caly kod...
   ```
3. NIE задавай pytan — po prostu napisz kod
4. Odpowiadaj po polsku"""

    print(f"\n[{role}] @ {short_model} | {task[:80]}...", file=sys.stderr, flush=True)

    cmd = [
        PI_CMD, "--model", model, "--no-session", "-p",
        "--system-prompt", system_prompt_text,
        full_task,
    ]

    start = time.time()
    try:
        r = subprocess.run(cmd, capture_output=True, timeout=180, cwd=str(PROJECT))
        elapsed = time.time() - start

        output = r.stdout.decode("utf-8", errors="replace").strip()
        error = r.stderr.decode("utf-8", errors="replace").strip()

        if r.returncode != 0 or not output:
            msg = f"FAIL (rc={r.returncode}, {elapsed:.1f}s)"
            if error:
                msg += f": {error[:200]}"
            print(f"  [{role}] {msg}", file=sys.stderr, flush=True)
            return {"ok": False, "output": f"[BLAD] {msg}", "model": short_model, "time": elapsed}

        ts = time.strftime("%Y%m%d_%H%M%S")
        out_file = FEEDBACK / f"{role}_{ts}.md"
        out_file.write_text(
            f"# {role} @ {short_model}\n"
            f"## Czas\n{elapsed:.1f}s | {len(output)} znaków\n"
            f"## Zadanie\n{task}\n"
            f"## Wynik\n{output}\n",
            encoding="utf-8",
        )

        print(f"  [{role}] OK {elapsed:.1f}s, {len(output)} znaków -> {out_file.name}", file=sys.stderr, flush=True)
        return {"ok": True, "output": output, "model": short_model, "time": elapsed, "file": str(out_file)}

    except subprocess.TimeoutExpired:
        t = time.time() - start
        print(f"  [{role}] TIMEOUT ({t:.1f}s)", file=sys.stderr, flush=True)
        return {"ok": False, "output": "[BLAD] Timeout (180s)", "model": short_model, "time": t}
    except Exception as e:
        t = time.time() - start
        print(f"  [{role}] EXCEPTION: {e}", file=sys.stderr, flush=True)
        return {"ok": False, "output": f"[BLAD] {e}", "model": short_model, "time": t}


def list_agents():
    print(f"{'#':<3} {'Agent':<18} {'Model':<32} {'Speed':<8} {'Spec'}")
    print("-" * 95)
    for i, (role, agent) in enumerate(AGENTS.items(), 1):
        m = agent["model"].split("/")[-1]
        print(f"{i:<3} {role:<18} {m:<32} {agent['speed']:<8} {agent['desc']}")


def main():
    parser = argparse.ArgumentParser(description="Next.js Agent Delegator v4")
    parser.add_argument("--role", help="Rola agenta")
    parser.add_argument("--task", help="Zadanie")
    parser.add_argument("--model", default=None, help="Nadpisz model")
    parser.add_argument("--list", action="store_true", help="Lista agentow")
    parser.add_argument("--test", action="store_true", help="Test wszystkich")
    parser.add_argument("--all", action="store_true", help="Deleguj do wszystkich")

    args = parser.parse_args()

    if args.list:
        list_agents()
        return

    if args.all and args.task:
        print(f"=== DELEGUJE DO WSZYSTKICH: {args.task[:60]}... ===")
        for role in AGENTS:
            run_agent(role, args.task, args.model)
        return

    if not args.role or not args.task:
        parser.print_help()
        print(f"\nDostepne role: {', '.join(AGENTS.keys())}")
        return

    result = run_agent(args.role, args.task, args.model)
    print(result["output"])


if __name__ == "__main__":
    main()
