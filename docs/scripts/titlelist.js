function updateTitleStats() {
    const titleContainer = document.querySelector('.frame01.w460');
    if (!titleContainer) return;

    const normalCount = titleContainer.querySelectorAll('.honor_block_normal').length;
    const silverCount = titleContainer.querySelectorAll('.honor_block_silver').length;
    const goldCount = titleContainer.querySelectorAll('.honor_block_gold').length;
    const platinumCount = titleContainer.querySelectorAll('.honor_block_platina').length;
    const rainbowCount = titleContainer.querySelectorAll('.honor_block_rainbow').length;
    const totalCount = titleContainer.querySelectorAll('.honor_get_block').length;

    const otherCount = totalCount - (normalCount + silverCount + goldCount + platinumCount + rainbowCount);

    const tableHTML = `
        <div class="box01 w420">
            <table class="title-table">
                <tr class="header-row">
                    <th class="normal-bg">Normal</th>
                    <th class="silver-bg">Silver</th>
                    <th class="gold-bg">Gold</th>
                    <th class="platinum-bg small-text">Platinum</th>
                    <th class="rainbow-bg small-text">Rainbow</th>
                    <th class="other-bg">Other</th>
                </tr>
                <tr class="count-row">
                    <td>${normalCount}</td>
                    <td>${silverCount}</td>
                    <td>${goldCount}</td>
                    <td>${platinumCount}</td>
                    <td>${rainbowCount}</td>
                    <td>${otherCount}</td>
                </tr>
            </table>
            <div class="total-title">Total Title：<strong>${totalCount.toLocaleString()}</strong></div>
        </div>
    `;

    let titleStatsElement = document.getElementById('titleStats');
    if (!titleStatsElement) {
        titleStatsElement = document.createElement('div');
        titleStatsElement.id = 'titleStats';
    }
    titleStatsElement.innerHTML = tableHTML;

    const titleElement = document.getElementById('title');
    if (titleElement) {
        titleElement.before(titleStatsElement);
    }
}

updateTitleStats();

const style = document.createElement('style');
style.innerHTML = `
    .title-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        text-align: center;
        table-layout: fixed;
        margin: 10px auto;
    }
    .title-table th, .title-table td {
        border: 1px solid #ccc;
        padding: 6px;
        width: 16.66%;
        font-weight: 700;
    }
    .title-table th {
        font-family: Arial, sans-serif;
        font-size: 80%; /* 所有標題字體縮小 */
    }
    .title-table th.normal-bg { background-color: #cdcdcd; }
    .title-table th.silver-bg { background-color: #c4e9ff; }
    .title-table th.gold-bg { background-color: #f5cf42; }
    .title-table th.platinum-bg { background-color: #ffef9e; }
    .title-table th.rainbow-bg { background-color: #b1ff9e; }
    .title-table th.other-bg { background-color: #ffcce6; }

    .title-table .count-row td {
        background-color: #ffffee;
        font-size: 90%;
    }
    .small-text {
        font-size: 70% !important;
    }
    .total-title {
        font-family: Arial, sans-serif;
        margin: 10px auto;
    }
`;
document.head.appendChild(style);
