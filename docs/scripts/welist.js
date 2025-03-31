(function() {
    const songs = document.querySelectorAll('.musiclist_box');
    const totalSongs = songs.length;

    const stats = {
        clear: 0,
        hard: 0,
        absolute: 0,
        absolutep: 0,
        catastrophy: 0,
        rank_8: 0,
        rank_9: 0,
        rank_10: 0,
        rank_11: 0,
        rank_12: 0,
        rank_13: 0,
        fullcombo: 0,
        alljustice: 0,
        alljusticecritical: 0,
        fullchain2: 0,
        fullchain: 0
    };
    
    songs.forEach(song => {
        if (song.querySelector('img[src*="icon_catastrophy.png"]')) {
            stats.clear++;
            stats.hard++;
            stats.absolute++;
            stats.absolutep++;
            stats.catastrophy++;
        } else if (song.querySelector('img[src*="icon_absolutep.png"]')) {
            stats.clear++;
            stats.hard++;
            stats.absolute++;
            stats.absolutep++;
        } else if (song.querySelector('img[src*="icon_absolute.png"]')) {
            stats.clear++;
            stats.hard++;
            stats.absolute++;
        } else if (song.querySelector('img[src*="icon_hard.png"]')) {
            stats.clear++;
            stats.hard++;
        } else if (song.querySelector('img[src*="icon_clear.png"]')) {
            stats.clear++;
        }

        for (let i = 8; i <= 13; i++) {
            if (song.querySelector(`img[src*='icon_rank_${i}.png']`)) {
                for (let j = 8; j <= i; j++) {
                    stats[`rank_${j}`]++;
                }
            }
        }

        if (song.querySelector('img[src*="icon_alljusticecritical.png"]')) {
            stats.fullcombo++;
            stats.alljustice++;
            stats.alljusticecritical++;
        } else if (song.querySelector('img[src*="icon_alljustice.png"]')) {
            stats.fullcombo++;
            stats.alljustice++;
        } else if (song.querySelector('img[src*="icon_fullcombo.png"]')) {
            stats.fullcombo++;
        }

        if (song.querySelector('img[src*="icon_fullchain.png"]')) {
            stats.fullchain2++;
            stats.fullchain++;
        } else if (song.querySelector('img[src*="icon_fullchain2.png"]')) {
            stats.fullchain2++;
        }
    });
    
    const scoreList = document.createElement('div');
    scoreList.id = 'scoreList_result';
    scoreList.innerHTML = `
        <div class="box01 w420 font_0">
            <div class="score_list_block">
                ${Object.entries(stats).map(([key, value]) => `
                <div class="score_list">
                    <div class="score_list_top"><img src="https://chunithm-net-eng.com/mobile/images/icon_${key}.png"><br></div>
                    <div class="score_list_bottom">
                        <div class="score_num_text">${value}</div>
                        <div class="score_all_text font_small">/${totalSongs}</div>
                    </div>
                </div>
                ${key === 'catastrophy' || key === 'rank_13' ? '<br>' : ''}
                `).join('')}
            </div>
            <div class="toggle-container">
                <label class="toggle-switch">
                    <input type="checkbox" id="toggleEffect">
                    <span class="slider round"></span>
                </label>
                <span id="sortLabel">百分比 Percent</span>
            </div>
        </div>
    `;
    
    const target = document.querySelector('.box01.w420');
    if (target) {
        target.parentNode.insertBefore(scoreList, target);
    }

    document.getElementById('toggleEffect').addEventListener('change', function () {
        if (this.checked) {
            document.querySelectorAll(".score_list").forEach(scoreList => {
                let numText = scoreList.querySelector(".score_num_text");
                let allText = scoreList.querySelector(".score_all_text");

                if (numText && allText) {
                    let achieved = parseInt(numText.textContent.trim().replace(/,/g, ""), 10);
                    let total = parseInt(allText.textContent.replace("/", "").trim().replace(/,/g, ""), 10);

                    if (!isNaN(achieved) && !isNaN(total) && total > 0) {
                        let percentage = Math.floor((achieved / total) * 10000) / 100;
                        let formattedPercentage = `${percentage.toFixed(2)}%`;
                        let oldPercentDiv = scoreList.querySelector(".score_percent_text");
                        if (oldPercentDiv) {
                            oldPercentDiv.remove();
                        }
                        let percentDiv = document.createElement("div");
                        percentDiv.className = "score_percent_text font_small";
                        percentDiv.textContent = `(${formattedPercentage})`; 
                        scoreList.querySelector(".score_list_bottom").appendChild(percentDiv);
                        scoreList.style.backgroundColor = "#ffffee";

                        if (percentage === 100) {
                            scoreList.style.backgroundColor = "#b0ffc8";
                        } else {
                            scoreList.style.backgroundImage = `linear-gradient(to right, #ffc3c3 ${percentage}%, transparent ${percentage}%)`;
                        }
                    }
                }
                scoreList.style.height = "82px";
            });
        } else {
            document.querySelectorAll(".score_list").forEach(scoreList => {
                scoreList.style.backgroundColor = "";
                scoreList.style.backgroundImage = "";
                scoreList.style.height = "";
                let oldPercentDiv = scoreList.querySelector(".score_percent_text");
                if (oldPercentDiv) {
                    oldPercentDiv.remove();
                }
            });
        }
    });
    const style = document.createElement('style');
    style.innerHTML = `
    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 30px;
        margin: 0 0 10px 0;
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
        background-color: #bdbdbd;
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
        background-color: #14cb05;
    }
    input:checked + .slider:before {
        transform: translateX(26px);
    }
    .toggle-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    #sortLabel {
        margin-left: 10px;
        font-size: 16px;
        vertical-align: -5px;
        font-family: Arial, sans-serif;
        margin: 0 0 10px 0;
    }
`;
document.head.appendChild(style);
})();