\# Changes \& Bug Fixes — exam-interface



This document tracks issues found in the original project and the

improvements made on top of it.



\## Bugs found



\### 1. Character encoding issue

Special characters (π, ∫, ², √, etc.) in `script.js` were rendering as

garbled text (e.g. `Â²`, `âˆ«`, `Ï€`) because the file lacked a UTF-8

charset declaration and wasn't saved with UTF-8 encoding.



\### 2. No progress persistence

Refreshing or accidentally closing the tab mid-exam wiped all answers

and marked questions with no way to recover them.



\### 3. No warning before leaving mid-exam

A user could close the tab or navigate away accidentally during an

active exam with zero warning, losing all progress silently.



\### 4. No keyboard navigation

The interface was mouse-only — no way to move between questions or

select answers using the keyboard, which is slower and less

accessible.



\### 5. Abrupt auto-submit

When the timer hit zero, the exam submitted instantly with no

heads-up beforehand, giving the user no chance to finish up.



\## Changes made



| Area | Change |

|---|---|

| Encoding | Added `<meta charset="UTF-8">` to `index.html` and re-saved `script.js` as UTF-8 |

| Persistence | Added `saveProgress()` / `loadProgress()` / `clearProgress()` using `localStorage`, so answers and marked questions survive a refresh |

| Safety | Added a `beforeunload` listener that warns the user before leaving an active exam |

| Navigation | Added keyboard shortcuts — arrow keys to move between questions, number keys 1–4 to select an option, Ctrl+Enter to submit |

| UX | Added a warning toast that appears when 1 minute remains on the timer |



\## Not yet done



\- Per-subject score breakdown (only relevant if subjects are ever combined into one mixed exam — currently each exam is single-subject)

