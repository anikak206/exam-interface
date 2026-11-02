# Exam Interface

A polished, accessible, offline-capable online exam simulation web app.

**Live demo:** https://anikak206.github.io/exam-interface/ (after enabling GitHub Pages)

## Features
- 3 subjects (Math, Physics, Chemistry) with 6 questions each
- Countdown timer with 1-minute warning toast
- Question navigation sidebar with answered/marked colouring
- Mark questions for review
- Keyboard shortcuts: ←/→ navigate, 1–4 select option, Ctrl+Enter submit
- Progress persistence via `localStorage` (survives refresh)
- `beforeunload` warning + tab-switch detection banner
- Results table with per-question breakdown on submit
- Dark/light theme toggle
- Responsive layout (mobile-friendly)
- PWA: installable, works offline via service worker
- Accessible: ARIA labels, keyboard focus outlines

## Run locally
Just open `index.html` in a browser. No build step.

## Deploy to GitHub Pages
Settings → Pages → Source: `main` branch / root.

## License
MIT