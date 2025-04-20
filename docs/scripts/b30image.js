async function fetchPageDoc(url) {
    return new DOMParser().parseFromString(await (await fetch(url)).text(), "text/html");
}

async function fetchMusicFormDoc(url, token) {
    return new DOMParser().parseFromString(await (await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `genre=99&token=${token}`
    })).text(), "text/html");
}

function switchNumToDiff(n) {
    switch (n) {
        case 0:
            return "Basic";
        case 1:
            return "Advanced";
        case 2:
            return "Expert";
        case 3:
            return "Master";
        case 4:
            return "Ultima";
        default:
            return "Unknown";
    }
}

// https://qiita.com/h53/items/05139982c6fd81212b08
function toISOStringWithTimezone(date) {
    const pad = (str) => (`0${str}`).slice(-2);
    const year = (date.getFullYear()).toString();
    const month = pad((date.getMonth() + 1).toString());
    const day = pad(date.getDate().toString());
    const hour = pad(date.getHours().toString());
    const min = pad(date.getMinutes().toString());
    const sec = pad(date.getSeconds().toString());
    const tz = -date.getTimezoneOffset();
    const sign = tz >= 0 ? '+' : '-';
    const tzHour = pad((tz / 60).toString());
    const tzMin = pad((tz % 60).toString());

    return `${year}-${month}-${day}T${hour}:${min}:${sec}${sign}${tzHour}:${tzMin}`;
}

