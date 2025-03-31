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
                    <div class="score_list_top"><img src="https://chunithm-net-eng.com/mobile/images/icon_${key}.png"></div>
                    <div class="score_list_bottom">
                        <div class="score_num_text">${value}</div>
                        <div class="score_all_text font_small">/${totalSongs}</div>
                    </div>
                </div>
                ${key === 'catastrophy' || key === 'rank_13' ? '<br>' : ''}
                `).join('')}
            </div>
        </div>
    `;

    const target = document.querySelector('.box01.w420');
    if (target) {
        target.parentNode.insertBefore(scoreList, target);
    }
})();