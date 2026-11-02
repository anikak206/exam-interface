/* Exam Interface — restored & enhanced */
/* Question banks */
const math = [

    {

        question: "If the sum of the first n terms of an AP is given by Sâ‚™ = 3nÂ² + 5n, then the common difference of the AP is:",

        options: ["6", "3", "5", "2"],

        correct: 0

    },

    {

        question: "The value of the integral âˆ«â‚€^Ï€ xÂ·sin(x) dx is:",

        options: ["Ï€", "2Ï€", "Ï€/2", "0"],

        correct: 0

    },

    {

        question: "If |z âˆ’ 2 + 2i| â‰¤ 1, then the maximum value of |z| is:",

        options: ["âˆš2 + 1", "2âˆš2 + 1", "2âˆš2 âˆ’ 1", "3"],

        correct: 1

    },

    {

        question: "The number of ways of distributing 8 identical balls into 3 distinct boxes such that no box is empty is:",

        options: ["21", "56", "24", "12"],

        correct: 0

    },

    {

        question: "For square matrices A and B of order 3, adj(AB) equals:",

        options: ["adj(A) Â· adj(B)", "adj(B) Â· adj(A)", "|A| Â· adj(B)", "|B| Â· adj(A)"],

        correct: 1

    },

    {

        question: "The equation of the tangent to the curve y = xÂ³ âˆ’ 3x at the point where x = 2 is:",

        options: ["y = 9x âˆ’ 16", "y = 9x + 16", "y = 3x âˆ’ 4", "y = 6x âˆ’ 10"],

        correct: 0

    }

];



const phy = [

    {

        question: "A particle starts with initial velocity 5 m/s and uniform acceleration 2 m/sÂ². The distance covered in the 5th second is:",

        options: ["12 m", "14 m", "16 m", "10 m"],

        correct: 1

    },

    {

        question: "A ball is projected vertically upward with velocity 20 m/s. The maximum height reached is (g = 10 m/sÂ²):",

        options: ["10 m", "15 m", "20 m", "25 m"],

        correct: 2

    },

    {

        question: "Resistances of 4 Î© and 6 Î© are connected in parallel and a current of 5 A flows through the combination. The voltage across it is:",

        options: ["10 V", "12 V", "20 V", "24 V"],

        correct: 1

    },

    {

        question: "Find the acceleration of block mass ð‘š. Assume pulleys are of massless and frictionless.",

        options: ["ð‘”/3", "2ð‘”/3", "ð‘”/2", "None of the above"],

        correct: 1

    },

    {

        question: "A body of mass 2 kg is dropped from a height of 20 m. Its kinetic energy just before hitting the ground is (g = 10 m/sÂ²):",

        options: ["200 J", "300 J", "400 J", "500 J"],

        correct: 2

    },

    {

        question: "An object is placed 60 cm in front of a concave lens of focal length 20 cm. The image distance is:",

        options: ["-15 cm", "-30 cm", "-20 cm", "15 cm"],

        correct: 0

    }

];



const chem = [

    {

        question: "The hybridisation of the central atom in SFâ‚† is:",

        options: ["spÂ³", "spÂ³d", "spÂ³dÂ²", "spÂ²d"],

        correct: 2

    },

    {

        question: "Which of the following alkanes has the highest boiling point?",

        options: ["CHâ‚„", "Câ‚‚Hâ‚†", "Câ‚ƒHâ‚ˆ", "n-Câ‚„Hâ‚â‚€"],

        correct: 3

    },

    {

        question: "The total number of sigma (Ïƒ) bonds in one molecule of benzene (Câ‚†Hâ‚†) is:",

        options: ["6", "9", "12", "18"],

        correct: 2

    },

    {

        question: "Which of the following is the strongest acid?",

        options: ["HF", "HCl", "HBr", "HI"],

        correct: 3

    },

    {

        question: "The IUPAC name of CHâ‚ƒâˆ’CH(OH)âˆ’CHâ‚ƒ is:",

        options: ["propan-1-ol", "propan-3-ol", "propan-2-ol", "2-methylethanol"],

        correct: 2

    },

    {

        question: "The oxidation state of Mn in KMnOâ‚„ is:",

        options: ["+3", "+5", "+6", "+7"],

        correct: 3

    }

];

/* ---------- State ---------- */
const STORAGE_KEY = "exam-interface-state-v1";
let currentSubject = "math";
let questions = [];
let cur = 0;
let answers = [];
let marked = [];
let timeLeft = 15 * 60;
let timerInterval = null;
let examStarted = false;
let examSubmitted = false;
let tabSwitches = 0;

function loadQuestionBank(subject) {
    if (subject === "math") return math.slice();
    if (subject === "phy") return phy.slice();
    if (subject === "chem") return chem.slice();
    return math.slice();
}

