#!/usr/bin/env python3
"""TDD Cycle: TESTER writes failing test for Header"""
import subprocess, time, re
from pathlib import Path

PI = r"C:\Users\mikol\AppData\Roaming\npm\pi.cmd"
FEEDBACK = Path("C:/Users/mikol/nextjs_project/feedback")
FEEDBACK.mkdir(exist_ok=True)
TEST_DIR = Path("C:/Users/mikol/nextjs_project/__tests__")
TEST_DIR.mkdir(exist_ok=True)

header_code = Path("C:/Users/mikol/nextjs_project/src/components/Header.tsx").read_text("utf-8")

sp = "Tester TDD. WYKONUJ ZADANIA. Wypluj TYLKO kod testu Vitest. Bez pytan, bez wyjasnien."

task = f"""KOMPONENT:
```tsx
{header_code}
```

NAPISZ PLIK __tests__/Header.test.tsx. TESTY:
1. renderuje brand KURWIX
2. ma 5 linkow nawigacji
3. mobile menu domyslnie ukryte (brak mobile-menu w DOM)
4. klikniecie hamburgera pokazuje menu

Uzyj: vitest, @testing-library/react, describe/it/expect, render, screen, fireEvent.
WYPLUJ TYLKO KOD. BEZ WYJASNIEN."""

print(f"Task length: {len(task)} chars")
print("Calling pi -p...")

r = subprocess.run(
    [PI, "--model", "qwen-direct/qwen3-coder-plus", "--no-session", "-p",
     "--system-prompt", sp, task],
    capture_output=True, timeout=90, text=False
)
out = r.stdout.decode("utf-8", "ignore").strip()
print(f"rc={r.returncode}, output={len(out)} chars")
print(f"First 300: {out[:300]}")

# Extract code from markdown
code_match = re.search(r"```(?:tsx?|typescript)?\n(.*?)```", out, re.DOTALL)
code = code_match.group(1).strip() if code_match else out

# Save
ts = time.strftime("%Y%m%d_%H%M%S")
fpath = FEEDBACK / f"TESTER_TDD_{ts}.md"
fpath.write_text(f"# TESTER TDD - Header Test\n\n```tsx\n{code}\n```", encoding="utf-8")
(TEST_DIR / "Header.test.tsx").write_text(code, encoding="utf-8")

print(f"\nSAVED: {len(code)} chars -> __tests__/Header.test.tsx")
print(f"Feedback: {fpath.name}")
