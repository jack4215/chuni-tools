async function fetchData() {
    try {
        // **建立 Now Loading 訊息**
        let statsElement = document.getElementById('statsContainer');
        if (!statsElement) {
            statsElement = document.createElement('div');
            statsElement.id = 'statsContainer';
        }
        statsElement.innerHTML = `<div class="box01 w420" class="Count-Info" style="text-align:center;">Please Wait...(0/9)</div>`;

        const insertTarget = document.querySelector('.pt_15.pb_10');
        if (insertTarget) {
            insertTarget.after(statsElement);
        }

        let completedRequests = 0;
        function updateLoadingMessage() {
            statsElement.innerHTML = `<div class="box01 w420" class="Count-Info" style="text-align:center;">Total Customize is Loading...(${completedRequests}/9)</div>`;
        }
        updateLoadingMessage();

        async function fetchAndParse(url, selector) {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
            const html = await response.text();
            const doc = new DOMParser().parseFromString(html, "text/html");
            completedRequests++;
            updateLoadingMessage();
            return doc.querySelectorAll(selector).length;
        }

        // **抓取稱號數據**
        const titleUrl = 'https://chunithm-net-eng.com/mobile/collection/trophy/';
        const titleResponse = await fetch(titleUrl);
        if (!titleResponse.ok) throw new Error("Failed to fetch title page");
        const titleHtml = await titleResponse.text();
        const titleDoc = new DOMParser().parseFromString(titleHtml, "text/html");
        completedRequests++;
        updateLoadingMessage();

        const titleContainer = titleDoc.querySelector('.frame01.w460');
        if (!titleContainer) return;

        const titleCounts = {
            Normal: titleContainer.querySelectorAll('.honor_block_normal').length,
            Silver: titleContainer.querySelectorAll('.honor_block_silver').length,
            Gold: titleContainer.querySelectorAll('.honor_block_gold').length,
            Platinum: titleContainer.querySelectorAll('.honor_block_platina').length,
            Rainbow: titleContainer.querySelectorAll('.honor_block_rainbow').length,
        };
        titleCounts.Other = titleContainer.querySelectorAll('.honor_get_block').length -
            (titleCounts.Normal + titleCounts.Silver + titleCounts.Gold + titleCounts.Platinum + titleCounts.Rainbow);
        titleCounts.Total = Object.values(titleCounts).reduce((a, b) => a + b, 0);

        // **抓取 Avatar 數據**
        const avatarCategories = [
            { name: "Face", url: "https://chunithm-net-eng.com/mobile/collection/avatarCustom/customiseFace/" },
            { name: "Head", url: "https://chunithm-net-eng.com/mobile/collection/avatarCustom/customiseHead/" },
            { name: "Wear", url: "https://chunithm-net-eng.com/mobile/collection/avatarCustom/customiseWear/" },
            { name: "Item", url: "https://chunithm-net-eng.com/mobile/collection/avatarCustom/customiseItem/" },
            { name: "Back", url: "https://chunithm-net-eng.com/mobile/collection/avatarCustom/customiseBack/" }
        ];

        let avatarCounts = {};
        for (let category of avatarCategories) {
            avatarCounts[category.name] = await fetchAndParse(category.url, '.avatar_parts_name_block');
        }

        const totalCustomise = Object.values(avatarCounts).reduce((a, b) => a + b, 0);

        // **抓取額外數據**
        const additionalCategories = [
            { name: "Name Plate", url: "https://chunithm-net-eng.com/mobile/collection/nameplate/", class: ".nameplate_block" },
            { name: "Map Icon", url: "https://chunithm-net-eng.com/mobile/collection/mapIcon/", class: ".mapicon_block" },
            { name: "System Voice", url: "https://chunithm-net-eng.com/mobile/collection/systemVoice/", class: ".systemvoice_block" }
        ];

        let additionalCounts = {};
        for (let category of additionalCategories) {
            additionalCounts[category.name] = await fetchAndParse(category.url, category.class);
        }

        // **完成載入，移除 Loading 訊息，插入正式數據**
        statsElement.innerHTML = `
            <div class="box01 w420">
                <div class="Count-Info">Total Customize</div>
                <table class="stats-table">
                    <tr class="count-row">
                        <td style="background-color: #e1e1e1; font-family: Arial, sans-serif;">Avatar</td>
                        <td>${totalCustomise.toLocaleString()}</td>
                    </tr>
                    <tr class="count-row">
                        <td style="background-color: #e1e1e1; font-family: Arial, sans-serif;">Title</td>
                        <td>${titleCounts.Total.toLocaleString()}</td>
                    </tr>
                    ${Object.entries(additionalCounts).map(([key, value]) => `
                        <tr class="count-row">
                            <td style="background-color: #e1e1e1; font-family: Arial, sans-serif;">${key}</td>
                            <td>${value.toLocaleString()}</td>
                        </tr>`).join('')}
                </table>
                <div class="Count-Info">Avatar Info</div>
                <table class="avatar-table">
                    <tr class="header-row">
                        ${Object.keys(avatarCounts).map(key => `<th class="${key.toLowerCase()}-bg">${key}</th>`).join('')}
                    </tr>
                    <tr class="count-row">
                        ${Object.values(avatarCounts).map(value => `<td>${value}</td>`).join('')}
                    </tr>
                </table>
                <div class="Count-Info">Title Info</div>
                <table class="title-table">
                    <tr class="header-row">
                        ${Object.keys(titleCounts).map(key => key !== "Total" ? `<th class="${key.toLowerCase()}-bg">${key}</th>` : '').join('')}
                    </tr>
                    <tr class="count-row">
                        ${Object.values(titleCounts).map((value, index) => index < 6 ? `<td>${value}</td>` : '').join('')}
                    </tr>
                </table>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();



// **新增表格樣式**
const style = document.createElement('style');
style.innerHTML = `
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px auto;
        text-align: center;
        table-layout: fixed; /* 固定欄位寬度 */
    }

    /* 確保所有欄位均分 */
    th, td {
        width: 16.67%;
        border: 1px solid #ccc;
        padding: 6px;
        font-weight: 700;
    }

    th {
        font-size: 80%;
        font-family: Arial, sans-serif;
    }

    .title-table .count-row td,
    .avatar-table .count-row td,
    .stats-table {
        background-color: #ffffee;
        font-size: 90%;
    }

    /* Title 表格背景色 */
    .title-table th.normal-bg { background-color: #cdcdcd; }
    .title-table th.silver-bg { background-color: #c4e9ff; }
    .title-table th.gold-bg { background-color: #f5cf42; }
    .title-table th.platinum-bg { background-color: #ffef9e; }
    .title-table th.rainbow-bg { background-color: #b1ff9e; }
    .title-table th.other-bg { background-color: #ffcce6; }

    .title-table th.platinum-bg, 
    .title-table th.rainbow-bg {
        font-size: 70% !important;
    }

    /* Customise 表格背景色 */
    .avatar-table th.face-bg { background-color: #b4fdfd; }
    .avatar-table th.head-bg { background-color: #a6ffa6; }
    .avatar-table th.wear-bg { background-color: #ffa0a0; }
    .avatar-table th.item-bg { background-color: #ffd18f; }
    .avatar-table th.back-bg { background-color: #ff9fff; }

    .Count-Info {
        font-family: Arial, sans-serif;
        margin: 12px auto;
        font-weight: bold;
        text-align: center;
    }

`;
document.head.appendChild(style);