async function main() {
    // https://note.affi-sapo-sv.com/js-sleep.php
    const sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));

    const VERSION = "2.0.0";
    const difficulties = ["Basic", "Advanced", "Expert", "Master", "Ultima"];
    const engMode = location.hostname === "chunithm-net-eng.com";
    let baseUrl = engMode ? "https://chunithm-net-eng.com/" : "https://new.chunithm-net.com/chuni-mobile/html/";
    baseUrl += "mobile/";
    const homeUrl = `${baseUrl}home/`;
    const musicUrl = `${baseUrl}record/musicGenre/`;
    const sendUrl = `${musicUrl}send`;
    const ratingsUrlBase = `${homeUrl}playerData/`;
    const ratingsBestUrl = `${ratingsUrlBase}ratingDetailBest/`; // ベスト枠
    const ratingsNewUrl = `${ratingsUrlBase}ratingDetailRecent/`; // 新曲枠（URL上はリーセント枠と変化なし）
    const playerData = {};

    // location check
    if (location.hostname !== "new.chunithm-net.com" && location.hostname !== "chunithm-net-eng.com") {
        alert("このページでは実行できません。 You can't run this script on this page.");
        return;
    }

    const homeDoc = await fetchPageDoc(homeUrl);
    if (homeDoc.querySelector(".player_honor_text") === null) {
        alert("CHUNITHM-NETにログインし、Aimeカードを選択してから実行してください。 Please login to CHUNITHM-NET and select your Aime card.");
        return;
    }

    const UiBase = document.body.appendChild(document.createElement("div"));

    // GUI
    UiBase.style.position = "absolute";
    UiBase.style.top = "50%";
    UiBase.style.left = "50%";
    UiBase.style.transform = "translate(-50%, -50%)";
    UiBase.style.backgroundColor = "#fff";
    UiBase.style.padding = "10px";
    UiBase.style.borderRadius = "10px";
    UiBase.style.width = "min(90%, 400px)";
    UiBase.style.height = "fit-content";
    UiBase.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    UiBase.style.overflowX = "hidden";
    UiBase.style.textAlign = "left";
    UiBase.innerHTML = `<p>CHUNITHM Score Data Downloader v${VERSION}</p>`;
    UiBase.innerHTML += `<p>by <a href="https://reiwa.f5.si/" target="_blank">${engMode ? "Qman's Tools Square" : "音ゲーツール置き場"}</a></p><hr>`;
    const progressElement = UiBase.appendChild(document.createElement("div"));

    const fullProgressCount = 8;
    let progressCount = 1;
    progressElement.innerHTML = engMode ? `<p>(${String(progressCount)}/${String(fullProgressCount)}) Fetching player's profiles...</p>` : `<p>(${String(progressCount)}/${String(fullProgressCount)}) プレイヤープロフィールを取得しています...</p>`;

    await sleep(1000);

    // Player Data
    const honors = homeDoc.querySelectorAll(".player_honor_text");
    const mainHonor = honors[0].textContent;
    let subHonor1 = null;
    let subHonor2 = null;
    if (honors.length > 1) {
        subHonor1 = honors[1].textContent;
    }
    if (honors.length > 2) {
        subHonor2 = honors[2].textContent;
    }
    const name = homeDoc.querySelector(".player_name_in").textContent;
    const ratingBlockImgs = homeDoc.querySelectorAll(".player_rating_num_block img");
    const ratingStr = [];
    for (let i = 0; i < ratingBlockImgs.length; i++) {
        const src = ratingBlockImgs[i].src;
        if (src.includes("comma")) {
            ratingStr.push(".");
            continue;
        }
        const match = src.match(/([0-9])\.png/);
        if (match) ratingStr.push(match[1]);
    }
    const rating = Number(ratingStr.join(""));
    let playerLevel = Number(homeDoc.querySelector(".player_lv").innerText);
    const playerReborn = homeDoc.querySelector(".player_reborn");
    if (playerReborn !== null) {
        playerLevel += Number(playerReborn.innerText) * 100;
    }
    const lastPlayed = homeDoc.querySelector(".player_lastplaydate_text").textContent; // format: yyyy/MM/DD hh:mm

    playerData.appVersion = VERSION;
    playerData.honor = mainHonor;
    playerData.subHonor1 = subHonor1;
    playerData.subHonor2 = subHonor2;
    playerData.name = name;
    playerData.rating = rating;
    playerData.level = playerLevel;
    playerData.updatedAt = toISOStringWithTimezone(new Date());
    playerData.lastPlayed = toISOStringWithTimezone(new Date(lastPlayed))

    const musicData = [];

    // token取得
    const preDoc = await fetchPageDoc(musicUrl);
    const token = preDoc.querySelector("input[name=token]").value;

    // フォーム取得
    const form = preDoc.getElementsByTagName("form")[0];
    const formData = new FormData(form);
    formData.set("genre", 99);
    formData.set("token", token);

    for (let i = 0; i < difficulties.length; i++) {
        progressCount++;
        const difficulty = difficulties[i];
        progressElement.innerHTML = engMode ? `<p>(${String(progressCount)}/${String(fullProgressCount)}) Fetching ${difficulty.toUpperCase()} data...</p>` : `<p>(${String(progressCount)}/${String(fullProgressCount)}) ${difficulty.toUpperCase()}のデータを取得しています...</p>`;
        const musicDoc = await fetchMusicFormDoc(sendUrl + difficulty, token);

        const forms = musicDoc.querySelectorAll("form");
        for (let j = 0; j < forms.length; j++) {
            if (forms[j].querySelector(".music_title") === null) continue;
            const title = forms[j].querySelector(".music_title").textContent.trim();
            if (!title) continue;

            let score = 0;
            if (forms[j].querySelector(".play_musicdata_highscore") !== null) {
                score = Number(forms[j].querySelector(".play_musicdata_highscore").querySelector("span").textContent.replaceAll(",", ""));
            }
            let isAllJustice = false;
            let isFullCombo = false;
            let fullChainLv = 0; // 0: 未フルチェイン, 1: 白金フルチェイン, 2: 金フルチェイン
            const lampImgsDiv = forms[j].querySelector(".play_musicdata_icon");
            if (lampImgsDiv !== null) {
                const lampImgs = forms[j].querySelector(".play_musicdata_icon").querySelectorAll("img");
                for (let k = 0; k < lampImgs.length; k++) {
                    const src = lampImgs[k].src;

                    if (src.includes("alljustice")) {
                        isAllJustice = true;
                        isFullCombo = true;
                    } else if (src.includes("fullcombo")) {
                        isFullCombo = true;
                    }

                    if (src.includes("fullchain2")) {
                        fullChainLv = 2;
                    } else if (src.includes("fullchain")) {
                        fullChainLv = 1;
                    }
                }
            };
            const idx = Number.parseInt(forms[j].querySelector('input[type="hidden"][name="idx"]').getAttribute("value"));

            musicData.push({
                title: title,
                difficulty: difficulty,
                score: score,
                isAllJustice: isAllJustice,
                isFullCombo: isFullCombo,
                fullChainLv: fullChainLv,
                idx: idx
            });
        }

        await sleep(1000);
    }

    // レーティング対象楽曲: AJ/FCの照合のためmusicDataを使う
    // ベスト枠
    progressCount++;
    progressElement.innerHTML = engMode ? `<p>(${String(progressCount)}/${String(fullProgressCount)}) Fetching best songs...</p>` : `<p>(${String(progressCount)}/${String(fullProgressCount)}) ベスト枠楽曲を取得しています...</p>`;
    const ratingsBestDoc = await fetchPageDoc(ratingsBestUrl);
    const bestMusics = ratingsBestDoc.getElementsByTagName("form");
    const bestMusicData = [];
    for (let i = 0; i < bestMusics.length; i++) {
        const music = bestMusics[i];
        const title = music.querySelector(".music_title").textContent.trim();
        const difficulty = switchNumToDiff(Number(music.querySelector('input[type="hidden"][name="diff"]').getAttribute("value")));
        const score = Number(music.querySelector(".play_musicdata_highscore").querySelector("span").textContent.replaceAll(",", ""));

        // AJ/FCの照合
        let isAllJustice = false;
        let isFullCombo = false;
        let fullChainLv = 0;
        const musicInMusicData = musicData.filter(m => m.title === title && m.difficulty === difficulty && m.score === score)[0];
        if (musicInMusicData) {
            isAllJustice = musicInMusicData.isAllJustice;
            isFullCombo = musicInMusicData.isFullCombo;
            fullChainLv = musicInMusicData.fullChainLv;
        }
        const idx = Number.parseInt(music.querySelector('input[type="hidden"][name="idx"]').getAttribute("value"));

        bestMusicData.push({
            title: title,
            difficulty: difficulty,
            score: score,
            isAllJustice: isAllJustice,
            isFullCombo: isFullCombo,
            fullChainLv: fullChainLv,
            idx: idx
        });
    }
    await sleep(1000);

    // 新曲枠
    progressCount++;
    progressElement.innerHTML = engMode ? `<p>(${String(progressCount)}/${String(fullProgressCount)}) Fetching new songs...</p>` : `<p>(${String(progressCount)}/${String(fullProgressCount)}) 新曲枠楽曲を取得しています...</p>`;
    const ratingsNewDoc = await fetchPageDoc(ratingsNewUrl);
    const newMusics = ratingsNewDoc.getElementsByTagName("form");
    const newMusicData = [];
    for (let i = 0; i < newMusics.length; i++) {
        const music = newMusics[i];
        const title = music.querySelector(".music_title").textContent.trim();
        const difficulty = switchNumToDiff(Number(music.querySelector('input[type="hidden"][name="diff"]').getAttribute("value")));
        const score = Number(music.querySelector(".play_musicdata_highscore").querySelector("span").textContent.replaceAll(",", ""));

        // AJ/FCの照合
        let isAllJustice = false;
        let isFullCombo = false;
        let fullChainLv = 0;
        const musicInMusicData = musicData.filter(m => m.title === title && m.difficulty === difficulty && m.score === score)[0];
        if (musicInMusicData) {
            isAllJustice = musicInMusicData.isAllJustice;
            isFullCombo = musicInMusicData.isFullCombo;
            fullChainLv = musicInMusicData.fullChainLv;
        }
        const idx = Number.parseInt(music.querySelector('input[type="hidden"][name="idx"]').getAttribute("value"));

        newMusicData.push({
            title: title,
            difficulty: difficulty,
            score: score,
            isAllJustice: isAllJustice,
            isFullCombo: isFullCombo,
            fullChainLv: fullChainLv,
            idx: idx
        });
    }
    await sleep(1000);

    progressElement.style.textAlign = "center";
    progressElement.innerHTML = engMode ?
        "<p>Completed!</p><p>Click on the links below to load data directly into the tool.</p>" :
        "<p>完了しました！</p><p>以下のリンクをクリックすると、ツールに直接データが読み込まれます。</p>";

    playerData.best = bestMusicData;
    playerData.new = newMusicData;
    playerData.score = musicData;

    const now = new Date();

    // CHUNITHM Best Songs Image Generator NEW
    const b30Wrapper = progressElement.appendChild(document.createElement("p"));
    const b30 = b30Wrapper.appendChild(document.createElement("a"));
    b30.textContent = "CHUNITHM Best Songs Image Generator NEW";
    b30.style = "text-decoration: underline; cursor: pointer;";
    b30.addEventListener("click", () => {
        window.open(`https://reiwa.f5.si/newbestimg/chunithm_int?b=${String(Math.floor(now.getTime() / 1000))}`);
    });

    // CHUNITHM MY CONSTANTS
    const mcWrapper = progressElement.appendChild(document.createElement("p"));
    const mc = mcWrapper.appendChild(document.createElement("a"));
    mc.textContent = "CHUNITHM MY CONSTANTS";
    mc.style = "text-decoration: underline; cursor: pointer;";
    mc.addEventListener("click", () => {
        window.open(`https://reiwa.f5.si/newmyconstants/chunithm-int?b=${String(Math.floor(now.getTime() / 1000))}`);
    });

    // // テスト用リンク
    // const testWrapper = progressElement.appendChild(document.createElement("p"));
    // const test = testWrapper.appendChild(document.createElement("a"));
    // test.textContent = "テスト用リンク";
    // test.style = "text-decoration: underline; cursor: pointer;";
    // test.addEventListener("click", () => {
    //     window.open("https://qman11010101.github.io/postmessage_practice?b=" + String(Math.floor(now.getTime() / 1000)));
    // });

    window.addEventListener("message", (e) => {
        if (e.origin !== "https://qman11010101.github.io" && e.origin !== "https://reiwa.f5.si") return;
        if (e.data !== "ready") return;
        e.source.postMessage(JSON.stringify(playerData), e.origin);
    })

    // ダウンロードリンク
    const blob = new Blob([JSON.stringify(playerData)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const downloaderWrapper = progressElement.appendChild(document.createElement("p"));
    const downloader = downloaderWrapper.appendChild(document.createElement("a"));
    downloader.textContent = engMode ? "Download data as a JSON file" : "データをJSON形式でダウンロードする";
    downloader.href = url;
    downloader.download = `chunithm-player-data_${String(Math.floor(now.getTime() / 1000))}.json`;

    const buttonStyle = "display: block; margin: 10px auto; padding: 5px 10px; font-size: 1.2rem; border: none; border-radius: 5px; background-color: rgb(13, 155, 13); color: #fff; cursor: pointer;";

    // 閉じるボタン
    const closer = progressElement.appendChild(document.createElement("button"));
    closer.textContent = engMode ? "Close" : "閉じる";
    closer.style = buttonStyle;
    closer.addEventListener("click", () => UiBase.remove());
}

main();
