# CADENCE: Gamification Project Plan (Positive Alien)
**Senior AI Engineer:** Antigravity (AI Hero Mode)
**Status:** Initial Design / Grilling Phase

## Shared Design Concept (Gamification)
Celem jest zwiększenie retencji uczniów poprzez system nagród, którego twarzą jest "Positive Alien".

## Vertical Slices (Tracer Bullets)
1. **VS1: Point Pulse** 
   - DB: `points` field w user stats.
   - API: `POST /api/gamification/heartbeat` (dodaje 5 pkt za sesję).
   - UI: Licznik punktów w `Header.tsx`.
2. **VS2: Alien Streak**
   - Logic: Obliczanie ciągłości dni.
   - UI: Wizualizacja Obcego w `Hero.tsx` zmieniająca się wraz ze streakiem.
3. **VS3: Levels & XP**
   - Logic: XP thresholds.
   - UI: Progress bar poziomu.

## Sub-agent Findings (Integrated)
- UX: Używamy motywu Obcego jako mentora.
- DB: Tabela stats oddzielona od Core User dla wydajności.
- BE: Logika czasu oparta o UTC + Client Offset.
