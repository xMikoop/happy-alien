#!/usr/bin/env python3
"""
Delegator v2 — 10 agentów Next.js, tylko sprawdzone modele, 120s timeout, full UTF-8.
"""
import argparse, subprocess, sys, time, json, io
from pathlib import Path

HERE = Path(__file__).parent
PROMPTS = HERE / "prompts"
FEEDBACK = HERE.parent / "feedback"
AGENTS_JSON = HERE / "agents.json"
FEEDBACK.mkdir(parents=True, exist_ok=True)

AGENTS = json.loads(AGENTS_JSON.read_text(encoding="utf-8"))
PI_CMD = r"C:\Users\mikol\AppData\Roaming\npm\pi.cmd"

# Fix stdout/stderr dla Windowsa
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')


def run_agent(role: str, task: str, model_override: str | None = None) -> dict:
    """Uruchamia agenta. Zwraca dict z output, model, czas, status."""
    agent = AGENTS.get(role)
    if not agent:
        return {"ok": False, "output": f"[BLAD] Nieznana rola: {role}", "model": "", "time": 0}

    prompt_file = PROMPTS / f"{role}.txt"
    model = model_override or agent["model"]
    short_model = model.split("/")[-1]
    system_prompt_text = prompt_file.read_text(encoding="utf-8").strip()

    # Task z dyrektywa wykonawcza
    full_task = f"{task}\n\nPOKAZ TYLKO WYNIK (KOD LUB DECYZJE). Zadnych pytan."

    print(f"\n[{role}] @ {short_model} | {task[:80]}...", file=sys.stderr, flush=True)

    cmd = [
        PI_CMD, "--model", model, "--no-session", "-p",
        "--system-prompt", system_prompt_text,
        full_task,
    ]

    start = time.time()
    try:
        r = subprocess.run(cmd, capture_output=True, timeout=120)
        elapsed = time.time() - start
        
        # Debug: wydrukuj surowy output na konsole dewelopera
        # print(f"DEBUG STDOUT: {r.stdout}", file=sys.stderr)
        # print(f"DEBUG STDERR: {r.stderr}", file=sys.stderr)

        output = r.stdout.decode("utf-8", errors="replace").strip()
        error = r.stderr.decode("utf-8", errors="replace").strip()

        if r.returncode != 0 or not output:
            msg = f"FAIL (rc={r.returncode}, {elapsed:.1f}s)"
            if error:
                msg += f": {error[:200]}"
            print(f"  [{role}] {msg}", file=sys.stderr, flush=True)
            return {"ok": False, "output": f"[BLAD] {msg}", "model": short_model, "time": elapsed}

        # Zapisz raport
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
        return {"ok": False, "output": "[BLAD] Timeout (120s)", "model": short_model, "time": t}
    except Exception as e:
        t = time.time() - start
        print(f"  [{role}] EXCEPTION: {e}", file=sys.stderr, flush=True)
        return {"ok": False, "output": f"[BLAD] {e}", "model": short_model, "time": t}


def test_agents():
    """Szybki test — wysyla 'Test' do kazdego agenta."""
    print("=== TEST 10 AGENTÓW ===", file=sys.stderr, flush=True)
    results = {}
    for role, agent in AGENTS.items():
        prompt_file = PROMPTS / f"{role}.txt"
        system_prompt_text = prompt_file.read_text(encoding="utf-8").strip()
        start = time.time()
        try:
            r = subprocess.run(
                [PI_CMD, "--model", agent["model"], "--no-session", "-p",
                 "--system-prompt", system_prompt_text, "Odpowiedz OK"],
                capture_output=True, timeout=12,
            )
            t = time.time() - start
            out = r.stdout.decode("utf-8", errors="ignore").strip()
            ok = r.returncode == 0 and len(out) > 0
            results[role] = {"ok": ok, "time": t}
            status = f"OK {t:.1f}s" if ok else f"FAIL {t:.1f}s"
        except:
            t = time.time() - start
            results[role] = {"ok": False, "time": t}
            status = f"ERR {t:.1f}s"
        print(f"  {role:<18} {status}", file=sys.stderr, flush=True)

    ok_count = sum(1 for r in results.values() if r["ok"])
    print(f"  => {ok_count}/{len(AGENTS)} gotowych\n", file=sys.stderr, flush=True)
    return results


def list_agents():
    """Wypisuje tabelę."""
    print(f"{'#':<3} {'Agent':<18} {'Model':<32} {'Speed':<8} {'Spec'}")
    print("-" * 95)
    for i, (role, agent) in enumerate(AGENTS.items(), 1):
        m = agent["model"].split("/")[-1]
        print(f"{i:<3} {role:<18} {m:<32} {agent['speed']:<8} {agent['desc']}")


def main():
    parser = argparse.ArgumentParser(description="Next.js Agent Delegator v2")
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

    if args.test:
        test_agents()
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
