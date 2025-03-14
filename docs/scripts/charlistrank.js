function getCharacterLevel(characterBlock) {
    const levelImgs = Array.from(characterBlock.querySelectorAll('.character_list_rank_num img'));

    const levelStr = levelImgs.map(img => {
        const match = img.src.match(/num_s_lv_([0-9]+)\.png/);
        return match ? match[1] : '0';
    }).join('');

    return parseInt(levelStr, 10) || 0;
}

function getCharacterExp(characterBlock) {
    const gageBase = characterBlock.querySelector('.character_list_gage_base img');
    if (!gageBase) return Infinity;

    const match = gageBase.getAttribute('width').match(/(\d+)px/);
    const width = match ? parseInt(match[1], 10) : Infinity;

    return width === 0 ? 9999 : width;
}

function sortCharacters(desc = true) {
    const characterList = document.getElementById('list');
    if (!characterList) return;

    let characters = Array.from(characterList.querySelectorAll('.box01.w420.mt_25'))
        .filter(c => c.style.display !== "none");

    if (!characterList.dataset.originalOrder) {
        characterList.dataset.originalOrder = JSON.stringify(characters.map(c => c.outerHTML));
    }

    characters.sort((a, b) => {
        const levelA = getCharacterLevel(a);
        const levelB = getCharacterLevel(b);

        if (levelA !== levelB) {
            return desc ? levelB - levelA : levelA - levelB;
        }

        const expA = getCharacterExp(a);
        const expB = getCharacterExp(b);
        return expA - expB;
    });

    characters.forEach(character => characterList.appendChild(character));

    updateLevelStats();
}

function getExpForLevel(level) {
    const expMap = [
        { range: [1, 9], exp: 2 },
        { range: [10, 14], exp: 10 },
        { range: [15, 19], exp: 15 },
        { range: [20, 24], exp: 20 },
        { range: [25, 29], exp: 30 },
        { range: [30, 34], exp: 40 },
        { range: [35, 39], exp: 50 },
        { range: [40, 44], exp: 60 },
        { range: [45, 49], exp: 70 },
        { range: [50, 54], exp: 90 },
        { range: [55, 59], exp: 110 },
        { range: [60, 64], exp: 130 },
        { range: [65, 69], exp: 150 },
        { range: [70, 74], exp: 170 },
        { range: [75, 79], exp: 190 },
        { range: [80, 84], exp: 210 },
        { range: [85, 89], exp: 230 },
        { range: [90, 94], exp: 250 },
        { range: [95, 99], exp: 270 },
        { range: [100, 104], exp: 300 },
        { range: [105, 109], exp: 330 },
        { range: [110, 114], exp: 360 },
        { range: [115, 119], exp: 390 },
        { range: [120, 124], exp: 420 },
        { range: [125, 129], exp: 450 },
        { range: [130, 134], exp: 480 },
        { range: [135, 139], exp: 510 },
        { range: [140, 144], exp: 540 },
        { range: [145, 149], exp: 570 },
        { range: [150, 154], exp: 610 },
        { range: [155, 159], exp: 650 },
        { range: [160, 164], exp: 690 },
        { range: [165, 169], exp: 730 },
        { range: [170, 174], exp: 770 },
        { range: [175, 179], exp: 810 },
        { range: [180, 184], exp: 850 },
        { range: [185, 189], exp: 890 },
        { range: [190, 194], exp: 930 },
        { range: [195, 199], exp: 970 },
    ];

    const range = expMap.find(({ range }) => level >= range[0] && level <= range[1]);
    return range ? range.exp : 0;
}

function calculateTotalExp(level, expBarWidth, characterBlock) {
    let totalExp = 0;
    
    const maxLevelBox = characterBlock.querySelector(".character_list_rank_max"); 
    let isMaxLevel = maxLevelBox !== null;

    for (let i = 1; i < level; i++) {
        totalExp += getExpForLevel(i);
    }

    const levelExp = getExpForLevel(level);
    const expPercentage = (270 - expBarWidth) / 270;
    totalExp += Math.floor(levelExp * expPercentage);

    if (isMaxLevel) {
        totalExp -= levelExp;
    }

    return totalExp;
}

