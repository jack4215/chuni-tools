let justiceCritical = parseInt(document.querySelector(".text_critical").textContent.replace(",", ""));
let justice = parseInt(document.querySelector(".text_justice").textContent.replace(",", ""));
let attack = parseInt(document.querySelector(".text_attack").textContent.replace(",", ""));
let miss = parseInt(document.querySelector(".text_miss").textContent.replace(",", ""));

const totalNotes = justiceCritical + justice + attack + miss;
justiceCritical = 0;
justice = totalNotes;
attack = 0;
miss = 0;

const targetScores = [
    { score: 1007500, label: "SSS" },
    { score: 1009000, label: "SSS+" },
    { score: 1009900, label: "99AJ" }
];

function calculateScore(justiceCritical, justice, attack, miss) {
    const baseScore = 1000000 / totalNotes; 
    const scoreJusticeCritical = baseScore * 1.01 * justiceCritical;
    const scoreJustice = baseScore * justice;
    const scoreAttack = baseScore * 0.5 * attack;
    return scoreJusticeCritical + scoreJustice + scoreAttack;
}

const results = targetScores.map(({ score: targetScore, label }) => {
    let jc = 0, j = totalNotes, a = 0, m = 0;
    let bestJusticeCritical = 0;
    let bestJustice = totalNotes;
    let bestAttack = 0;
    let totalScore = calculateScore(jc, j, a, m);

    while (j > 0) {
        totalScore = calculateScore(jc, j, a, m);
        if (totalScore >= targetScore) break;

        j--;
        jc++;
    }
    bestJusticeCritical = jc;
    bestJustice = j;
    bestAttack = a;

    while (j >= 50) {
        j -= 50;
        a++;
        jc += 49;
        totalScore = calculateScore(jc, j, a, m);
        if (totalScore > targetScore) break;
    }
    while (totalScore < targetScore && j > 0) {
        j--;
        jc++;
        totalScore = calculateScore(jc, j, a, m);
    }
    bestJusticeCritical = jc;
    bestJustice = j;
    bestAttack = a;

    if (totalScore < targetScore) {
        while (a > 0 && totalScore < targetScore) {
            a--;
            j += 50;
            jc -= 49;
            totalScore = calculateScore(jc, j, a, m);
            if (totalScore >= targetScore) break;

            while (j > 0 && totalScore < targetScore) {
                j--;
                jc++;
                totalScore = calculateScore(jc, j, a, m);
            }
        }
        bestJusticeCritical = jc;
        bestJustice = j;
        bestAttack = a;
    }

    return {
        label: label,
        targetScore: targetScore,
        totalScore: Math.floor(totalScore),
        bestJusticeCritical: bestJusticeCritical,
        bestJustice: bestJustice,
        bestAttack: bestAttack
    };
});

results.forEach(result => {
    if (result.bestJustice === 0 && result.bestAttack === 0) {
        result.totalScore = 1010000;
    }
});

function insertResult() {
    const resultContainer = document.createElement("div");
    resultContainer.className = "chuni-result-container";

    const resultContent = results.map(result => `
        <p>${result.label} : ${result.totalScore}<br>
        (${result.bestJusticeCritical}-${result.bestJustice}-${result.bestAttack}-0)
        ${result.bestAttack > 0 ? ` , (${result.bestJusticeCritical - 50}-${result.bestJustice + 51}-${result.bestAttack - 1}-0)...` : ""}
        </p>
    `).join("<br>");

    resultContainer.innerHTML = resultContent;

    const style = document.createElement("style");
    style.textContent = `
        .chuni-result-container {
            padding: 8px;
            background-color: #405c7b;
            margin: 10px auto 10px auto;
            width: 420px;
            font-family: Arial, sans-serif;
        }
        .chuni-result-container p {
            margin: 5px 0;
            color: #ededed;
        }
    `;
    document.head.appendChild(style);
    document.querySelector(".box01")?.insertAdjacentElement("afterend", resultContainer);
}
insertResult();
