( () => {
    "use strict";
    var e;
    function t(e) {
        const t = Array.from(document.querySelectorAll("script"));
        for (; t.length; ) {
            const r = t.pop();
            if (r?.src.includes(e)) {
                const e = new URL(r.src)
                  , t = e.pathname;
                return e.origin + t.substring(0, t.lastIndexOf("/scripts"))
            }
        }
        return "https://chuni.tsaibee.org"
    }
    function r(e) {
        const t = document.cookie.split(";").map((e => decodeURIComponent(e.trim()))).map((e => e.split("="))).find((t => t[0] === e));
        return t ? t[1] : ""
    }
    !function(e) {
        e.en_US = "en_US",
        e.zh_TW = "zh_TW"
    }(e || (e = {}));
    const a = "https://chunithm-net-eng.com";
    function n(e) {
        return Number([...e].filter((e => "," !== e)).join(""))
    }
    var o;
    !function(e) {
        e.basic = "BAS",
        e.advanced = "ADV",
        e.expert = "EXP",
        e.master = "MAS",
        e.ultima = "ULT"
    }(o || (o = {}));
    const c = Object.values(o);
    var l;
    async function i(e, t) {
        const r = await fetch(a + e, {
            headers: {
                "Cache-Control": "no-cache"
            },
            method: t ? "POST" : "GET",
            body: t
        });
        if (503 === r.status || 405 === r.status)
            throw new Error("Service temporarily unavailable");
        if (-1 != r.url.indexOf("/error"))
            throw new Error("Request failed: rejected by server");
        return (new DOMParser).parseFromString(await r.text(), "text/html")
    }
    !function(e) {
        e["P & A"] = "0",
        e.niconico = "2",
        e["東方Project"] = "3",
        e.ORIGINAL = "5",
        e.VARIETY = "6",
        e["イロドリ"] = "7",
        e["ゲキマイ"] = "9"
    }(l || (l = {})),
    Object.keys(l),
    async function(l) {
        const s = {
            [e.en_US]: {
                pleaseLogin: "Please login to CHUNITHM-NET first.",
                needReload: "Please reload CHUNITHM-NET.",
                analyzeRating: "Analyze Rating (Beta)"
            },
            [e.zh_TW]: {
                pleaseLogin: "請先登入 CHUNITHM-NET 再執行本程式。",
                needReload: "請重新整理 CHUNITHM-NET 再執行本程式。",
                analyzeRating: "分析遊戲成績 (Beta)"
            }
        }[function() {
            const t = new URLSearchParams(location.search);
            return t.get("lang") ? t.get("lang").startsWith("zh") ? e.zh_TW : e.en_US : function() {
                switch (localStorage.getItem("language")) {
                case e.en_US:
                    return e.en_US;
                case e.zh_TW:
                    return e.zh_TW
                }
                return null
            }() || (navigator.language.startsWith("zh") ? e.zh_TW : e.en_US)
        }()];
        if (!r("_t"))
            return alert(s.pleaseLogin),
            void (window.location.href = a);
        try {
            !function() {
                const e = l.createElement("a");
                e.className = "chuni-tool-btn";
                const r = l.createElement("link");
                r.rel = "stylesheet",
                r.href = t("fetch-all") + "/common/styles/inject.css",
                e.innerText = s.analyzeRating,
                e.href = t("fetch-all") + "/record-viewer-temp/#all",
                e.target = "recordViewer",
                l.getElementsByTagName("head")[0].appendChild(r),
                r.addEventListener("load", ( () => {
                    l.querySelector(".clearfix")?.insertAdjacentElement("afterend", e)
                }
                ))
            }(),
            window.addEventListener("message", (function(e) {
                switch (e.data.action) {
                case "request":
                    !function(e) {
                        const {payload: t, uuid: a} = e.data;
                        console.log("%cReceived request for: %c" + t.target, "color: gray", "color: white");
                        const l = function(e, t) {
                            if (!e)
                                throw new Error("Target window does not exist");
                            return (r, a, n) => {
                                const o = {
                                    action: r,
                                    payload: a
                                };
                                n && (o.uuid = n),
                                e.postMessage(o, t)
                            }
                        }(e.source, e.origin);
                        let s;
                        switch (t.target) {
                            case "allRecord":
                                console.log("%c    Target difficulty: %c" + t.data.difficulty, "color: gray", "color: white"),
                                s = async function(e=o.master) {
                                    const t = new FormData;
                                    t.append("genre", "99"),
                                    t.append("token", r("_t"));
                                    const a = {
                                        [o.ultima]: "sendUltima",
                                        [o.master]: "sendMaster",
                                        [o.expert]: "sendExpert",
                                        [o.advanced]: "sendAdvanced",
                                        [o.basic]: "sendBasic"
                                    }[e];   
                                    const c = await i("/mobile/record/musicGenre/" + a, t);
                                    const records = Array.from(c.querySelectorAll(".box01.w420")[1].querySelectorAll("form")).map((t => {
                                        const r = t.querySelector(".play_musicdata_icon"),
                                              a = t.querySelector(".text_b")?.innerHTML;
                                        return {
                                            title: t.querySelector(".music_title")?.innerHTML,
                                            score: a ? n(a) : -1,
                                            difficulty: e,
                                            clear: r?.querySelector('img[src*="alljustice"]') ? "AJ" : r?.querySelector('img[src*="fullcombo"]') ? "FC" : "",
                                            clear2: r?.querySelector('img[src*="clear"]') ? "CLR" : r?.querySelector('img[src*="hard"]') ? "HRD" : r?.querySelector('img[src*="absolutep"]') ? "ABS" : r?.querySelector('img[src*="absolute"]') ? "BRV" : r?.querySelector('img[src*="catastrophy"]') ? "CTS" : "",
                                            idx: t.querySelector('input[name="idx"]').value
                                        };
                                    })).filter((e => e.title && e.score));
                                    // Add hidden song
                                    const difficultyNames = {
                                        [o.ultima]: "ultima",
                                        [o.master]: "master",
                                        [o.expert]: "expert",
                                        [o.advanced]: "advanced",
                                        [o.basic]: "basic"
                                    };   
                                    const difficultyScore = sumScores(records);
                                    const totalHighScore = await fetchTotalHighScore(difficultyNames[e]);
                                 /*   records.push({
                                        title: "Forsaken Tale",
                                        score: totalHighScore - difficultyScore === 0 ? -1 : totalHighScore - difficultyScore, 
                                        difficulty: e,
                                        clear: "",
                                        idx: "2652"
                                    }); */
                                    // Add hidden song end
                                    return records;
                                }(t.data.difficulty);
                                break;
                            // Calculate total score
                            function sumScores(records) {
                                return records.reduce((sum, record) => sum + (record.score !== -1 ? record.score : 0), 0);
                            }                
                            async function fetchTotalHighScore(difficulty) {
                                const response = await fetch(`https://chunithm-net-eng.com/mobile/ranking/totalHighScore/${difficulty}`);
                                const html = await response.text();
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(html, "text/html");                        
                                const totalHighScoreDiv = doc.querySelector(".mb_5.text_b");
                                return totalHighScoreDiv ? totalHighScoreDiv.innerText.replace(/,/g, "").trim() : "Error";
                            }         
                            // Calculate total score end         
                        case "playHistory":
                            s = async function() {
                                const e = await i("/mobile/record/playlog");
                                return Array.from(e.querySelectorAll(".mt_10 .frame02.w400")).map((e => {
                                    const t = e.querySelector(".play_musicdata_score_text")?.innerHTML
                                        , r = e.querySelector(".play_track_result img").src
                                        , a = /musiclevel_.*(?=\.png)/.exec(r)[0].slice(11)
                                        , c = Array.from(e.querySelectorAll(".play_musicdata_icon"));
                                    return {
                                        title: e.querySelector(".play_musicdata_title").innerHTML,
                                        score: n(t),
                                        difficulty: "ultimate" == a ? "ULT" : "worldsend" == a ? "WE" : o[a],
                                        clear: c.some((e => e.querySelector('img[src*="alljustice"]'))) ? "AJ" : c.some((e => e.querySelector('img[src*="fullcombo"]'))) ? "FC" : "",
                                        clear2: c.some((e => e.querySelector('img[src*="clear"]'))) ? "CLR" : c.some((e => e.querySelector('img[src*="hard"]'))) ? "HRD" : c.some((e => e.querySelector('img[src*="absolutep"]'))) ? "ABS" : c.some((e => e.querySelector('img[src*="absolute"]'))) ? "BRV" : c.some((e => e.querySelector('img[src*="catastrophy"]'))) ? "CTS" : "",
                                        timestamp: Date.parse(e.querySelector(".play_datalist_date").innerHTML)
                                    }
                                }
                                ))
                            }();
                            break;
                        case "playerStats":
                            function Tz(date) {
                                const utcDate = new Date(date.getTime() + 8 * 60 * 60 * 1000);
                                const year = utcDate.getUTCFullYear();
                                const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
                                const day = String(utcDate.getUTCDate()).padStart(2, '0');
                                const hours = String(utcDate.getUTCHours()).padStart(2, '0');
                                const minutes = String(utcDate.getUTCMinutes()).padStart(2, '0');
                                const seconds = String(utcDate.getUTCSeconds()).padStart(2, '0');
                                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                            }
                            s = async function() {
                                const e = await i("/mobile/home/playerData");
                                const t = e.querySelector(".player_honor_short");
                                const r = /honor_bg_.*(?=\.png)/.exec(t.style.backgroundImage);
                                let honorTextElement = e.querySelector(".player_honor_text_view span");
                                let honorText = honorTextElement ? honorTextElement.innerHTML : null;
                                let honorColor = r ? r[0].slice(9) : "normal";
                                if (!honorText && t) {
                                    const backgroundImage = t.style.backgroundImage;
                                    const imageUrlMatch = backgroundImage ? backgroundImage.match(/url\(["']?(.*?)["']?\)/) : null;
                                    const imageUrl = imageUrlMatch ? imageUrlMatch[1] : null;
                                    if (imageUrl) {
                                        try {
                                            const response = await fetch(`https://chuni.tsaibee.org/data/title.json?t=${Date.now()}`);
                                            const titleData = await response.json();
                                            const matchedTitle = titleData.find(item => item.image === imageUrl);
                                            if (matchedTitle) {
                                                honorText = matchedTitle.title;
                                                honorColor = matchedTitle.genre;
                                            }
                                        } catch (error) {
                                            console.error("Error fetching title.json:", error);
                                        }
                                    }
                                }
                                
                                const a = Array.from(e.querySelectorAll(".player_rating_num_block img"))
                                    .map((e => /rating_.*_comma.png/.test(e.src) ? "." : /rating_.*_[0-9]*(?=\.png)/.exec(e.src)[0].slice(-1)))
                                    .join("");
                                const profileDiv = e.querySelector(".box_playerprofile.clearfix, .box_playerprofile");
                                let background = "normal";
                                if (profileDiv) {
                                    const styleAttr = profileDiv.getAttribute("style");
                                    const match = styleAttr.match(/profile_(\w+)\.png/);
                                    if (match && match[1]) {
                                        background = match[1];
                                    }
                                }
                                const playerData = {
                                    name: e.querySelector(".player_name_in").innerHTML,
                                    honor: {
                                        text: honorText || "Unknown",
                                        color: honorColor
                                    },
                                    rating: a,
                                    overPower: e.querySelector(".player_overpower_text").innerHTML.match(/\(([^)]+)\)/)[1],
                                    playCount: e.querySelector(".user_data_play_count .user_data_text").innerHTML,
                                    lastPlayed: Date.parse(e.querySelector(".player_lastplaydate_text").innerHTML),
                                    ratingPn: background,
                                    code: e.querySelector('.user_data_friend_code .user_data_text span[style="display:none;"]')?.innerText || "N/A",
                                    updatedAt: Tz(new Date())
                                };
                                return playerData;
                            }();
                            break;
                        case "songPlayCount":
                            console.log("%c    Target song id: %c" + t.data.idx, "color: gray", "color: white"),
                            console.log("%c    Target difficulty: %c" + t.data.difficulty, "color: gray", "color: white"),
                            s = async function(e, t) {
                                const a = new FormData;
                                a.append("idx", e),
                                a.append("genre", "99"),
                                a.append("diff", c.indexOf(t).toString()),
                                a.append("token", r("_t"));
                                const n = await i("/mobile/record/musicGenre/sendMusicDetail/", a)
                                  , l = n.querySelectorAll(`.music_box.bg_${Object.entries(o).find((e => e[1] === t))[0]} .box14 > div`)[1].querySelector(".text_b")?.innerHTML.replace("times", "");
                                return parseInt(l)
                            }(t.data.idx, t.data.difficulty)
                        }
                        l("ping", {
                            target: t.target
                        }, a),
                        s?.then((e => {
                            l("respond", {
                                target: t.target,
                                data: e
                            }, a)
                        }
                        )).catch((e => {
                            console.error(e),
                            l("respond", {
                                target: t.target,
                                error: e
                            }, a)
                        }
                        ))
                    }(e);
                    break;
                case "saveConfig":
                    const t = e.data.payload.data?.lang;
                    t && (function(e) {
                        localStorage.setItem("language", e)
                    }(t),
                    console.log("%cChange language preferences to: %c" + t, "color: gray", "color: white"))
                }
            }
            ), !1)
        } catch (e) {
            alert(s.needReload),
            console.log(e)
        }
    }(document)
}
)();