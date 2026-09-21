$content = Get-Content script.js -Raw

$old1 = @'
function select(qIndex, opIndex) {
    answers[qIndex] = opIndex;
    load(qIndex);
    colour();
    document.getElementById("next-btn").style.backgroundColor = "#6b6be0";
}
'@
$new1 = @'
function select(qIndex, opIndex) {
    answers[qIndex] = opIndex;
    load(qIndex);
    colour();
    updateProgress();
    document.getElementById("next-btn").style.backgroundColor = "#6b6be0";
}
'@
$content = $content.Replace($old1, $new1)

$old2 = @'
    sidebar();
    load(0);
    time();
}
'@
$new2 = @'
    sidebar();
    load(0);
    time();
    updateProgress();
}
'@
$content = $content.Replace($old2, $new2)

Set-Content script.js -Value $content -NoNewline -Encoding UTF8