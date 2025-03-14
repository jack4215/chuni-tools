const box02 = document.querySelector('.box02.w450');
if (box02) {
    const controlContainer = document.createElement('div');
    controlContainer.className = 'box02 w450 centered';
    controlContainer.innerHTML = `
        <div class="sort-options">
            <button class="sort-btn active" id="sortByLevel">Lv.</button>
            <button class="sort-btn" id="sortByRating">Rating</button>
            <button class="sort-btn" id="sortByOP">OP</button>
            <button class="sort-btn" id="sortByOPPercent">OP%</button>
            <button class="sort-btn" id="sortByDate">Date</button>
        </div>
        <div class="toggle-container">
            <label class="toggle-switch">
                <input type="checkbox" id="sortToggle" checked>
                <span class="slider"></span>
            </label>
            <span id="sortLabel">降序 Descending</span>
        </div>
    `;
    box02.before(controlContainer);
}

function parseDateTime(dateTimeStr) {
    return new Date(dateTimeStr.replace(/\//g, '-'));
}

function getPlayerLevel(block) {
    const reborn = parseInt(block.querySelector('.player_reborn')?.innerText || '0', 10);
    const level = parseInt(block.querySelector('.player_lv')?.innerText || '0', 10);
    return reborn * 100 + level;
}

function getPlayerOP(block) {
    const opText = block.querySelector('.player_overpower_text')?.innerText.split(' ')[0];
    return opText ? parseFloat(opText) : 0;
}

function getPlayerOPPercent(block) {
    const opText = block.querySelector('.player_overpower_text')?.innerHTML.match(/\(([^)]+)%\)/);
    return opText ? parseFloat(opText[1]) : 0;
}

function getPlayerRating(block) {
    const ratingImgs = Array.from(block.querySelectorAll('.player_rating_num_block img'));
    return parseFloat(ratingImgs.map(img => {
        if (/rating_.*_comma.png/.test(img.src)) return '.';
        const match = /rating_.*_[0-9]*(?=\.png)/.exec(img.src);
        return match ? match[0].slice(-1) : '0';
    }).join('')) || 0;
}

function sortFriends(criteria, desc = false) {
    const friendBlocks = Array.from(document.querySelectorAll('.friend_block'));

    friendBlocks.sort((a, b) => {
        let aValue, bValue;

        switch (criteria) {
            case 'level':
                aValue = getPlayerLevel(a);
                bValue = getPlayerLevel(b);
                break;
            case 'rating':
                aValue = getPlayerRating(a);
                bValue = getPlayerRating(b);
                break;
            case 'op':
                aValue = getPlayerOP(a);
                bValue = getPlayerOP(b);
                break;
            case 'oppercent':
                aValue = getPlayerOPPercent(a);
                bValue = getPlayerOPPercent(b);
                break;
            case 'date':
            default:
                const aDateStr = a.querySelector('.player_lastplaydate_text')?.innerText || '2000/01/01 00:00';
                const bDateStr = b.querySelector('.player_lastplaydate_text')?.innerText || '2000/01/01 00:00';
                aValue = parseDateTime(aDateStr);
                bValue = parseDateTime(bDateStr);
                break;
        }
        return desc ? bValue - aValue : aValue - bValue;
    });

    const parent = document.querySelector('.frame01_inside');
    friendBlocks.forEach(friend => parent.appendChild(friend));
}

let currentCriteria = 'level';
sortFriends(currentCriteria, true);

const sortToggle = document.getElementById('sortToggle');
const sortLabel = document.getElementById('sortLabel');
const buttons = document.querySelectorAll('.sort-btn');

if (sortToggle) {
    sortToggle.addEventListener('change', () => {
        const isDesc = sortToggle.checked;
        sortLabel.innerText = isDesc ? '降序 Descending' : '升序 Ascending';
        sortFriends(currentCriteria, isDesc);
    });
}

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        currentCriteria = e.target.id.replace('sortBy', '').toLowerCase();
        buttons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        sortFriends(currentCriteria, sortToggle.checked);
    });
});

const style = document.createElement('style');
style.innerHTML = `
    .sort-options {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        margin-bottom: 10px;
        font-size: 15px;
        font-family: Arial, sans-serif;
    }
    .sort-btn {
        padding: 10px;
        border: none;
        border-radius: 7px;
        background-color: #ccc;
        cursor: pointer;
    }
    .sort-btn.active {
        background-color: #a57443;
        color: white;
    }
    .toggle-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 30px;
    }
    .slider {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #e73f76;
        border-radius: 30px;
        cursor: pointer;
    }
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 2px;
        background-color: white;
        border-radius: 50%;
        transition: 0.4s;
    }
    input:checked + .slider {
        background-color: #39b2fe;
    }
    input:checked + .slider:before {
        transform: translateX(26px);
    }
    #sortLabel {
        font-size: 15px;
        font-family: Arial, sans-serif;
        white-space: nowrap;
    }
`;
document.head.appendChild(style);