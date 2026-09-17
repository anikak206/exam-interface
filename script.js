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

function sidebar() {
    var nav = document.getElementById("question-nav");
    nav.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {
        var btn = document.createElement("button");
        btn.className = "btn";
        btn.innerHTML = (i + 1);
        btn.setAttribute("onclick", "goTo(" + i + ")");
        btn.style.border = "2px solid #2c2c2c";
        nav.appendChild(btn);
    }

    colour();
}

function goTo(index) {
    cur = index;
    load(index);
}

function colour() {
    let buttons = document.getElementsByClassName("btn");

    for (let i = 0; i < questions.length; i++) {
        if (answers[i] != null && marked[i] == null) {
            buttons[i].style.borderColor = "#34a15f";
            buttons[i].style.backgroundColor = "#263029";
        } else if (answers[i] == null && marked[i] != null) {
            buttons[i].style.borderColor = "#beac5f";
            buttons[i].style.backgroundColor = "#31302a";
        } else if (answers[i] != null && marked[i] != null) {
            buttons[i].style.borderColor = "#9a5fbe";
            buttons[i].style.backgroundColor = "#2b2631";
        } else {
            buttons[i].style.backgroundColor = "#2c2c2c";
            buttons[i].style.borderColor = "#2c2c2c";
        }
    }
}

function load(index) {
    let q = questions[index];
    document.getElementById("question").innerHTML = q.question;

    if (questions === phy && index == 3) {
        document.getElementById("img").setAttribute("src", "image.png");
        document.getElementById("img-br").innerHTML = "<br><br>";
    } else {
        document.getElementById("img").setAttribute("src", "");
        document.getElementById("img-br").innerHTML = "";
    }

    let op = document.getElementById("options");
    op.innerHTML = "";

    for (let i = 0; i < q.options.length; i++) {
        let btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = q.options[i];

        if (answers[index] == i) {
            btn.className = "option-btn sel";
        }

        btn.setAttribute("onclick", "select(" + index + "," + i + ")");
        op.appendChild(btn);
        document.getElementById("next-btn").style.backgroundColor = "#bcbcbc";
    }

    document.getElementById("next-btn").style.visibility = "";

    if (index == questions.length - 1) {
        document.getElementById("next-btn").style.visibility = "hidden";
    }

    if (marked[cur] == 1) document.getElementById("mark-btn").innerHTML = "Marked";
    else document.getElementById("mark-btn").innerHTML = "Mark";

    if (answers[cur]) document.getElementById("next-btn").style.backgroundColor = "#6b6be0";
}

function select(qIndex, opIndex) {
    answers[qIndex] = opIndex;
    load(qIndex);
    colour();
    document.getElementById("next-btn").style.backgroundColor = "#6b6be0";
}

function mark() {
    if (marked[cur] == null) {
        marked[cur] = 1;
        document.getElementById("mark-btn").innerHTML = "Marked";
    } else {
        marked[cur] = null;
        document.getElementById("mark-btn").innerHTML = "Mark";
    }
    colour();
}

function next() {
    goTo(cur + 1);
}

function prev() {
    goTo(cur - 1);
}

function submit() {
    clearInterval(window.timerInterval);
    var score = 0;
    var tbody = document.getElementById("results-body");
    tbody.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {
        var correct = answers[i] === questions[i].correct;
        if (correct) score++;

        var row = document.createElement("tr");
        row.className = correct ? "row-correct" : "row-wrong";

        var yourAns = answers[i] != null
            ? questions[i].options[answers[i]]
            : "<span class='td-unanswered'>Not answered</span>";
        var correctAns = questions[i].options[questions[i].correct];

        row.innerHTML =
            "<td>" + (i + 1) + "</td>" +
            "<td class='td-question'>" + questions[i].question + "</td>" +
            "<td>" + yourAns + "</td>" +
            "<td>" + correctAns + "</td>" +
            "<td class='" + (correct ? "result-correct" : "result-wrong") + "'>" +
            (correct ? "&check;" : "&cross;") + "</td>";

        tbody.appendChild(row);
    }

    document.getElementById("end-score").textContent = score + " / " + questions.length;

    var scoreWrap = document.getElementById("end-score-wrap");
    var tabSwitchNote = document.createElement("div");
    tabSwitchNote.style.marginTop = "10px";
    tabSwitchNote.style.fontSize = "13px";
    tabSwitchNote.style.color = "#888";
    tabSwitchNote.innerHTML = "Tab switches during exam: <span id='tab-switch-count'>" + window.tabSwitchCount + "</span>";
    scoreWrap.appendChild(tabSwitchNote);
    document.getElementById("overlay").style.display = "block";
    document.getElementById("end-popup").style.display = "flex";
}

function restart() {
    location.reload();
}

function time() {
    window.timerInterval = setInterval(function () {

        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        document.getElementById("timer").innerHTML = minutes + ":" + seconds;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submit();
        }

        timeLeft--;

    }, 1000);
}

function quickstart(subject) {
    document.getElementById("subject").value = subject;
    document.getElementById("time").value = 15;
    init();
}

function init() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("next-btn").style.visibility = "";
    document.getElementById("prev-btn").style.visibility = "";
    document.getElementById("mark-btn").style.visibility = "";
    document.getElementById("submit-btn").style.visibility = "";
    document.getElementById("question-nav").style.visibility = "";
    document.getElementById("time-remaining").style.visibility = "";
    document.getElementById("timer").style.visibility = "";

    window.questions = [];

    if (document.getElementById("subject").value == "math") {
        questions = math;
    } else if (document.getElementById("subject").value == "phy") {
        questions = phy;
    } else {
        questions = chem;
    }

    window.cur = 0;
    window.answers = [];
    window.marked = [];
    if (document.getElementById("time").value <= 0) window.timeLeft = 15*60;
    else window.timeLeft = document.getElementById("time").value*60;

    for (let i = 0; i < questions.length; i++) {
        answers[i] = null;
        marked[i] = null;
    }
    sidebar();
    load(0);
    time();
}

document.getElementById("next-btn").style.visibility = "hidden";
document.getElementById("prev-btn").style.visibility = "hidden";
document.getElementById("mark-btn").style.visibility = "hidden";
document.getElementById("submit-btn").style.visibility = "hidden";
document.getElementById("question-nav").style.visibility = "hidden";
document.getElementById("time-remaining").style.visibility = "hidden";
document.getElementById("timer").style.visibility = "hidden";

window.addEventListener("beforeunload", function (e) {
    if (window.questions && window.questions.length > 0) {
        e.preventDefault();
        e.returnValue = "";
    }
});


document.addEventListener("keydown", function (e) {
    if (!window.questions || questions.length === 0) return;

    if (e.key === "ArrowRight" && cur < questions.length - 1) next();
    if (e.key === "ArrowLeft" && cur > 0) prev();

    if (["1", "2", "3", "4"].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (idx < questions[cur].options.length) select(cur, idx);
    }

    if (e.ctrlKey && e.key === "Enter") submit();
});


window.tabSwitchCount = 0;

document.addEventListener("visibilitychange", function () {
    if (document.hidden && window.questions && window.questions.length > 0) {
        window.tabSwitchCount++;
        var banner = document.getElementById("focus-warning");
        banner.style.display = "block";
    }
});

window.addEventListener("focus", function () {
    var banner = document.getElementById("focus-warning");
    if (banner) banner.style.display = "none";
});
