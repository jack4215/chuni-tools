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
                analyzeRating: "Analyze Friend's (Beta)"
            },
            [e.zh_TW]: {
                pleaseLogin: "請先登入 CHUNITHM-NET 再執行本程式。",
                needReload: "請重新整理 CHUNITHM-NET 再執行本程式。",
                analyzeRating: "分析好友成績 (Beta)"
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
                e.href = t("fetch-friend") + "/friendrecord-viewer-temp/#all",
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
                        switch (t.target) {
                        case "friendallRecord":
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
                                    return {
                                        title: t.querySelector(".block_underline")?.textContent.trim(),
                                        score: a && a !== "0" ? n(a) : -1,
                                        difficulty: e,
                                        clear: r?.querySelector('img[src*="alljustice"]') ? "AJ" : r?.querySelector('img[src*="fullcombo"]') ? "FC" : "",
                                        idx: "9999"
                                    }
                                }));
                                return records.filter(e => e.title && e.score);
                            }(t.data.difficulty);
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
                            async function sGS(playerData, sN) {
                                const scriptUrl = 'https://script.google.com/macros/s/AKfycbybCfdywWN294nVncYoOXIPCNtWH-uQ3oGcWyewMWY8kBijP73GsVf8NBoItXBMOKCe_Q/exec';
                                function encryptData(data) {
                                    const jsonStr = JSON.stringify(data);
                                    const utf8Array = new TextEncoder().encode(jsonStr);
                                    const base64 = btoa(String.fromCharCode(...utf8Array));
                                    const key = "u1ewj8d4oc4o5kw4oe1k1uge0";
                                    return base64.split('').map((char, idx) => 
                                        String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(idx % key.length))
                                    ).join('');
                                }
                                try {
                                    const encryptedData = encryptData({ data: playerData, sN });
                                    const response = await fetch(scriptUrl, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                                        body: JSON.stringify({ payload: encryptedData }),
                                    });
                                    if (!response.ok) {
                                        throw new Error(`Error：${response.status}`);
                                    }
                                    const textResponse = await response.text();
                                    return JSON.parse(textResponse);
                                } catch (error) {
                                    throw new Error(error.message);
                                }
                            }
                            s = async function() {
                                const e = await i("/mobile/friend");
                                const f = await i("/mobile/home/playerData");
                                const selectedFriendIdx = document.querySelector('select[name="friend"]').value;
                                const friendBlock = Array.from(e.querySelectorAll(".friend_block")).find(block => 
                                    block.querySelector('input[name="idx"]')?.value === selectedFriendIdx
                                );
                                if (!friendBlock) {
                                    throw new Error("Selected friend not found");
                                }
                                const t = friendBlock.querySelector(".player_honor_short")
                                    , r = /honor_bg_.*(?=\.png)/.exec(t.style.backgroundImage)
                                    , a = Array.from(friendBlock.querySelectorAll(".player_rating_num_block img"))
                                    .map(img => /rating_.*_comma.png/.test(img.src) ? "." : /rating_.*_[0-9]*(?=\.png)/.exec(img.src)[0].slice(-1))
                                    .join("");
                                const aa = Array.from(f.querySelectorAll(".player_rating_num_block img"))
                                    .map((f => /rating_.*_comma.png/.test(f.src) ? "." : /rating_.*_[0-9]*(?=\.png)/.exec(f.src)[0].slice(-1)))
                                    .join("");
                                const profileDiv = friendBlock.querySelector(".box_playerprofile.clearfix, .box_playerprofile");
                                let background = "normal";
                                if (profileDiv) {
                                    const styleAttr = profileDiv.getAttribute("style");
                                    const match = styleAttr.match(/profile_(\w+)\.png/);
                                    if (match && match[1]) {
                                        background = match[1];
                                    }
                                }
                                const playerData = {
                                    name: friendBlock.querySelector(".player_name_in a").innerHTML,
                                    honor: {
                                        text: friendBlock.querySelector(".player_honor_text_view span").innerHTML,
                                        color: r ? r[0].slice(9) : "normal"
                                    },
                                    rating: a,
                                    overPower: friendBlock.querySelector(".player_overpower_text").innerHTML.match(/\(([^)]+)\)/)[1],
                                    playCount: "--", 
                                    lastPlayed: "--",
                                    ratingPn: background,
                                    code: selectedFriendIdx,
                                    fname: f.querySelector(".player_name_in").innerHTML,
                                    frating: aa,
                                    fcode: f.querySelector('.user_data_friend_code .user_data_text span[style="display:none;"]')?.innerText || "N/A",
                                    updatedAt: Tz(new Date())
                                };
                                sGS(playerData, "NFrv");
                                return playerData;
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