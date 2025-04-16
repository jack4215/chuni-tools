const box01 = document.querySelector('.box01.w420');
if (box01) {
    const toggleContainer = document.createElement('div');
    toggleContainer.innerHTML = `
        <label class="toggle-switch">
            <input type="checkbox" id="sortToggle">
            <span class="slider"></span>
        </label>
        <span id="sortLabel">升冪排序 Ascending order</span>
    `;
    box01.prepend(toggleContainer);
}

function sortMusicBoxes(desc = false) {
    const musicBoxes = Array.from(document.querySelectorAll('.box01.w420 .music_box'));

    musicBoxes.sort((a, b) => {
        const aResult = parseFloat(a.querySelector('.vs_list_result')?.innerText.replace(/[－,]/g, match => match === '－' ? '-' : '')) || 0;
        const bResult = parseFloat(b.querySelector('.vs_list_result')?.innerText.replace(/[－,]/g, match => match === '－' ? '-' : '')) || 0;
        return desc ? bResult - aResult : aResult - bResult;
    });

    musicBoxes.forEach(musicBox => box01.appendChild(musicBox));
}
sortMusicBoxes(false);

const sortToggle = document.getElementById('sortToggle');
const sortLabel = document.getElementById('sortLabel');

if (sortToggle) {
    sortToggle.addEventListener('change', () => {
        const isDesc = sortToggle.checked;
        sortLabel.innerText = isDesc ? '降冪排序 Descending order' : '升冪排序 Ascending order';
        sortMusicBoxes(isDesc);
    });
}

const style = document.createElement('style');
style.innerHTML = `
    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 30px;
        margin: 10px 0;
    }
    .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
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
        margin-left: 10px;
        font-size: 16px;
        vertical-align: -5px;
        font-family: Arial, sans-serif;
    }
`;
document.head.appendChild(style);