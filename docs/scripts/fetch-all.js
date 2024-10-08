(() => {
    "use strict";
  
    const Language = {
      EN_US: "en_US",
      ZH_TW: "zh_TW"
    };
  
    const BASE_URL = "https://chunithm-net-eng.com";
    const Difficulties = {
      BASIC: "BAS",
      ADVANCED: "ADV",
      EXPERT: "EXP",
      MASTER: "MAS",
      ULTIMA: "ULT"
    };
    const Genres = {
      "P & A": "0",
      niconico: "2",
      "東方Project": "3",
      ORIGINAL: "5",
      VARIETY: "6",
      "イロドリ": "7",
      "ゲキマイ": "9"
    };
    const difficultyValues = Object.values(Difficulties);
    const genreKeys = Object.keys(Genres);
  
    function getScriptBaseUrl(searchKey) {
      const scripts = Array.from(document.querySelectorAll("script"));
      while (scripts.length) {
        const script = scripts.pop();
        if (script?.src.includes(searchKey)) {
          const url = new URL(script.src);
          const path = url.pathname;
          return url.origin + path.substring(0, path.lastIndexOf("/scripts"));
        }
      }
      return "https://jack4215.github.io/chuni-tools";
    }
  
    function getCookie(name) {
      const cookie = document.cookie
        .split(";")
        .map((entry) => decodeURIComponent(entry.trim()))
        .map((entry) => entry.split("="))
        .find((entry) => entry[0] === name);
      return cookie ? cookie[1] : "";
    }
  
    async function fetchData(endpoint, isPost = false, body = null) {
      const response = await fetch(BASE_URL + endpoint, {
        headers: { "Cache-Control": "no-cache" },
        method: isPost ? "POST" : "GET",
        body: body
      });
      if ([503, 405].includes(response.status)) throw new Error("Service temporarily unavailable");
      if (response.url.includes("/error")) throw new Error("Request failed: rejected by server");
      return new DOMParser().parseFromString(await response.text(), "text/html");
    }
  
    function parseNumber(str) {
      return Number([...str].filter((char) => char !== ",").join(""));
    }
  
    const LangMessages = {
      [Language.EN_US]: {
        pleaseLogin: "Please login to CHUNITHM-NET.",
        needReload: "Please reload CHUNITHM-NET.",
        analyzeRating: "Analyze Rating"
      },
      [Language.ZH_TW]: {
        pleaseLogin: "請先登入 CHUNITHM-NET 再執行本程式。",
        needReload: "請重新整理 CHUNITHM-NET。",
        analyzeRating: "前往查分器"
      }
    };
  
    function getCurrentLanguage() {
      const urlLang = new URLSearchParams(location.search).get("lang");
      if (urlLang) return urlLang.startsWith("zh") ? Language.ZH_TW : Language.EN_US;
  
      const storedLang = localStorage.getItem("language");
      if (storedLang) return storedLang === Language.ZH_TW ? Language.ZH_TW : Language.EN_US;
  
      return navigator.language.startsWith("zh") ? Language.ZH_TW : Language.EN_US;
    }
  
    const lang = getCurrentLanguage();
    const messages = LangMessages[lang];
  
    if (!getCookie("_t")) {
      alert(messages.pleaseLogin);
      window.location.href = BASE_URL;
      return;
    }
  
    try {
      injectRatingAnalyzerButton();
      listenForMessages();
    } catch (error) {
      alert(messages.needReload);
      console.error(error);
    }
  
    function injectRatingAnalyzerButton() {
      const linkElement = document.createElement("a");
      linkElement.className = "chuni-tool-btn";
      linkElement.innerText = messages.analyzeRating;
      linkElement.href = getScriptBaseUrl("fetch-all") + "/record-viewer/#best";
      linkElement.target = "recordViewer";
  
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = getScriptBaseUrl("fetch-all") + "/common/styles/inject.css";
  
      document.head.appendChild(styleLink);
      styleLink.addEventListener("load", () => {
        document.querySelector(".clearfix")?.insertAdjacentElement("afterend", linkElement);
      });
    }
  
    function listenForMessages() {
      window.addEventListener("message", async function (event) {
        const { action, payload, uuid } = event.data;
        const respond = (data) => event.source.postMessage({ action: "respond", payload: { target: payload.target, data }, uuid }, event.origin);
  
        try {
          switch (action) {
            case "request":
              const data = await handleRequest(payload.target, payload.data);
              respond(data);
              break;
            case "saveConfig":
              const { lang } = payload.data;
              if (lang) {
                localStorage.setItem("language", lang);
                console.log(`Language changed to: ${lang}`);
              }
              break;
          }
        } catch (error) {
          console.error(error);
          respond({ error });
        }
      });
    }
  
    async function handleRequest(target, data) {
      switch (target) {
        case "bestRecord":
          return await fetchBestRecord(data.difficulty || Difficulties.MASTER);
        case "playHistory":
          return await fetchPlayHistory();
        case "recentRecord":
          return await fetchRecentRecord();
        case "playerStats":
          return await fetchPlayerStats();
        case "songPlayCount":
          return await fetchSongPlayCount(data.idx, data.difficulty);
      }
    }
  
    async function fetchBestRecord(difficulty) {
      const formData = new FormData();
      formData.append("genre", "99");
      formData.append("token", getCookie("_t"));
  
      const endpointMap = {
        [Difficulties.ULTIMA]: "sendUltima",
        [Difficulties.MASTER]: "sendMaster",
        [Difficulties.EXPERT]: "sendExpert",
        [Difficulties.ADVANCED]: "sendAdvanced",
        [Difficulties.BASIC]: "sendBasic"
      };
      const doc = await fetchData(`/mobile/record/musicGenre/${endpointMap[difficulty]}`, true, formData);
      return Array.from(doc.querySelectorAll(".box01.w420")[1].querySelectorAll("form")).map((form) => {
        const icon = form.querySelector(".play_musicdata_icon");
        const scoreText = form.querySelector(".text_b")?.innerHTML;
        return {
          title: form.querySelector(".music_title")?.innerHTML,
          score: scoreText ? parseNumber(scoreText) : -1,
          difficulty,
          clear: icon?.querySelector('img[src*="alljustice"]') ? "AJ" : icon?.querySelector('img[src*="fullcombo"]') ? "FC" : "",
          idx: form.querySelector('input[name="idx"]').value
        };
      }).filter((entry) => entry.title && entry.score);
    }
  
    async function fetchPlayHistory() {
      const doc = await fetchData("/mobile/record/playlog");
      return Array.from(doc.querySelectorAll(".mt_10 .frame02.w400")).map((entry) => {
        const scoreText = entry.querySelector(".play_musicdata_score_text")?.innerHTML;
        const imgSrc = entry.querySelector(".play_track_result img").src;
        const difficulty = /musiclevel_.*(?=\.png)/.exec(imgSrc)[0].slice(11);
        const icons = Array.from(entry.querySelectorAll(".play_musicdata_icon"));
  
        return {
          title: entry.querySelector(".play_musicdata_title").innerHTML,
          score: parseNumber(scoreText),
          difficulty: difficulty === "ultimate" ? "ULT" : difficulty === "worldsend" ? "WE" : Difficulties[difficulty],
          clear: icons.some((icon) => icon.querySelector('img[src*="alljustice"]')) ? "AJ" : icons.some((icon) => icon.querySelector('img[src*="fullcombo"]')) ? "FC" : "",
          timestamp: Date.parse(entry.querySelector(".play_datalist_date").innerHTML)
        };
      });
    }
  
    async function fetchRecentRecord() {
      const doc = await fetchData("/mobile/home/playerData/ratingDetailRecent");
      return Array.from(doc.querySelectorAll("form")).map((form) => {
        const difficulty = form.querySelector("input[name=diff]")?.value;
        return {
          title: form.querySelector(".music_title").innerHTML,
          score: parseNumber(form.querySelector(".text_b")?.innerHTML),
          difficulty: difficultyValues[parseInt(difficulty)],
          clear: ""
        };
      });
    }
  
    async function fetchPlayerStats() {
      const doc = await fetchData("/mobile/home/playerData");
      const playerHonor = doc.querySelector(".player_honor_short");
      const honorBg = /honor_bg_.*(?=\.png)/.exec(playerHonor.style.backgroundImage);
      const rating = Array.from(doc.querySelectorAll(".player_rating_num_block img")).map((img) =>
        /rating_.*_comma.png/.test(img.src) ? "." : /rating_.*_[0-9]*(?=\.png)/.exec(img.src)[0].slice(-1)
      ).join("");
  
      return {
        name: doc.querySelector(".player_name_in").innerHTML,
        honor: { text: doc.querySelector(".player_honor_text_view span").innerHTML, color: honorBg ? honorBg[0].slice(9) : "normal" },
        rating,
        ratingMax: doc.querySelector(".player_rating_max").innerHTML,
        playCount: doc.querySelector(".user_data_play_count .user_data_text").innerHTML,
        lastPlayed: Date.parse(doc.querySelector(".player_lastplaydate_text").innerHTML)
      };
    }
  
    async function fetchSongPlayCount(idx, difficulty) {
      const formData = new FormData();
      formData.append("idx", idx);
      formData.append("genre", "99");
      formData.append("diff", difficultyValues.indexOf(difficulty).toString());
      formData.append("token", getCookie("_t"));
  
      const doc = await fetchData("/mobile/record/musicGenre/sendMusicDetail/", true, formData);
      const timesPlayedText = doc.querySelector(`.music_box.bg_${Object.keys(Difficulties).find(key => Difficulties[key] === difficulty)} .box14 > div`).querySelector(".text_b")?.innerHTML.replace("times", "");
      return parseInt(timesPlayedText);
    }
  })();
  