/* ---------- Persistence ---------- */
function saveProgress() {
    try {
        const state = {
            subject: currentSubject,
            questions: questions,
            answers: answers,
            marked: marked,
            cur: cur,
            timeLeft: timeLeft,
            examStarted: examStarted,
            examSubmitted: examSubmitted,
            tabSwitches: tabSwitches,
            savedAt: Date.now()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }
}

function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const state = JSON.parse(raw);
        if (!state || !Array.isArray(state.questions)) return false;
        currentSubject = state.subject || "math";
        questions = state.questions;
        answers = state.answers || [];
        marked = state.marked || [];
        cur = state.cur || 0;
        timeLeft = (typeof state.timeLeft === "number") ? state.timeLeft : 15 * 60;
        examStarted = !!state.examStarted;
        examSubmitted = !!state.examSubmitted;
        tabSwitches = state.tabSwitches || 0;
        return true;
    } catch (e) { return false; }
}

function clearProgress() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
}

/* ---------- UI helpers ---------- */
function $(id) { return document.getElementById(id); }

function updateProgress() {
    const answered = answers.filter(a => a !== null && a !== undefined).length;
    const el = $("progress-indicator");
    if (el) el.textContent = answered + " of " + questions.length + " answered";
    saveProgress();
}

function colour() {
    const buttons = document.getElementsByClassName("btn");
    for (let i = 0; i < questions.length; i++) {
        if (!buttons[i]) continue;
        if (answers[i] != null) {
            buttons[i].style.backgroundColor = "#34a15f";
            buttons[i].classList.add("answered");
        } else if (marked[i]) {
            buttons[i].style.backgroundColor = "#d68910";
            buttons[i].classList.add("marked");
        } else {
            buttons[i].style.backgroundColor = "#2c2c2c";
            buttons[i].classList.remove("answered", "marked");
        }
    }
}

function sidebar() {
    const nav = $("question-nav");
    if (!nav) return;
    nav.innerHTML = "";
    for (let i = 0; i < questions.length; i++) {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = (i + 1);
        btn.setAttribute("aria-label", "Question " + (i + 1));
        btn.setAttribute("onclick", "goTo(" + i + ")");
        nav.appendChild(btn);
    }
    colour();
}

function goTo(index) {
    if (index < 0 || index >= questions.length) return;
    cur = index;
    load(index);
    saveProgress();
}

function load(index) {
    const q = questions[index];
    if (!q) return;
    const qEl = $("question");
    if (qEl) qEl.innerHTML = q.question;

    const img = $("img");
    const imgBr = $("img-br");
    if (q.image) {
        if (img) { img.src = q.image; img.style.display = "block"; }
        if (imgBr) imgBr.style.display = "block";
    } else {
        if (img) { img.style.display = "none"; img.removeAttribute("src"); }
        if (imgBr) imgBr.style.display = "none";
    }

    const op = $("options");
    if (!op) return;
    op.innerHTML = "";
    for (let i = 0; i < q.options.length; i++) {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = q.options[i];
        btn.setAttribute("aria-pressed", answers[index] === i ? "true" : "false");
        if (answers[index] === i) btn.classList.add("sel");
        btn.setAttribute("onclick", "select(" + index + "," + i + ")");
        op.appendChild(btn);
    }
    const markBtn = $("mark-btn");
    if (markBtn) markBtn.textContent = marked[index] ? "Unmark" : "Mark";
}

function select(qIndex, opIndex) {
    answers[qIndex] = opIndex;
    load(qIndex);
    colour();
    updateProgress();
    const nb = $("next-btn");
    if (nb) nb.style.backgroundColor = "#6b6be0";
}

function mark() {
    marked[cur] = !marked[cur];
    colour();
    load(cur);
    saveProgress();
}

function next() {
    if (cur < questions.length - 1) goTo(cur + 1);
}

function prev() {
    if (cur > 0) goTo(cur - 1);
}

function submit() {
    if (examSubmitted) return;
    if (!confirm("Submit exam now?")) return;
    finishExam();
}

function finishExam() {
    examSubmitted = true;
    clearInterval(timerInterval);
    timerInterval = null;
    let score = 0;
    const rows = [];
    for (let i = 0; i < questions.length; i++) {
        const correct = answers[i] === questions[i].correct;
        if (correct) score++;
        rows.push({
            idx: i + 1,
            question: questions[i].question,
            yours: answers[i] == null ? "—" : questions[i].options[answers[i]],
            correct: questions[i].options[questions[i].correct],
            result: answers[i] == null ? "Skipped" : (correct ? "Correct" : "Wrong")
        });
    }
    clearProgress();
    showResults(score, rows);
}

