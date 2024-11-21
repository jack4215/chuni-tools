let justiceCritical = parseInt(document.querySelector(".text_critical").textContent.replace(",", ""));
let justice = parseInt(document.querySelector(".text_justice").textContent.replace(",", ""));
let attack = parseInt(document.querySelector(".text_attack").textContent.replace(",", ""));
let miss = parseInt(document.querySelector(".text_miss").textContent.replace(",", ""));

const totalNotes = justiceCritical + justice + attack + miss;
justiceCritical = 0;
justice = totalNotes;
attack = 0;
miss = 0;

const targetScore = 1007500;

function calculateScore(justiceCritical, justice, attack, miss) {
    const baseScore = 1000000 / totalNotes; 
    const scoreJusticeCritical = baseScore * 1.01 * justiceCritical;
    const scoreJustice = baseScore * justice;
    const scoreAttack = baseScore * 0.5 * attack;
    return scoreJusticeCritical + scoreJustice + scoreAttack;
}

let bestJusticeCritical1 = 0;
let bestJustice1 = totalNotes;
let bestAttack1 = 0;
let totalScore = calculateScore(justiceCritical, justice, attack, miss);

while (justice > 0) {
    totalScore = calculateScore(justiceCritical, justice, attack, miss);
    if (totalScore >= targetScore) break;

    justice--;
    justiceCritical++;
}
bestJusticeCritical1 = justiceCritical;
bestJustice1 = justice;
bestAttack1 = attack;

while (justice >= 50) {
    justice -= 50;
    attack++;
    justiceCritical += 49;

    totalScore = calculateScore(justiceCritical, justice, attack, miss);
    if (totalScore > targetScore) break;
}

while (totalScore < targetScore && justice > 0) {
    justice--;
    justiceCritical++;
    totalScore = calculateScore(justiceCritical, justice, attack, miss);
}
bestJusticeCritical1 = justiceCritical;
bestJustice1 = justice;
bestAttack1 = attack;

if (totalScore < targetScore) {
    while (attack > 0 && totalScore < targetScore) {
        attack--;
        justice += 50;
        justiceCritical -= 49;
        totalScore = calculateScore(justiceCritical, justice, attack, miss);
        if (totalScore >= targetScore) break;

        while (justice > 0 && totalScore < targetScore) {
            justice--;
            justiceCritical++;
            totalScore = calculateScore(justiceCritical, justice, attack, miss);
        }
    }

    bestJusticeCritical1 = justiceCritical;
    bestJustice1 = justice;
    bestAttack1 = attack;
}

const targetScore2 = 1009000;
justiceCritical = 0;
justice = totalNotes;
attack = 0;
miss = 0;
let totalScore2 = calculateScore(justiceCritical, justice, attack, miss);
let bestJusticeCritical2 = 0;
let bestJustice2 = totalNotes;
let bestAttack2 = 0;

while (justice > 0) {
    totalScore2 = calculateScore(justiceCritical, justice, attack, miss);
    if (totalScore2 >= targetScore2) break;

    justice--;
    justiceCritical++;
}
bestJusticeCritical2 = justiceCritical;
bestJustice2 = justice;
bestAttack2 = attack;

while (justice >= 50) {
    justice -= 50;
    attack++;
    justiceCritical += 49;
    totalScore2 = calculateScore(justiceCritical, justice, attack, miss);
    if (totalScore2 > targetScore2) break;
}

while (totalScore2 < targetScore2 && justice > 0) {
    justice--;
    justiceCritical++;
    totalScore2 = calculateScore(justiceCritical, justice, attack, miss);
}
bestJusticeCritical2 = justiceCritical;
bestJustice2 = justice;
bestAttack2 = attack;

if (totalScore2 < targetScore2) {
    while (attack > 0 && totalScore2 < targetScore2) {
        attack--;
        justice += 50;
        justiceCritical -= 49;
        totalScore2 = calculateScore(justiceCritical, justice, attack, miss);
        if (totalScore2 >= targetScore2) break;

        while (justice > 0 && totalScore2 < targetScore2) {
            justice--;
            justiceCritical++;
            totalScore2 = calculateScore(justiceCritical, justice, attack, miss);
        }
    }
    bestJusticeCritical2 = justiceCritical;
    bestJustice2 = justice;
    bestAttack2 = attack;
}

function insertResult() {
    const resultContainer = document.createElement("div");
    resultContainer.className = "chuni-result-container";

    const resultContent = `
        <p>SSS: ${Math.floor(totalScore)}<br>
        ( ${bestJusticeCritical1}-${bestJustice1}-${bestAttack1}-0 )${bestAttack1 > 0 ? ` , ( ${bestJusticeCritical1 - 50}-${bestJustice1 + 51}-${bestAttack1 - 1}-0 )...` : ""}</p><br>
        <p>SSS+: ${Math.floor(totalScore2)}<br>
        ( ${bestJusticeCritical2}-${bestJustice2}-${bestAttack2}-0 )${bestAttack2 > 0 ? ` , ( ${bestJusticeCritical2 - 50}-${bestJustice2 + 51}-${bestAttack2 - 1}-0 )...` : ""}</p>
    `;
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