function updateLevelStats() {
    const titleElement = document.getElementById('title');
    const levelThresholds = [10, 25, 50, 100, 150, 200];
    let levelCounts = levelThresholds.map(() => 0);
    let totalExpSum = 0;
    let totalCharacters = 0;

    if (titleElement && titleElement.style.display === "none") {
        const tableHTML = `
            <table class="level-table">
                <tr>${levelThresholds.map(lvl => `<th>${lvl}</th>`).join('')}</tr>
                <tr>${levelThresholds.map(() => `<td>0<br><span class="fraction">/0</span></td>`).join('')}</tr>
            </table>
            <div class="total-exp">Total EXP: <strong>0</strong></div>
        `;
        document.getElementById('levelStats').innerHTML = tableHTML;
        return;
    }

    const characters = Array.from(document.querySelectorAll('.box01.w420.mt_25'))
        .filter(c => c.style.display !== "none");

    totalCharacters = characters.length;

    characters.forEach(character => {
        const level = getCharacterLevel(character);
        levelThresholds.forEach((threshold, index) => {
            if (level >= threshold) {
                levelCounts[index]++;
            }
        });

        const gageBase = character.querySelector('.character_list_gage_base img');
        const match = gageBase ? gageBase.getAttribute('width').match(/(\d+)px/) : null;
        const expBarWidth = match ? parseInt(match[1], 10) : 270;

        totalExpSum += calculateTotalExp(level, expBarWidth, character);
    });

    const tableHTML = `
        <table class="level-table">
            <tr>${levelThresholds.map(lvl => `<th>${lvl}</th>`).join('')}</tr>
            <tr>${levelCounts.map(count => `<td>${count}<br><span class="fraction">/${totalCharacters}</span></td>`).join('')}</tr>
        </table>
        <div class="total-exp">Total EXP: <strong>${totalExpSum.toLocaleString()}</strong></div>
    `;

    document.getElementById('levelStats').innerHTML = tableHTML;
}

const characterObserver = new MutationObserver(() => {
    updateLevelStats();
});

document.getElementById('list').querySelectorAll('.box01.w420.mt_25').forEach(node => {
    characterObserver.observe(node, { attributes: true, attributeFilter: ['style'] });
});

const titleObserver = new MutationObserver(() => {
    updateLevelStats();
});

const titleElement = document.getElementById('title');
if (titleElement) {
    titleObserver.observe(titleElement, { attributes: true, attributeFilter: ['style'] });
}

const observer = new MutationObserver(() => {
    updateLevelStats();
});
document.getElementById('list').querySelectorAll('.box01.w420.mt_25').forEach(node => {
    observer.observe(node, { attributes: true, attributeFilter: ['style'] });
});

const box01 = document.querySelector('.mb_15');
if (box01) {
    const controlContainer = document.createElement('div');
    controlContainer.className = 'box01 w420';
    controlContainer.innerHTML = `
        <div id="levelStats"></div>
        <div class="charrankalert">僅供參考 For reference only</div>`; 
    box01.before(controlContainer);

    sortCharacters(true);
}

const style = document.createElement('style');
style.innerHTML = `
    .level-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        text-align: center;
        table-layout: fixed;
        margin: 10px auto;
    }
    .level-table th, .level-table td {
        border: 1px solid #ccc;
        padding: 6px;
        width: 16.66%;
        background-color: #ffffee;
        font-weight: 600;
    }
    .level-table th {
        background-color: #f1b56a;
    }
    .fraction {
        font-size: 70%;
        font-weight: 300;
    }
    .total-exp {
        font-family: Arial, sans-serif;
        margin: 10px auto;
    }
    .charrankalert {
        font-family: Arial, sans-serif;
        margin: 10px auto;
        font-size: 90%;
    }
`;
document.head.appendChild(style);