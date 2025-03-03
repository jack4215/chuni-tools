async function fetchTeamPoints() {
    const teams = Array.from(document.querySelectorAll(".rank_block"));
    let results = [];
    let originalRankings = {};

    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading-status";
    loadingDiv.innerText = `Please Wait... (0/${teams.length})`;

    const teamRanking = document.querySelector(".clearfix");
    if (teamRanking) {
        teamRanking.insertAdjacentElement("afterend", loadingDiv);
    }
    teams.forEach((team, index) => {
        const teamName = team.querySelector(".rank_teamname").innerText;
        originalRankings[teamName] = index + 1;
    });

    for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        const teamName = team.querySelector(".rank_teamname").innerText;
        const teamCode = team.querySelector("input[name='teamCode']").value;
        const token = team.querySelector("input[name='token']").value;
        const previousPoints = parseInt(team.querySelector(".rank_block_team_num").innerText.replace(/,/g, "")) || 0;

        const formData = new FormData();
        formData.append("teamCode", teamCode);
        formData.append("token", token);

        try {
            const response = await fetch("https://chunithm-net-eng.com/mobile/team/teamDetail/sendTeamDetail/", {
                method: "POST",
                body: formData
            });
            if (response.url === "https://chunithm-net-eng.com/mobile/error/") {
                loadingDiv.innerText = "請重新整理頁面　Please refresh the website."; 
                return;
            }
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");

            const pointsElement = Array.from(doc.querySelectorAll(".user_data_playpoint"))
                .find(el => el.innerText.includes("This month's point"));
            const currentPoints = pointsElement ? parseInt(pointsElement.innerText.replace(/,/g, "").match(/\d+/)[0]) : 0;
            const pointDiff = currentPoints - previousPoints;

            results.push({ teamName, currentPoints, pointDiff });
        } catch (error) {
            console.error(`Failed to fetch data for ${teamName}`, error);
            results.push({ teamName, currentPoints: 0, pointDiff: 0 });
        }
        loadingDiv.innerText = `Real-Time Ranking is loading... (${i + 1}/${teams.length})`;
    }
    results.sort((a, b) => b.currentPoints - a.currentPoints);
    loadingDiv.remove();
    
    const resultDiv = document.createElement("div");
    resultDiv.className = "team-ranking-container";
    resultDiv.innerHTML = `
    <table class="ranking-table">
        <tr>
            <th>Rank</th>
            <th colspan="5">Real-Time Info</th>
        </tr>
        ${results.map((r, index) => {
            const rank = index + 1;
            const originalRank = originalRankings[r.teamName] || rank;
            const rankDiff = originalRank - rank;

            let rankIcon = "";
            if (rankDiff > 0) {
                rankIcon = `<img class="rank_state_img flo_r" src="https://chunithm-net-eng.com/mobile/images/ranking_up.png">`;
            } else if (rankDiff < 0) {
                rankIcon = `<img class="rank_state_img flo_r" src="https://chunithm-net-eng.com/mobile/images/ranking_down.png">`;
            } else {
                rankIcon = `<img class="rank_state_img flo_r" src="https://chunithm-net-eng.com/mobile/images/ranking_keep.png">`;
            }

            const isEvenRow = rank % 2 === 0 ? 'style="background-color: #505050;"' : "";
            const pointDiffColor = r.pointDiff > 0 ? "#00ffff" : r.pointDiff < 0 ? "#ed3665" : "#FFF";
            const formattedPointDiff = r.pointDiff > 0 ? `+${r.pointDiff.toLocaleString()}`
                                        : r.pointDiff < 0 ? r.pointDiff.toLocaleString()
                                        : "±0";
            let rankColor = "#FFF";
            if (rank >= 1 && rank <= 10) {
                rankColor = "#50ee77";
            } else if (rank >= 11 && rank <= 40) {
                rankColor = "#fbd679";
            } else if (rank >= 41 && rank <= 70) {
                rankColor = "#aad8d6";
            }

            return `
                <tr ${isEvenRow}>
                    <td rowspan="2" style="color: ${rankColor}; font-weight: 600;">${rank}</td>
                    <td colspan="5" class="team-name">${r.teamName}</td>
                </tr>
                <tr ${isEvenRow}>
                    <td colspan="3" class="team-points">${r.currentPoints.toLocaleString()}</td>
                    <td colspan="2" class="team-change" style="color: ${pointDiffColor};">${formattedPointDiff} ${rankIcon}</td>
                </tr>
            `;
        }).join("")}
    </table>`;

    const style = document.createElement("style");
    style.textContent = `
        .team-ranking-container {
            padding: 8px;
            background-color: #3b3b3b;
            margin: 10px auto;
            width: 460px;
            text-align: center;
            font-family: Arial, sans-serif;
            color: #ededed;
        }
        .ranking-table {
            width: 100%;
            margin-top: 10px;
            border-collapse: collapse;
            table-layout: fixed;
        }
        .ranking-table th, .ranking-table td {
            padding: 6px;
            border: 1px solid #ededed;
            text-align: center;
        }
        .ranking-table th {
            background-color: #555;
        }
        .team-name {
            font-size: 16px;
        }
        .team-points {
            font-size: 16px;
            color: #ffcc00;
        }
        .team-change {
            font-size: 16px;
        }
        .rank_state_img {
            width: 20px;
            height: 20px;
            margin-left: 5px;
            vertical-align: middle;
        }
        .loading-status {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: white;
            background: rgba(0, 0, 0, 0.9);
            padding: 10px;
            width: 220px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
            z-index: 9999;
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
        }
    `;
    document.head.appendChild(style);

    if (teamRanking) {
        teamRanking.insertAdjacentElement("afterend", resultDiv);
    }
}

fetchTeamPoints();