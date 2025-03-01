(function () {
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
                    scoreList.style.backgroundColor = "#ffc3c3";
                } else {
                    scoreList.style.backgroundImage = `linear-gradient(to right, #ffc3c3 ${percentage}%, transparent ${percentage}%)`;
                }
            }
        }
        scoreList.style.height = "82px";
    });
})();
