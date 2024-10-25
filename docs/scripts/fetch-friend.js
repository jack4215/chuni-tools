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
        return "https://jack4215.github.io/chuni-tools"
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
                analyzeRating: "Analyze Friend's Rating"
            },
            [e.zh_TW]: {
                pleaseLogin: "請先登入 CHUNITHM-NET 再執行本程式。",
                needReload: "請重新整理 CHUNITHM-NET 再執行本程式。",
                analyzeRating: "分析好友遊戲成績"
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
                r.href = t("fetch-friend") + "/common/styles/inject.css",
                e.innerText = s.analyzeRating,
                e.href = t("fetch-friend") + "/friendrecord-viewer/#best",
                e.target = "friendrecordViewer",
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
                     //   let bestRecordName = "";
                        switch (t.target) {
                        case "bestRecord":
                            console.log("%c    Target difficulty: %c" + t.data.difficulty, "color: gray", "color: white"),
                            s = async function(e=o.master) {
                                const t = new FormData;
                                t.append("genre", "99"),
                                t.append("friend", document.querySelector('select[name="friend"]').value),
                                t.append("token", r("_t"));
                                const a = {
                                    [o.ultima]: "4",
                                    [o.master]: "3",
                                    [o.expert]: "2",
                                    [o.advanced]: "1",
                                    [o.basic]: "0"
                                }[e]
                                t.append("radio_diff", a);
                                const c = await i("/mobile/friend/genreVs/sendBattleStart/", t);
                                const records = Array.from(c.querySelectorAll(".w388.music_box")).map((t => {
                                    const r = t.querySelector(".vs_list_friendbatch")
                                      , a = t.querySelectorAll(".play_musicdata_highscore")[1]?.innerHTML;
                                      let scoreValue = a ? n(a) : -1;
                                      scoreValue = (scoreValue === 0) ? "-" : scoreValue;
                                    return {
                                        title: t.querySelector(".block_underline")?.textContent.trim(),
                                        score: scoreValue,
                                        difficulty: e,
                                        clear: r?.querySelector('img[src*="alljustice"]') ? "AJ" : r?.querySelector('img[src*="fullcombo"]') ? "FC" : "",
                                        idx: "9999"
                                    }
                                }));
                                console.log(records);
                                return records.filter(e => e.title && e.score);
                            }(t.data.difficulty);
                            break;
                        case "playHistory":
                            s = async function() {
                                return Array.from({ length: 50 }).map(() => {
                                    return {
                                        title: "unknown",
                                        score: "0",
                                        difficulty: "--",
                                        clear: ""
                                    };
                                });
                            }();
                            break;
                            case "recentRecord":
                                s = async function() {
                                    return Array.from({ length: 10 }).map(() => {
                                        return {
                                            title: "unknown",
                                            score: "0",
                                            difficulty: "--",
                                            clear: ""
                                        };
                                    });
                                }();
                                break;
                        case "playerStats":
                            s = async function() {
                                const e = await i("/mobile/friend/genreVs/battleStart")
                                  return {
                                    name: e.querySelector('select[name="friend"] option[selected]')?.innerHTML,
                                    honor: {
                                        text: "unknown",
                                        color: "normal"
                                    },
                                    rating: "--",
                                    ratingMax: "--",
                                    playCount: "--",
                                    lastPlayed: "--"
                                }
                            }();
                            break;
                        case "songPlayCount":                  
                            s = async function() {
                                return "-";
                            }(t.data.idx, t.data.difficulty);
                            break;
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
