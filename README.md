# Exam Interface

[![Deploy](https://github.com/anikak206/exam-interface/actions/workflows/pages.yml/badge.svg)](https://github.com/anikak206/exam-interface/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-offline--capable-blueviolet)

A polished, accessible, offline-capable online exam simulation web app.
Built as a Web Programming mini-project and upgraded into a portfolio-grade
single-page application — no build step, no dependencies.

**Live demo:** https://anikak206.github.io/exam-interface/
(after enabling GitHub Pages: Settings → Pages → Source `main` / root)

![Screenshot](image.png)

## Features

- **3 subjects** (Math, Physics, Chemistry) × 6 questions = 18 questions
- **Countdown timer** with auto-submit at zero and a 1-minute warning toast
- **Question navigation sidebar** with answered (green) / marked (amber) colouring
- **Mark for review** toggle per question
- **Keyboard shortcuts:** `←`/`→` navigate, `1`–`4` select option, `Ctrl+Enter` submit
- **Progress persistence** via `localStorage` (survives refresh / tab close)
- **`beforeunload` warning** + **tab-switch detection** banner
- **Results table** with per-question breakdown (your answer vs correct answer)
- **Dark / light theme** toggle (persisted)
- **Responsive layout** (mobile-friendly breakpoints)
- **PWA**: installable + works offline via service worker
- **Accessible**: ARIA labels, `aria-live` progress, keyboard focus outlines

## Tech stack

- Vanilla HTML5 / CSS3 / JavaScript (ES6+) — zero dependencies
- `localStorage` for state, `visibilitychange` for tab-switch detection
- Service Worker + Web App Manifest for offline/PWA support
- GitHub Actions → GitHub Pages for CI/CD

## Run locally

No build step. Just open `index.html` in any modern browser.

```bash
# or serve over http (needed for service worker)
python -m http.server 8000
# then open http://localhost:8000
```

## Project structure

```
exam-interface/
├── index.html        # markup
├── styles.css        # styles + dark theme + responsive
├── script.js         # exam logic (restored + enhanced)
├── manifest.json     # PWA manifest
├── sw.js             # service worker (offline cache)
├── image.png         # screenshot
├── CHANGES.md        # changelog of fixes
└── .github/workflows/pages.yml  # GitHub Pages deploy
```

## Resume bullet (X-Y-Z)

> Rebuilt and enhanced a broken exam-simulation web app into a polished,
> accessible, offline-capable PWA: implemented 18-question multi-subject exams
> with countdown timer, keyboard navigation, localStorage persistence,
> tab-switch detection, results analytics, dark mode, and GitHub Pages CI/CD.

## Limitations

- Question bank is static (hardcoded); no backend / user accounts
- No server-side grading or anti-cheat beyond tab-switch warning
- PWA icons reuse the screenshot (replace with proper 192/512 icons for production)

## License

MIT