function showResults(score, rows) {
    const popup = $("end-popup");
    const scoreEl = $("end-score");
    const title = $("end-popup-title");
    if (title) title.textContent = "Exam Complete";
    if (scoreEl) scoreEl.textContent = score + " / " + questions.length;
    const tbody = $("results-body");
    if (tbody) {
        tbody.innerHTML = "";
        rows.forEach(r => {
            const tr = document.createElement("tr");
            tr.innerHTML = "<td>" + r.idx + "</td>" +
                "<td>" + escapeHtml(r.question) + "</td>" +
                "<td>" + escapeHtml(r.yours) + "</td>" +
                "<td>" + escapeHtml(r.correct) + "</td>" +
                "<td class=\"" + (r.result === "Correct" ? "res-correct" : (r.result === "Wrong" ? "res-wrong" : "res-skip")) + "\">" + r.result + "</td>";
            tbody.appendChild(tr);
        });
    }
    if (popup) popup.style.display = "block";
    const overlay = $("overlay");
    if (overlay) overlay.style.display = "block";
}

function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function restart() {
    clearProgress();
    examStarted = false;
    examSubmitted = false;
    answers = [];
    marked = [];
    for (let i = 0; i < questions.length; i++) { answers[i] = null; marked[i] = false; }
    timeLeft = 15 * 60;
    const popup = $("end-popup");
    if (popup) popup.style.display = "none";
    const overlay = $("overlay");
    if (overlay) overlay.style.display = "none";
    const choice = $("popup");
    if (choice) choice.style.display = "block";
}

function time() {
    const timerEl = $("timer");
    const timeLeftEl = $("time-remaining");
    timerInterval = setInterval(function () {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const secStr = seconds < 10 ? "0" + seconds : seconds;
        if (timerEl) timerEl.textContent = minutes + ":" + secStr;
        if (timeLeftEl) timeLeftEl.textContent = "Time left: " + minutes + "m " + secStr + "s";

        if (timeLeft === 60) {
            const toast = $("warning-toast");
            if (toast) {
                toast.style.display = "block";
                setTimeout(() => { toast.style.display = "none"; }, 4000);
            }
        }
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            if (!examSubmitted) finishExam();
        }
        timeLeft--;
        saveProgress();
    }, 1000);
}

function quickstart(subject) {
    const sel = $("subject");
    if (sel) sel.value = subject;
    const t = $("time");
    if (t) t.value = 15;
    init();
}

function init() {
    const subjectSel = $("subject");
    const timeInput = $("time");
    const subject = subjectSel ? subjectSel.value : "math";
    const mins = timeInput && timeInput.value ? parseInt(timeInput.value, 10) : 15;
    currentSubject = subject;
    questions = loadQuestionBank(subject);
    answers = [];
    marked = [];
    for (let i = 0; i < questions.length; i++) { answers[i] = null; marked[i] = false; }
    timeLeft = (isNaN(mins) || mins < 1 ? 15 : mins) * 60;
    examStarted = true;
    examSubmitted = false;
    tabSwitches = 0;

    const popup = $("popup");
    if (popup) popup.style.display = "none";

    sidebar();
    load(0);
    updateProgress();
    if (timerInterval) clearInterval(timerInterval);
    time();
    saveProgress();
}

/* ---------- Event listeners ---------- */
window.addEventListener("beforeunload", function (e) {
    if (examStarted && !examSubmitted) {
        e.preventDefault();
        e.returnValue = "";
    }
});

document.addEventListener("keydown", function (e) {
    if (!examStarted || examSubmitted) return;
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    if (e.key === "ArrowRight") { next(); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { prev(); e.preventDefault(); }
    else if (e.key >= "1" && e.key <= "9") {
        const idx = parseInt(e.key, 10) - 1;
        const q = questions[cur];
        if (q && idx < q.options.length) select(cur, idx);
    } else if (e.ctrlKey && e.key === "Enter") {
        submit();
    }
});

document.addEventListener("visibilitychange", function () {
    if (document.hidden && examStarted && !examSubmitted) {
        tabSwitches++;
        const w = $("focus-warning");
        if (w) {
            w.style.display = "block";
            setTimeout(() => { w.style.display = "none"; }, 3000);
        }
        saveProgress();
    }
});

window.addEventListener("focus", function () {
    // no-op placeholder for future analytics
});

/* ---------- Theme ---------- */
function toggleTheme() {
    document.body.classList.toggle("dark");
    try { localStorage.setItem("exam-theme", document.body.classList.contains("dark") ? "dark" : "light"); } catch (e) {}
}

/* ---------- Bootstrap ---------- */
(function bootstrap() {
    try {
        if (localStorage.getItem("exam-theme") === "dark") document.body.classList.add("dark");
    } catch (e) {}
    const restored = loadProgress();
    if (restored && examStarted && !examSubmitted) {
        const popup = $("popup");
        if (popup) popup.style.display = "none";
        sidebar();
        load(cur);
        updateProgress();
        if (timerInterval) clearInterval(timerInterval);
        time();
    } else {
        // reset state
        questions = [];
        answers = [];
        marked = [];
    }
})();