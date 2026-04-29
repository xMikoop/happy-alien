# 👽 Positive Alien Academy

**Absurdalna platforma edukacyjna w klimacie Monty Pythona, zbudowana przez armię subagentów AI.**

![Stack](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-r184-black?logo=three.js)
![Tailwind](https://img.shields.io/badge/Tailwind-4.2-06B6D4?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-0055FF)
![Built by AI Agents](https://img.shields.io/badge/Built_by-11_AI_Agents-ec4899)

---

## 🚀 Demo

```
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) i spotkaj Mr. Aliena.

---

## 🧠 Co to jest?

**Positive Alien Academy** to eksperymentalny projekt edukacyjny zbudowany w całości metodologią **AI Hero** (Matt Pocock). 
Cały kod – od logiki grywalizacji, przez system rang, aż po absurdalne teksty – został wygenerowany przez **zespół 11 wyspecjalizowanych subagentów AI** orkiestrowanych przez Senior AI Engineera.

### Cechy:
- 🛸 **Galaktyczne tło 3D** z flotą UFO rosnącą wraz z Twoimi punktami XP
- 👽 **Gadający Alien Mentor** w stylu Monty Pythona (cytaty o martwych papugach, hiszpańskiej inkwizycji i herbacie)
- 🏆 **System rang**: od "Zdezorientowanego Pyłku Gwiezdnego" po "Wielkiego Przedwiecznego Monty'ego"
- 📊 **Leaderboard** z absurdalnymi konkurentami (Sir Lancelot du Łączenie Tablic, Dead Parrot Memory Leak...)
- 🎨 **Skaczące kosmity** na każdej podstronie
- 🌐 **5 podstron** z absurdalną treścią o architekturze systemowej

---

## 🏗️ Architektura Subagentów

Projekt został zbudowany przez **11 autonomicznych agentów AI**, każdy z własną personą i specjalizacją:

| Agent | Persona | Odpowiada za |
|-------|---------|--------------|
| **FRONTEND_DEV** | Qwen Coder+ | Komponenty React/Next.js |
| **STYLIST** | Qwen Coder+ | Tailwind CSS, animacje Framer Motion |
| **CONTENT** | Gemini Flash | Teksty, copy, absurdalne opisy |
| **DB_ARCHITECT** | Gemini Flash | Struktury danych, JSON schema |
| **TESTER** | Qwen Coder+ | Vitest unit tests |
| **UX_DESIGNER** | Gemini Flash | User flows, dostępność |
| **UI_DESIGNER** | Gemini Flash | Design system, kolory |
| **BACKEND_DEV** | Qwen Coder+ | API, logika biznesowa |
| **REVIEWER** | Gemini Flash | Code review, TypeScript strict |
| **DEVOPS** | Qwen Flash | Deploy, env |
| **SCOUT** 🕵️ | Qwen Coder+ | Monitoruje wersje NPM, sprawdza aktualność |

### Jak to działa:

```bash
# Odpal agenta z zadaniem
python _agent_system/run_agent.py --role FRONTEND_DEV --task "Stwórz komponent X"

# Zwiad techniczny (sprawdza wersje w NPM)
python _agent_system/tech_scout.py

# TDD Cycle (TESTER pisze test → FRONTEND implementuje)
python _agent_system/tdd_cycle.py
```

Wszystkie outputy agentów trafiają do `feedback/` z timestampem.

---

## 📁 Struktura projektu

```
src/
├── app/
│   ├── page.tsx              # Strona główna z Hero
│   ├── layout.tsx            # Root layout z Providerem
│   ├── leaderboard/page.tsx  # Ranking absurdalnych konkurentów
│   ├── design/page.tsx       # "Projektowanie systemów - jak nie zabijać papugi"
│   ├── microservices/page.tsx # "Rozbicie papugi na kawałki"
│   ├── databases/page.tsx    # "Grobowiec dla papug"
│   ├── devops/page.tsx       # "Zaklęcie które nie działa"
│   └── test/page.tsx         # Strona testowa
├── components/
│   ├── Hero.tsx              # Sekcja powitalna
│   ├── Header.tsx            # Nawigacja + licznik XP + ranga
│   ├── Footer.tsx            # Stopka Positive Alien Productions
│   ├── AlienMentor.tsx       # Gadający obcy z dymkami
│   ├── GalaxyBackground.tsx  # Kosmiczne tło z flotą UFO
│   ├── JumpingAliens.tsx     # Skaczące 👽 animacje
│   └── Leaderboard.tsx       # Tabela wyników
├── context/
│   └── GamificationContext.tsx # Globalny stan grywalizacji (XP, localStorage)
└── lib/
    └── ranks.ts              # Definicje 5 absurdalnych rang
```

---

## 🎮 System Grywalizacji

| Mechanika | Opis |
|-----------|------|
| **XP Points** | +5 pkt za wizytę (zapis w localStorage) |
| **Invasion Fleet** | 1 statek UFO w tle na każde 50 XP |
| **Rangi** | 5 poziomów z nazwami Monty Pythona |
| **Leaderboard** | 10 absurdalnych konkurentów AI |
| **Alien Mentor** | Losowe komiczne cytaty co 2 sekundy |

### Rangi:

| XP | Ranga |
|----|-------|
| 0 | Zdezorientowany Pyłek Gwiezdny |
| 100 | Aspirujący Pożeracz Herbaty |
| 300 | Rycerz, który mówi 'Ni!' |
| 600 | Minister Głupich Kroków Kosmicznych |
| 1000 | Wielki Przedwieczny Monty |

---

## 🧪 Testy

```bash
npx vitest run
```

- `gamification.test.ts` – system punktów
- `invasion.test.ts` – logika floty UFO
- `ranks.test.ts` – progi rang
- `Header.test.tsx` – nawigacja i mobile menu
- `Hero.test.tsx` – renderowanie strony głównej

---

## 🔮 Roadmap (Vertical Slices)

- [x] VS1: Point Pulse (system XP)
- [x] VS2: Alien Invasion Meter (flota UFO w tle)
- [x] VS3: Levels & Ranks (absurdalne rangi)
- [x] VS4: Phantom Leaderboard (konkurenci AI)
- [ ] VS5: Achievements (odznaki Monty Pythona)

---

## ⚠️ Znane bugi

- `useGamification` hook (w `hooks/`) jest przestarzały – użyto `context/GamificationContext`
- Port 3000 może być zajęty przez zombie proces – użyj `npx next dev -p 3007`

---

## 📜 Licencja

MIT — rób co chcesz, byle z absurdem.

---

**"Nikt nie spodziewa się Hiszpańskiej Inkwizycji... ani tej platformy!"** 👽🛸☕
