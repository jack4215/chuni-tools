function displayPt() {
    const monthlyData = {}; 
    const logBlocks = document.querySelectorAll(".net_point_log_block > div[name^='aggr']");

    logBlocks.forEach(block => {
        const monthName = block.getAttribute("name").slice(4); 
        const logEntries = block.querySelectorAll(".net_point_log_history");
        if (!monthlyData[monthName]) {
            monthlyData[monthName] = 0;
        }

        logEntries.forEach(entry => {
            const pointElement = entry.querySelector(".net_point_log_history_point");
            if (pointElement && pointElement.classList.contains("text_light_blue")) {
                const pointText = pointElement.textContent.trim();
                const pointValue = parseInt(pointText.replace(/[^\d]/g, '')); 
                monthlyData[monthName] += isNaN(pointValue) ? 0 : pointValue;
            }
        });
    });

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; 

    const recentMonths = [];
    for (let i = 0; i < 5; i++) {
        const month = currentMonth - i > 0 ? currentMonth - i : currentMonth - i + 12;
        const year = currentMonth - i > 0 ? currentYear : currentYear - 1;
        const monthString = `${year}${month.toString().padStart(2, "0")}`;
        recentMonths.push(monthString);
    }

    let message = "近 5 個月的點數統計：(每日上限 30 pt)\n";
    recentMonths.forEach(month => {
        const points = monthlyData[month] || 0;
        message += `${month.slice(0, 4)}/${month.slice(4)}: ${points} pt\n`;
    });

    alert(message);
}

displayPt();
