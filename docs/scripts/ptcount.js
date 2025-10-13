function displayPt() {
    const monthlyData = {}; 
    const logBlocks = document.querySelectorAll(".net_point_log_block > div[name^='aggr']");
    const selectElement = document.querySelector("select[name='aggrDate']");
    const options = selectElement.querySelectorAll("option");
    const availableMonths = Array.from(options).map(option => option.value);

    logBlocks.forEach(block => {
        const monthName = block.getAttribute("name")?.slice(4); 
        if (!monthName) return; 
        
        const logEntries = block.querySelectorAll(".net_point_log_history");
        if (!monthlyData[monthName]) {
            monthlyData[monthName] = 0;
        }

        logEntries.forEach(entry => {
            const pointElement = entry.querySelector(".net_point_log_history_point");
            if (pointElement?.classList.contains("text_light_blue")) {
                const pointText = pointElement.textContent.trim();
                const pointValue = parseInt(pointText.replace(/[^\d]/g, '')); 
                monthlyData[monthName] += isNaN(pointValue) ? 0 : pointValue;
            }
        });
    });

    let message = "Total：(Daily limit 30 pt)\n";
    availableMonths.forEach((month, index) => {
        const points = monthlyData[month] || 0;
        message += `${month.slice(0, 4)}/${month.slice(4)}: ${points} pt`;
        if (index === availableMonths.length - 1) {
            message += " (Incomplete)";
        }
        message += "\n";
    });

    alert(message);
}
displayPt();
