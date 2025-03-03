(() => {
    "use strict";

    function exportCSV(data, filename = 'chunithm_teamranking.csv') {
        const csvContent = data.map(row => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function toHalfWidth(str) {
        return str.replace(/[\uFF01-\uFF5E]/g, ch =>
            String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)
        ).replace(/\u3000/g, ' ');
    }

    function getRankingData() {
        const rows = Array.from(document.querySelectorAll(".rank_block"));
        const data = [["Team Name", "Score", "Diff", "Team Code"]]; 

        rows.forEach(row => {
            let teamName = row.querySelector(".rank_teamname")?.innerText.trim() || "unknown";
            teamName = toHalfWidth(teamName);

            const score = row.querySelector(".rank_block_team_num")?.innerText.replace(/,/g, '') || "0";
            const scoreDiff = row.querySelector(".rank_block_team_diff")?.innerText.replace(/,/g, '').trim() || "±0";

            const teamCode = row.querySelector('input[name="teamCode"]')?.value || "unknown";

            data.push([teamName, score, scoreDiff, teamCode]); 
        });

        const updateTime = document.querySelector(".ranking_update.text_white")?.innerText.trim() || "unknown";
        data.push([`${updateTime}`]); 
        return { data, updateTime };
    }

    function formatDate(updateTime) {
        const match = updateTime.match(/(\d{4})[\/-](\d{2})[\/-](\d{2})/);
        return match ? `${match[1]}${match[2]}${match[3]}` : "unknown_date";
    }

    function createExportButton() {
        const button = document.createElement("button");
        button.className = "chuni-tool-btn";
        button.innerText = "以CSV下載團隊榜";

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "https://jack4215.github.io/chuni-tools/common/styles/inject.css";

        document.head.appendChild(link);
        link.addEventListener("load", () => {
            document.querySelector(".clearfix")?.insertAdjacentElement("afterend", button);
        });

        button.addEventListener("click", () => {
            const { data, updateTime } = getRankingData();
            const formattedTime = formatDate(updateTime);
            const filename = `chunithm_teamranking_${formattedTime}.csv`;
            exportCSV(data, filename);
        });
    }

    createExportButton();
})();