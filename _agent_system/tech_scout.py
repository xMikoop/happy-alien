#!/usr/bin/env python3
import json
import subprocess
from pathlib import Path
import sys

# Importujemy run_agent z istniejacego delegatora
sys.path.append(str(Path(__file__).parent))
from run_agent import run_agent

PROJECT_ROOT = Path(__file__).parent.parent
PACKAGE_JSON = PROJECT_ROOT / "package.json"
TECH_RADAR = PROJECT_ROOT / "feedback" / "TECH_RADAR.md"

def get_installed_versions():
    if not PACKAGE_JSON.exists():
        return "Brak package.json"
    
    with open(PACKAGE_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)
        deps = data.get("dependencies", {})
        dev_deps = data.get("devDependencies", {})
    
    report = "AKTUALNE ZALEZNOSCI W PROJEKCIE:\n"
    for name, ver in {**deps, **dev_deps}.items():
        report += f"- {name}: {ver}\n"
    return report

def get_npm_latest():
    try:
        r = subprocess.run(["bash", str(PROJECT_ROOT / "_agent_system" / "real_versions.sh")], capture_output=True, text=True)
        return r.stdout
    except:
        return "Nie udalo sie pobrac danych z NPM."

def scout_mission():
    print("🚀 SCOUT wyrusza na zwiad z dostępem do internetu (NPM)...")
    
    # 1. Zbierz dane o wersjach
    versions = get_installed_versions()
    latest_on_npm = get_npm_latest()
    
    # 2. Zadanie dla SCOUTa
    task = f"""Analizuj zaleznosci projektu na dzien 2026-04-29.

DANE Z NPM (STABILNE WERSJE):
{latest_on_npm}

NASZE WERSJE (package.json):
{versions}

ZADANIE:
1. Porownaj wersje. Czy jestesmy na 'latest'?
2. Czy nasze wersje (np. Next 16.2.4) sa oficjalnie wspierane? (Tak, dane z NPM to potwierdzaja).
3. Podaj jeden 'Pro Tip' dotyczacy nowosci w tych wersjach (np. co nowego w Tailwind 4 lub Next 16).

WYPLUJ TYLKO RAPORT MD.
"""

    # 3. Odpal agenta SCOUT
    result = run_agent("SCOUT", task)
    
    if result["ok"]:
        # 4. Zapisz/Zaktualizuj Tech Radar
        radar_content = f"""# 📡 TECH RADAR - KURWIX ACADEMY
Ostatni zwiad: {subprocess.check_output(['date', '/t'], shell=True).decode().strip()}

{result['output']}

---
*Raport wygenerowany automatycznie przez PI-SCOUT*
"""
        TECH_RADAR.write_text(radar_content, encoding="utf-8")
        print(f"✅ Tech Radar zaktualizowany: {TECH_RADAR.name}")
    else:
        print(f"❌ Zwiad sie nie powiódł: {result['output']}")

if __name__ == "__main__":
    scout_mission()
