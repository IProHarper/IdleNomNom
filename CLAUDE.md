# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

IdleNomNom — a browser-based idle/clicker game (Pac-Man-style "Nom" eats dots/squares/triangles) built with plain HTML/CSS/JS. No build step, no bundler, no package manager, no test suite. Open `index.html` directly (or serve the folder statically) to run it.

## Development

- There is no build/lint/test command — this is static HTML/CSS/JS served as-is.
- To run locally: open `index.html` in a browser, or serve the repo root with any static file server (e.g. `python3 -m http.server`) so ES module imports resolve correctly (`file://` will break `type="module"` script loading in some browsers).
- jQuery is loaded from a CDN in `index.html`; everything else is native ES modules under `scripts/`.
- Debugging: use browser devtools. `console.log` calls already exist at key state-machine points (e.g. stage transitions in `main.js`).
- Save data lives in `localStorage` (keys: `gameState`, `Upgrades`, `shopUpgrades`, `Options`). Clear these keys in devtools to reset game state while testing, or use the in-game Reset button.

## Architecture

The game is a single page (`index.html`) with a `<canvas id="gameCanvas">` where entities are drawn, plus DOM-based UI panels (upgrade lists, stats, modals) that are toggled/updated via jQuery. All game logic lives in `scripts/`, loaded as ES modules from `main.js`.

**Core data flow:**
- `scripts/data.js` is the single source of truth: exported mutable objects `gameState` (all player progress/currencies), `upgrades` (every purchasable upgrade's cost/level/scale/effect config), `shopUpgrades`, `options` (display toggles), and the live entity lists (`dotList`, `squareList`, `triangleList`, `roboList`). Other modules import and mutate these directly — there is no central store/dispatch pattern.
- `scripts/break_infinity.js` provides the `Decimal` big-number type (global, used for all currency/score values so numbers can grow beyond `Number.MAX_SAFE_INTEGER`, standard for idle games).
- `scripts/main.js` is the entry point: on `$(document).ready`, it loads the save, initializes display/canvas, wires up global click handlers for `.upgradeBttn` / `.maxBttn`, sets up mouse/touch tracking for the Nom character, and starts the game loops (`setInterval` for display refresh + autosave). It also exports `progressGameStage()`, the stage-gate checker that unlocks features (Nomscension, squares, triangles) based on thresholds in `gameStages` (`data.js`).

**Entity/resource pattern (repeated per resource type — dots, squares, triangles):**
Each resource type follows the same shape across three parallel files/sections:
- `scripts/dots.js` / `scripts/squares.js` / `scripts/triangle.js` — the entity class (movement, canvas bounce physics, collision with the Nom mouth, spawn/eat logic).
- `scripts/consumables.js` — spawn functions that create entities and push them into the corresponding list in `data.js`.
- `scripts/Upgrades/squareUpgrades.js`, `scripts/Upgrades/triangleUpgrades.js`, `scripts/Upgrades/nomupgrades.js` — apply an upgrade's effect (increase value/multi/spawn rate/max count) by reading `upgrades[id]` and writing back into `gameState`.
- `scripts/util.js` — shared setters (`setDotsALL`, `setSquaresALL`, `setDotSpawnRate`, `increaseCost`, etc.) that recompute derived `gameState` values from current upgrade levels; these are re-run after any upgrade purchase and on save load.

Triangles are the newest/least-built-out resource type (see `scripts/triangle.js`, added most recently per git history) — expect more gaps there than in dots/squares.

**Upgrades:** every upgrade is a plain object literal in `upgrades` (`data.js`) with `cost`, `baseCost`, `upgradeScale` (cost growth exponent), `level`, `maxlevel`, `resetTier` (0 = resets on Nomscension prestige, 1 = Nom-Coin-tier persists, 2 = triangle-tier persists), and `type` (which currency pays for it: `score`, `nomCoins`, `square`, `triangle`). `scripts/buttonHandling.js` and `scripts/upgradeButtons.js` handle click → afford check → apply effect (via the per-type Upgrades module) → `increaseCost()` → re-render button text/level. Buying "Max" repeatedly applies single-level purchases until unaffordable.

**Prestige ("Nomscension"):** resetting progress in exchange for permanent Nom Coins. Gated by `gameStages` thresholds in `data.js`; triggered via the modal in `index.html` (`#nomscendBttn`). `scripts/prestigeAnimation.js` handles the full-screen reset animation/overlay (`#prestigeOverlay`). `resetUpgrades()` in `gameFiles.js` zeroes out any upgrade with `resetTier <= 0` on prestige.

**Save/load:** `scripts/gameFiles.js` serializes `gameState`/`upgrades`/`shopUpgrades`/`options` to `localStorage` as JSON (autosaved every 30s from `main.js`, plus manual Save button). On load, `compareSaveData()` merges the saved JSON against the current in-code defaults key-by-key — this is what lets old saves survive when new upgrades/fields are added, and lets balance-relevant fields (`upgradeScale`, `baseCost`, `increase`, `maxlevel`, `minlevel`, `resetTier`) always be overwritten from code rather than trusting a stale save. `Decimal` fields round-trip as strings and are reconstructed with `new Decimal(...)` on load — when adding a new `Decimal`-typed field to `gameState`/`upgrades`, make sure it's handled by this reconstruction logic (`loadGameStateData`/`loadUpgradeData`).

**Display:** `scripts/display.js` owns all DOM text/number updates (stats panel, resource counters, progress bar) and the canvas render loop (`updateCanvas`, drawing dots/squares/triangles/robo-noms/the Nom mouth each frame based on `options` toggles). UI panel switching (Dots/Nom/Square/Triangle upgrade tabs, Stats/Customize side panels) is plain show/hide via `.menu-toggle-btn` click handlers, not a routing system.

## Styling

- `style.css` is the main stylesheet; `mobile.css` layers on responsive/mobile overrides (both linked in `index.html`, in that order).
- Color/spacing tokens are CSS custom properties defined on `:root` in `style.css` (`--primary-color`, `--bg-primary`, `--bg-secondary`, `--bg-card`, `--text-primary`, `--text-secondary`, `--border-color`, `--shadow`, etc.) — prefer reusing these over hardcoding colors.
- The "Customize" panel (`#customize-container` in `index.html`) offers alternate color themes (Cillian/Conall/Aidan/DAD/Lachlan/Rino/Mi-chan/Kin-san modes) as inline-styled buttons; if extending theming, check how `enableDefaultMode` etc. are wired up in `buttonHandling.js`/`features.js` before adding a new mode.
- Many one-off styles are still inline in `index.html` (e.g. modal text colors, button backgrounds) rather than in the stylesheets — when doing cleanup, prefer migrating these into `style.css` using the existing custom properties rather than leaving new inline styles.

## Known rough edges (see TODO.txt files)

- `scripts/gameStage.js` is currently an empty file — the stage-progression logic actually lives in `main.js` (`progressGameStage`) instead.
- Upgrades are plain object literals with duplicated shape/behavior across dots/squares/triangles/nom — there's a standing TODO to convert these to classes (cost scaling, level-up, purchase-check as methods) rather than the current copy-pasted per-upgrade-type functions in `util.js` / `Upgrades/*.js`.
- Display updates are not optimized (full stat re-render on interval rather than diffed/targeted updates) — noted as a cleanup target, not a bug.
- Save data is plain JSON in `localStorage`, unencrypted (noted as a TODO, not yet addressed).
