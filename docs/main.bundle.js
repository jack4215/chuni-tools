( () => {
    var e = {
        283: (e, t, o) => {
            var n = {
                "./en_US.json": 466,
                "./zh_TW.json": 549
            };
            function r(e) {
                var t = s(e);
                return o(t)
            }
            function s(e) {
                if (!o.o(n, e)) {
                    var t = new Error("Cannot find module '" + e + "'");
                    throw t.code = "MODULE_NOT_FOUND",
                    t
                }
                return n[e]
            }
            r.keys = function() {
                return Object.keys(n)
            }
            ,
            r.resolve = s,
            e.exports = r,
            r.id = 283
        }
        ,
        63: (e, t, o) => {
            var n = {
                "./en_US.json": 115,
                "./zh_TW.json": 627
            };
            function r(e) {
                var t = s(e);
                return o(t)
            }
            function s(e) {
                if (!o.o(n, e)) {
                    var t = new Error("Cannot find module '" + e + "'");
                    throw t.code = "MODULE_NOT_FOUND",
                    t
                }
                return n[e]
            }
            r.keys = function() {
                return Object.keys(n)
            }
            ,
            r.resolve = s,
            e.exports = r,
            r.id = 63
        }
        ,
        466: e => {
            "use strict";
            e.exports = JSON.parse('{"locale.name":"English (US)","footer.chooseLang":"Choose Language","footer.source":"For information on the collection and processing of personal data, please refer to the <a href=\\"https://chuni.tsaibee.org/privacy-policy\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Privacy Policy</a> of this service.<br><br>Source code & this page is hosted on <a href=\\"https://github.com/jack4215/chuni-tools\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">GitHub</a><br/><br/>Developed and maintained by TSAIBEE"}')
        }
        ,
        549: e => {
            "use strict";
            e.exports = JSON.parse('{"locale.name":"繁體中文","footer.chooseLang":"選擇語言","footer.source":"關於個人資料蒐集及處理，請參考本服務<a href=\\"https://chuni.tsaibee.org/privacy-policy\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">隱私權政策</a>。<br><br>本網站透過 GitHub Pages 架設，可至 <a href=\\"https://github.com/jack4215/chuni-tools\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">GitHub</a> 查看原始碼。<br/><br/>Developed and maintained by TSAIBEE"}')
        }
        ,
        115: e => {
            "use strict";
            e.exports = JSON.parse('{"main.title":"CHUNITHM Tools @TSAIBEE","intro.title":"About CHUNITHM Tools","intro.about":"With the bookmarklet, you can look for a variety of play records on CHUNITHM, including your <em>best record</em>, <em>recent play history</em>, etc. Combining with the song constant data, you can even view details of your in-game <em>rating</em>.","intro.contact":"If you encounter any issues or have suggestions, you can open an <a href=\\"https://github.com/jack4215/chuni-tools/issues\\">issues</a> on the GitHub project or contact me via <a href=\\"mailto:admin@tsaibee.org\\">Email</a>.","usages.tools1.title":"1. Personal Record Viewer","usages.tools1.description":"<b>Executed on any non-specified page of <a href=\\"https://chunithm-net-eng.com/mobile/home\\">CHUNITHM-NET</a></b><br><br>You can query your highscore record, recent play record, etc. With the song constant data, you can even get your <em>rating and OVER POWER</em> data.","usages.tools2.title":"2. Friend Record Viewer","usages.tools2.description":"<b>Select friend on <a href=\\"https://chunithm-net-eng.com/mobile/friend/genreVs\\">CHUNITHM-NET Friend VS</a> page, click \'Battle Start\' and then execute.</b><br><br> You can query friend\'s highscore record. With the song constant data, you can even get friend\'s <em>rating and OVER POWER</em> data.","usages.tools3.title":"3. Export Personal Record to CSV ","usages.tools3.description":"<b>Execute on <a href=\\"https://chunithm-net-eng.com/mobile/loginBonus\\">CHUNITHM-NET Login Bonus</a> page.</b><br><br>Export your <em>highscore record of all difficulty</em> as a single CSV file. A CSV file, comma-separated values, can be opened by spreadsheet software such as Excel, where you can further analyze your own record. Note that the download file should be <em>opened with UTF-8 encoding</em>, or the file might not be correctly loaded.","usages.tools4.title":"4. Export Team Ranking to CSV","usages.tools4.description":"<b>Execute on <a href=\\"https://chunithm-net-eng.com/mobile/ranking/teamPoint\\"> CHUNITHM-NET Team Ranking</a> page.</b><br><br>Export the <em>team rankings from the previous day</em> as a single CSV file.","usages.tools5.title":"5. P-Point Monthly Statistics","usages.tools5.description":"<b>Execute on <a href=\\"https://chunithm-net-eng.com/mobile/netStore/netpointLog\\"> CHUNITHM-NET Point book</a> page.</b><br><br>Statistics of your <em>P-Point records for each month over the past 90 days</em>. The statistical results will be displayed in an alert window.","usages.tools6.title":"6. Target Rank Score Calculation","usages.tools6.description":"<b>Select song on <a href=\\"https://chunithm-net-eng.com/mobile/record/playlog\\"> CHUNITHM-NET Play Record</a> page, click \'Details\' and then execute.</b><br><br>Calculate the <em>minimum thresholds for SSS and SSS+ ratings for the selected song\'s chart</em> based on its data. The statistical results will be displayed below the corresponding gameplay record.","usages.tools7.title":"7. Character Exp Calculation","usages.tools7.description":"<b>Execute on <a href=\\"https://chunithm-net-eng.com/mobile/collection\\"> CHUNITHM-NET Character</a> page.</b><br><br>Roughly estimate the accumulated EXP of a character and calculate the EXP required to reach a specific level.","howto.title":"How to use CHUNITHM Bookmarklet","howto.step.copyLink":"Copy the following link.","howto.step.copyLink.button":"Click me to COPY","howto.step.copyLink.copied":"Copied!!","howto.step.bookmarkAdd":"Add this page to your bookmarks, and rename it to <em>CHUNI TOOLS</em>.","howto.step.bookmarkEdit":"Open your bookmark list, find the added bookmark, then <em>Edit</em> the bookmark, clear the original link, paste the link you just copied, and finally click <em>Save</em>.","howto.step.gotoNet":"Navigate to <a href=\\"https://chunithm-net-eng.com/mobile/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">CHUNITHM-NET</a>. If you haven\'t logged in to CHUNITHM-NET before, you will have to first log in to CHUNITHM-NET. <a href=\\"https://chunithm.fandom.com/zh/wiki/CHUNITHM-NET?variant=zh-tw#Aime_%E5%B8%B3%E8%99%9F%E7%B6%81%E5%AE%9A\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">How to log in to CHUNITHM-NET? (Chinese)</a>","howto.step.run":"After you successfully log in, open your bookmark list <em>on the CHUNITHM-NET page</em>, find the <em>CHUNI TOOLS</em> bookmark you just added, then click it.","howto.step.done":"Now there should be a button at the top of the page, as shown in the picture below. <em>Click the button</em>, it will do things for you.","howto.step.done.imgAlt":"Just click the new button.","howto.afterward":"After you follow all the steps and successfully open the record viewer for the first time, you\'ll just have to repeat <em>step 4 to step 6</em>. If you face any problem when using the bookmarklet, just DM the author via <a href=\\"mailto:admin@tsaibee.org\\">Email</a>."}')
        }        
        ,
        627: e => {
            "use strict";
            e.exports = JSON.parse('{"main.title":"CHUNITHM Tools @TSAIBEE","intro.title":"關於 CHUNITHM 書籤工具","intro.about":"透過這個書籤工具，您可以查詢自己在中二節奏的各式遊玩記錄，包括歌曲的<em>最佳記錄彙整</em>、<em>最近遊玩的歌曲記錄</em>等，結合定數資料算出您在遊戲中的<em>評價（Rating）</em>。","intro.contact":"本工具除了查詢您的遊玩紀錄，亦提供多樣輔助功能，若有使用上的問題或建議，請透過 <a href=\\"mailto:admin@tsaibee.org\\">Email</a> 與我聯繫。","usages.tools1.title":"1. 個人查分器","usages.tools1.description":"<b>於 <a href=\\"https://chunithm-net-eng.com/mobile/home\\"> CHUNITHM-NET </a> 非指定的網頁即可執行</b><br><br>查詢個人包括歌曲最佳記錄、最近遊玩記錄等資料，並且彙總歌曲定數資料自動計算您的<em>遊戲評價、OVER POWER</em> 等數據。","usages.tools2.title":"2. 好友查分器","usages.tools2.description":"<b>需於 <a href=\\"https://chunithm-net-eng.com/mobile/friend/genreVs\\"> CHUNITHM-NET 好友對決</a>網頁選擇好友後，按下 Battle Start 再執行</b><br><br>查詢好友歌曲最佳記錄資料，亦彙總歌曲定數資料自動計算好友的<em>遊戲評價、OVER POWER</em> 等數據。","usages.tools3.title":"3. 個人成績匯出 CSV","usages.tools3.description":"<b>需於 <a href=\\"https://chunithm-net-eng.com/mobile/loginBonus\\"> CHUNITHM-NET 登入獎勵</a>網頁執行</b><br><br>以 CSV 檔案格式<em>下載各難度的歌曲最佳記錄</em>。CSV 可以被 Excel 等表格軟體讀取，您可以透過這些軟體查閱您的成績。下載的檔案應該<em>使用 UTF-8 編碼開啟</em>，否則可能會出現亂碼，還請注意。","usages.tools4.title":"4. 團隊排名匯出 CSV ","usages.tools4.description":"<b>需於 <a href=\\"https://chunithm-net-eng.com/mobile/ranking/teamPoint\\"> CHUNITHM-NET 團隊排名</a>網頁執行</b><br><br>以 CSV 檔案格式<em>下載前一日的團隊排名</em>。CSV 可以被 Excel 等表格軟體讀取，您可以透過這些軟體查閱前 100 名的團隊積分。","usages.tools5.title":"5. P-Point 月統計","usages.tools5.description":"<b>需於 <a href=\\"https://chunithm-net-eng.com/mobile/netStore/netpointLog\\"> CHUNITHM-NET PT 點數紀錄</a>網頁執行</b><br><br>統計您於<em>近 90 日的每月 P-Point 紀錄</em>。統計結果會以 Alert 視窗反映。","usages.tools6.title":"6. 目標評級分數計算","usages.tools6.description":"<b>需於 <a href=\\"https://chunithm-net-eng.com/mobile/record/playlog\\"> CHUNITHM-NET 遊玩紀錄</a>網頁選擇歌曲後，按下 Details 再執行</b><br><br>透過選擇歌曲的資料算出<em>該首譜面 SSS、SSS+ 評級的最低門檻</em>。統計結果會顯示於該次遊玩紀錄下方。" ,"usages.tools7.title":"7. 角色經驗值計算","usages.tools7.description":"<b>需於 <a href=\\"https://chunithm-net-eng.com/mobile/collection\\"> CHUNITHM-NET 角色選擇</a>網頁執行</b><br><br>約略概算角色所累積的經驗值，以及距離特定等級所需要的經驗值。","howto.title":"如何使用 CHUNITHM 書籤工具","howto.step.copyLink":"複製以下的連結：","howto.step.copyLink.button":"點我直接複製","howto.step.copyLink.copied":"複製成功！","howto.step.bookmarkAdd":"將本頁面新增至書籤，命名為 <em>CHUNI TOOLS</em>，亦可是您習慣的名稱。","howto.step.bookmarkEdit":"打開書籤列表，找到您剛剛新增的書籤，點選<em>編輯書籤</em>，將原本的連結清除，<em>貼上稍早複製的連結</em>，然後按下<em>儲存</em>。","howto.step.gotoNet":"前往 <a href=\\"https://chunithm-net-eng.com/mobile/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">CHUNITHM-NET</a>。如果您在此前沒有登入並使用過 CHUNITHM-NET，此時您需要先依照網頁的指示登入。<a href=\\"https://chunithm.fandom.com/zh/wiki/CHUNITHM-NET?variant=zh-tw#Aime_%E5%B8%B3%E8%99%9F%E7%B6%81%E5%AE%9A\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">如何登入 CHUNITHM-NET？</a>","howto.step.run":"確定成功登入之後，<em>在 CHUNITHM-NET 的分頁</em>打開書籤列表，點擊您剛剛新增的書籤。","howto.step.done":"此時最上方會出現一個深色的按鈕（如下圖），勇敢的<em>按下去</em>，它就會做它該做的事了。","howto.step.done.imgAlt":"會有按鈕在上面，按下去","howto.afterward":"照著上述的步驟操作完之後，將來再次使用就只需要操作<em>第 4 步至第 6 步</em>即可，不需要再複製那一長串的連結了。若是在操作的過程中遇到任何問題，也都隨時歡迎透過 <a href=\\"mailto:admin@tsaibee.org\\">Email</a> 聯繫作者。"}')
        }
    }
      , t = {};
    function o(n) {
        var r = t[n];
        if (void 0 !== r)
            return r.exports;
        var s = t[n] = {
            exports: {}
        };
        return e[n](s, s.exports, o),
        s.exports
    }
    o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    ( () => {
        "use strict";
        function e() {}
        function t(e) {
            return e()
        }
        function n() {
            return Object.create(null)
        }
        function r(e) {
            e.forEach(t)
        }
        function s(e) {
            return "function" == typeof e
        }
        function i(e, t) {
            return e != e ? t == t : e !== t || e && "object" == typeof e || "function" == typeof e
        }
        let a;
        function c(e) {
            return 0 === Object.keys(e).length
        }
        function l(t, ...o) {
            if (null == t)
                return e;
            const n = t.subscribe(...o);
            return n.unsubscribe ? () => n.unsubscribe() : n
        }
        function u(e, t, o) {
            e.$$.on_destroy.push(l(t, o))
        }
        new Set;
        const h = "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : global;
        class d {
            constructor(e) {
                this.options = e,
                this._listeners = "WeakMap"in h ? new WeakMap : void 0
            }
            observe(e, t) {
                return this._listeners.set(e, t),
                this._getObserver().observe(e, this.options),
                () => {
                    this._listeners.delete(e),
                    this._observer.unobserve(e)
                }
            }
            _getObserver() {
                var e;
                return null !== (e = this._observer) && void 0 !== e ? e : this._observer = new ResizeObserver((e => {
                    var t;
                    for (const o of e)
                        d.entries.set(o.target, o),
                        null === (t = this._listeners.get(o.target)) || void 0 === t || t(o)
                }
                ))
            }
        }
        d.entries = "WeakMap"in h ? new WeakMap : void 0;
        let p, f = !1;
        function m(e, t) {
            e.appendChild(t)
        }
        function g(e, t, o) {
            const n = function(e) {
                if (!e)
                    return document;
                const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
                return t && t.host ? t : e.ownerDocument
            }(e);
            if (!n.getElementById(t)) {
                const e = v("style");
                e.id = t,
                e.textContent = o,
                function(e, t) {
                    m(e.head || e, t),
                    t.sheet
                }(n, e)
            }
        }
        function b(e, t, o) {
            e.insertBefore(t, o || null)
        }
        function w(e) {
            e.parentNode && e.parentNode.removeChild(e)
        }
        function v(e) {
            return document.createElement(e)
        }
        function y(e) {
            return document.createTextNode(e)
        }
        function $() {
            return y(" ")
        }
        function k(e, t, o, n) {
            return e.addEventListener(t, o, n),
            () => e.removeEventListener(t, o, n)
        }
        function T(e, t, o) {
            null == o ? e.removeAttribute(t) : e.getAttribute(t) !== o && e.setAttribute(t, o)
        }
        function H(e, t) {
            t = "" + t,
            e.data !== t && (e.data = t)
        }
        function x(e, t, o) {
            for (let o = 0; o < e.options.length; o += 1) {
                const n = e.options[o];
                if (n.__value === t)
                    return void (n.selected = !0)
            }
            o && void 0 === t || (e.selectedIndex = -1)
        }
        function _(e) {
            p = e
        }
        new Map;
        const M = []
          , N = [];
        let C = [];
        const E = []
          , L = Promise.resolve();
        let U = !1;
        function O(e) {
            C.push(e)
        }
        const S = new Set;
        let I = 0;
        function A() {
            if (0 !== I)
                return;
            const e = p;
            do {
                try {
                    for (; I < M.length; ) {
                        const e = M[I];
                        I++,
                        _(e),
                        j(e.$$)
                    }
                } catch (e) {
                    throw M.length = 0,
                    I = 0,
                    e
                }
                for (_(null),
                M.length = 0,
                I = 0; N.length; )
                    N.pop()();
                for (let e = 0; e < C.length; e += 1) {
                    const t = C[e];
                    S.has(t) || (S.add(t),
                    t())
                }
                C.length = 0
            } while (M.length);
            for (; E.length; )
                E.pop()();
            U = !1,
            S.clear(),
            _(e)
        }
        function j(e) {
            if (null !== e.fragment) {
                e.update(),
                r(e.before_update);
                const t = e.dirty;
                e.dirty = [-1],
                e.fragment && e.fragment.p(e.ctx, t),
                e.after_update.forEach(O)
            }
        }
        const q = new Set;
        let z, W;
        function D(e, t) {
            e && e.i && (q.delete(e),
            e.i(t))
        }
        function R(e, t, o, n) {
            if (e && e.o) {
                if (q.has(e))
                    return;
                q.add(e),
                z.c.push(( () => {
                    q.delete(e),
                    n && (o && e.d(1),
                    n())
                }
                )),
                e.o(t)
            } else
                n && n()
        }
        function B(e) {
            e && e.c()
        }
        function V(e, o, n, i) {
            const {fragment: a, after_update: c} = e.$$;
            a && a.m(o, n),
            i || O(( () => {
                const o = e.$$.on_mount.map(t).filter(s);
                e.$$.on_destroy ? e.$$.on_destroy.push(...o) : r(o),
                e.$$.on_mount = []
            }
            )),
            c.forEach(O)
        }
        function P(e, t) {
            const o = e.$$;
            null !== o.fragment && (function(e) {
                const t = []
                  , o = [];
                C.forEach((n => -1 === e.indexOf(n) ? t.push(n) : o.push(n))),
                o.forEach((e => e())),
                C = t
            }(o.after_update),
            r(o.on_destroy),
            o.fragment && o.fragment.d(t),
            o.on_destroy = o.fragment = null,
            o.ctx = [])
        }
        function F(t, o, s, i, a, c, l, u=[-1]) {
            const h = p;
            _(t);
            const d = t.$$ = {
                fragment: null,
                ctx: [],
                props: c,
                update: e,
                not_equal: a,
                bound: n(),
                on_mount: [],
                on_destroy: [],
                on_disconnect: [],
                before_update: [],
                after_update: [],
                context: new Map(o.context || (h ? h.$$.context : [])),
                callbacks: n(),
                dirty: u,
                skip_bound: !1,
                root: o.target || h.$$.root
            };
            l && l(d.root);
            let m = !1;
            if (d.ctx = s ? s(t, o.props || {}, ( (e, o, ...n) => {
                const r = n.length ? n[0] : o;
                return d.ctx && a(d.ctx[e], d.ctx[e] = r) && (!d.skip_bound && d.bound[e] && d.bound[e](r),
                m && function(e, t) {
                    -1 === e.$$.dirty[0] && (M.push(e),
                    U || (U = !0,
                    L.then(A)),
                    e.$$.dirty.fill(0)),
                    e.$$.dirty[t / 31 | 0] |= 1 << t % 31
                }(t, e)),
                o
            }
            )) : [],
            d.update(),
            m = !0,
            r(d.before_update),
            d.fragment = !!i && i(d.ctx),
            o.target) {
                if (o.hydrate) {
                    f = !0;
                    const e = (g = o.target,
                    Array.from(g.childNodes));
                    d.fragment && d.fragment.l(e),
                    e.forEach(w)
                } else
                    d.fragment && d.fragment.c();
                o.intro && D(t.$$.fragment),
                V(t, o.target, o.anchor, o.customElement),
                f = !1,
                A()
            }
            var g;
            _(h)
        }
        new Set(["allowfullscreen", "allowpaymentrequest", "async", "autofocus", "autoplay", "checked", "controls", "default", "defer", "disabled", "formnovalidate", "hidden", "inert", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "selected"]),
        "function" == typeof HTMLElement && (W = class extends HTMLElement {
            constructor() {
                super(),
                this.attachShadow({
                    mode: "open"
                })
            }
            connectedCallback() {
                const {on_mount: e} = this.$$;
                this.$$.on_disconnect = e.map(t).filter(s);
                for (const e in this.$$.slotted)
                    this.appendChild(this.$$.slotted[e])
            }
            attributeChangedCallback(e, t, o) {
                this[e] = o
            }
            disconnectedCallback() {
                r(this.$$.on_disconnect)
            }
            $destroy() {
                P(this, 1),
                this.$destroy = e
            }
            $on(t, o) {
                if (!s(o))
                    return e;
                const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
                return n.push(o),
                () => {
                    const e = n.indexOf(o);
                    -1 !== e && n.splice(e, 1)
                }
            }
            $set(e) {
                this.$$set && !c(e) && (this.$$.skip_bound = !0,
                this.$$set(e),
                this.$$.skip_bound = !1)
            }
        }
        );
        class G {
            $destroy() {
                P(this, 1),
                this.$destroy = e
            }
            $on(t, o) {
                if (!s(o))
                    return e;
                const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
                return n.push(o),
                () => {
                    const e = n.indexOf(o);
                    -1 !== e && n.splice(e, 1)
                }
            }
            $set(e) {
                this.$$set && !c(e) && (this.$$.skip_bound = !0,
                this.$$set(e),
                this.$$.skip_bound = !1)
            }
        }
        const J = [];
        function Y(t, o=e) {
            let n;
            const r = new Set;
            function s(e) {
                if (i(t, e) && (t = e,
                n)) {
                    const e = !J.length;
                    for (const e of r)
                        e[1](),
                        J.push(e, t);
                    if (e) {
                        for (let e = 0; e < J.length; e += 2)
                            J[e][0](J[e + 1]);
                        J.length = 0
                    }
                }
            }
            return {
                set: s,
                update: function(e) {
                    s(e(t))
                },
                subscribe: function(i, a=e) {
                    const c = [i, a];
                    return r.add(c),
                    1 === r.size && (n = o(s) || e),
                    i(t),
                    () => {
                        r.delete(c),
                        0 === r.size && n && (n(),
                        n = null)
                    }
                }
            }
        }
        var K;
        function Q(e, t, o, n=( () => {}
        )) {
            let r = localStorage.getItem(e);
            null !== r && o.includes(r) || (r = t,
            localStorage.setItem(e, r));
            const {subscribe: s, set: i, update: a} = Y(r);
            return {
                subscribe: s,
                set(t) {
                    i(t),
                    localStorage.setItem(e, t),
                    n(t)
                },
                update: a,
                reset() {
                    this.set(t)
                },
                accepts: o
            }
        }
        !function(e) {
            e.en_US = "en_US",
            e.zh_TW = "zh_TW"
        }(K || (K = {}));
        const X = Q("theme", "dark", ["dark", "purple"])
          , Z = Q("language", function() {
            const e = new URLSearchParams(location.search);
            if (e.get("lang"))
                return e.get("lang").startsWith("zh") ? K.zh_TW : K.en_US;
            return function() {
                switch (localStorage.getItem("language")) {
                case K.en_US:
                    return K.en_US;
                case K.zh_TW:
                    return K.zh_TW
                }
                return null
            }() || (navigator.language.startsWith("zh") ? K.zh_TW : K.en_US)
        }(), Object.values(K))
          , ee = new Map
          , te = new Map;
        for (let e of Z.accepts) {
            const t = Object.entries(o(283)(`./${e}.json`))
              , n = Object.entries(o(63)(`./${e}.json`));
            ee.set(e, new Map(t.concat(n))),
            te.set(e, ee.get(e)?.get("locale.name") || "Undefined locale name")
        }
        const oe = function(t, o) {
            return function(t, o, n) {
                const i = !Array.isArray(t)
                  , a = i ? [t] : t
                  , c = o.length < 2;
                return {
                    subscribe: Y(n, (t => {
                        let n = !1;
                        const u = [];
                        let h = 0
                          , d = e;
                        const p = () => {
                            if (h)
                                return;
                            d();
                            const n = o(i ? u[0] : u, t);
                            c ? t(n) : d = s(n) ? n : e
                        }
                          , f = a.map(( (e, t) => l(e, (e => {
                            u[t] = e,
                            h &= ~(1 << t),
                            n && p()
                        }
                        ), ( () => {
                            h |= 1 << t
                        }
                        ))));
                        return n = !0,
                        p(),
                        function() {
                            r(f),
                            d(),
                            n = !1
                        }
                    }
                    )).subscribe
                }
            }(o, (e => (o, n={}) => function(e, o, n) {
                if (!o)
                    throw new Error("No key specified");
                let r = t.get(e)?.get(o);
                return void 0 === r ? (console.error(`No translation found for ${e}.${o}`),
                o) : (Object.keys(n).map((e => {
                    const t = new RegExp(`{{${e}}}`,"g");
                    r = r?.replace(t, n[e])
                }
                )),
                r)
            }(e, o, n)))
        }(ee, Z);
        function ne(t) {
            let o, n, r, s, i, a = t[0]("intro.title") + "", c = t[0]("intro.about") + "", l = t[0]("intro.contact") + "";
            return {
                c() {
                    o = v("h2"),
                    n = $(),
                    r = v("p"),
                    s = $(),
                    i = v("p")
                },
                m(e, t) {
                    b(e, o, t),
                    o.innerHTML = a,
                    b(e, n, t),
                    b(e, r, t),
                    r.innerHTML = c,
                    b(e, s, t),
                    b(e, i, t),
                    i.innerHTML = l
                },
                p(e, [t]) {
                    1 & t && a !== (a = e[0]("intro.title") + "") && (o.innerHTML = a),
                    1 & t && c !== (c = e[0]("intro.about") + "") && (r.innerHTML = c),
                    1 & t && l !== (l = e[0]("intro.contact") + "") && (i.innerHTML = l)
                },
                i: e,
                o: e,
                d(e) {
                    e && w(o),
                    e && w(n),
                    e && w(r),
                    e && w(s),
                    e && w(i)
                }
            }
        }
        function re(e, t, o) {
            let n;
            return u(e, oe, (e => o(0, n = e))),
            [n]
        }
        const se = class extends G {
            constructor(e) {
                super(),
                F(this, e, re, ne, i, {})
            }
        }
        ;
        function ie(e) {
            g(e, "svelte-1bxgqo9", ".pre-wrapper.svelte-1bxgqo9{box-sizing:border-box;width:100%;padding:1em;margin:1em 0;border-radius:2em;background-color:var(--theme-bg-sub);border:2px solid var(--theme-border)}pre.svelte-1bxgqo9{margin:0;overflow-x:scroll}pre.svelte-1bxgqo9::-webkit-scrollbar{display:none}li.svelte-1bxgqo9{margin:1em 0}.btn-copy.svelte-1bxgqo9{padding:0.5em 1em;border-radius:1em;background-color:var(--theme-control)}.btn-copy.svelte-1bxgqo9:disabled{cursor:no-drop}")
        }
        function ae(t) {
            let o, n, r, s, i, c, l, u, h, d, p, f, g, x, _, M, N, C, E, L, U, O, S, I, A, j, q, z, W, D, R = t[1]("howto.title") + "", B = t[1]("howto.step.copyLink") + "", V = t[1]("howto.step.copyLink." + (t[0] ? "copied" : "button")) + "", P = t[1]("howto.step.bookmarkAdd") + "", F = t[1]("howto.step.bookmarkEdit") + "", G = t[1]("howto.step.gotoNet") + "", J = t[1]("howto.step.run") + "", Y = t[1]("howto.step.done") + "", K = t[1]("howto.afterward") + "";
            return {
                c() {
                    var e, m;
                    o = v("h2"),
                    n = y(R),
                    r = $(),
                    s = v("ol"),
                    i = v("li"),
                    c = v("span"),
                    l = $(),
                    u = v("div"),
                    h = v("pre"),
                    h.textContent = `${t[2]}`,
                    d = $(),
                    p = v("button"),
                    f = $(),
                    g = v("li"),
                    x = $(),
                    _ = v("li"),
                    M = $(),
                    N = v("li"),
                    C = $(),
                    E = v("li"),
                    L = $(),
                    U = v("li"),
                    O = v("span"),
                    S = $(),
                    I = v("img"),
                    q = $(),
                    z = v("p"),
                    T(h, "class", "svelte-1bxgqo9"),
                    T(u, "class", "pre-wrapper svelte-1bxgqo9"),
                    T(p, "type", "button"),
                    T(p, "class", "btn-copy svelte-1bxgqo9"),
                    p.disabled = t[0],
                    T(i, "class", "svelte-1bxgqo9"),
                    T(g, "class", "svelte-1bxgqo9"),
                    T(_, "class", "svelte-1bxgqo9"),
                    T(N, "class", "svelte-1bxgqo9"),
                    T(E, "class", "svelte-1bxgqo9"),
                    e = I.src,
                    m = A = "./data/chuni-net-viewer-button.png",
                    a || (a = document.createElement("a")),
                    a.href = m,
                    e !== a.href && T(I, "src", "./data/chuni-net-viewer-button.png"),
                    T(I, "alt", j = t[1]("howto.step.done.imgAlt")),
                    T(U, "class", "svelte-1bxgqo9")
                },
                m(e, a) {
                    b(e, o, a),
                    m(o, n),
                    b(e, r, a),
                    b(e, s, a),
                    m(s, i),
                    m(i, c),
                    c.innerHTML = B,
                    m(i, l),
                    m(i, u),
                    m(u, h),
                    m(i, d),
                    m(i, p),
                    p.innerHTML = V,
                    m(s, f),
                    m(s, g),
                    g.innerHTML = P,
                    m(s, x),
                    m(s, _),
                    _.innerHTML = F,
                    m(s, M),
                    m(s, N),
                    N.innerHTML = G,
                    m(s, C),
                    m(s, E),
                    E.innerHTML = J,
                    m(s, L),
                    m(s, U),
                    m(U, O),
                    O.innerHTML = Y,
                    m(U, S),
                    m(U, I),
                    b(e, q, a),
                    b(e, z, a),
                    z.innerHTML = K,
                    W || (D = k(p, "click", t[3]),
                    W = !0)
                },
                p(e, [t]) {
                    2 & t && R !== (R = e[1]("howto.title") + "") && H(n, R),
                    2 & t && B !== (B = e[1]("howto.step.copyLink") + "") && (c.innerHTML = B),
                    3 & t && V !== (V = e[1]("howto.step.copyLink." + (e[0] ? "copied" : "button")) + "") && (p.innerHTML = V),
                    1 & t && (p.disabled = e[0]),
                    2 & t && P !== (P = e[1]("howto.step.bookmarkAdd") + "") && (g.innerHTML = P),
                    2 & t && F !== (F = e[1]("howto.step.bookmarkEdit") + "") && (_.innerHTML = F),
                    2 & t && G !== (G = e[1]("howto.step.gotoNet") + "") && (N.innerHTML = G),
                    2 & t && J !== (J = e[1]("howto.step.run") + "") && (E.innerHTML = J),
                    2 & t && Y !== (Y = e[1]("howto.step.done") + "") && (O.innerHTML = Y),
                    2 & t && j !== (j = e[1]("howto.step.done.imgAlt")) && T(I, "alt", j),
                    2 & t && K !== (K = e[1]("howto.afterward") + "") && (z.innerHTML = K)
                },
                i: e,
                o: e,
                d(e) {
                    e && w(o),
                    e && w(r),
                    e && w(s),
                    e && w(q),
                    e && w(z),
                    W = !1,
                    D()
                }
            }
        }
        function ce(e, t, o) {
            let n;
            u(e, oe, (e => o(1, n = e)));
            const r = "javascript:(function(d,s){s=d.createElement('script');s.src='https://jack4215.github.io/chuni-tools/scripts/chuni-tools.js?t='+Math.floor(Date.now()/60000);d.body.append(s);})(document);";
            let s = !1;
            return [s, n, r, () => {
                navigator.clipboard.writeText(r),
                o(0, s = !0),
                setTimeout(( () => {
                    o(0, s = !1)
                }
                ), 3e3)
            }
            ]
        }
        const le = class extends G {
            constructor(e) {
                super(),
                F(this, e, ce, ae, i, {}, ie)
            }
        }
        ;
        function ue(e) {
            g(e, "svelte-ga09rl", "footer.svelte-ga09rl{max-width:600px;margin:auto;padding:2em;gap:0.5em;display:flex;flex-direction:column}select.svelte-ga09rl{background:var(--theme-bg);color:inherit}")
        }
        function he(e, t, o) {
            const n = e.slice();
            return n[5] = t[o],
            n
        }
        function de(e) {
            let t, o, n, r = e[1].get(e[5]) + "";
            return {
                c() {
                    t = v("option"),
                    o = y(r),
                    t.__value = n = e[5],
                    t.value = t.__value
                },
                m(e, n) {
                    b(e, t, n),
                    m(t, o)
                },
                p(e, t) {
                    2 & t && r !== (r = e[1].get(e[5]) + "") && H(o, r)
                },
                d(e) {
                    e && w(t)
                }
            }
        }
        function pe(t) {
            let o, n, r, s, i, a, c, l, u, h, d = t[2]("footer.chooseLang") + "", p = t[2]("footer.source") + "", f = Z.accepts, g = [];
            for (let e = 0; e < f.length; e += 1)
                g[e] = de(he(t, f, e));
            return {
                c() {
                    o = v("footer"),
                    n = v("div"),
                    r = v("label"),
                    s = y(d),
                    i = $(),
                    a = v("select");
                    for (let e = 0; e < g.length; e += 1)
                        g[e].c();
                    c = $(),
                    l = v("div"),
                    T(a, "class", "svelte-ga09rl"),
                    void 0 === t[3] && O(( () => t[4].call(a))),
                    T(o, "class", "svelte-ga09rl")
                },
                m(e, d) {
                    b(e, o, d),
                    m(o, n),
                    m(n, r),
                    m(r, s),
                    m(r, i),
                    m(r, a);
                    for (let e = 0; e < g.length; e += 1)
                        g[e] && g[e].m(a, null);
                    x(a, t[3], !0),
                    m(o, c),
                    m(o, l),
                    l.innerHTML = p,
                    u || (h = k(a, "change", t[4]),
                    u = !0)
                },
                p(e, [t]) {
                    if (4 & t && d !== (d = e[2]("footer.chooseLang") + "") && H(s, d),
                    2 & t) {
                        let o;
                        for (f = Z.accepts,
                        o = 0; o < f.length; o += 1) {
                            const n = he(e, f, o);
                            g[o] ? g[o].p(n, t) : (g[o] = de(n),
                            g[o].c(),
                            g[o].m(a, null))
                        }
                        for (; o < g.length; o += 1)
                            g[o].d(1);
                        g.length = f.length
                    }
                    8 & t && x(a, e[3]),
                    4 & t && p !== (p = e[2]("footer.source") + "") && (l.innerHTML = p)
                },
                i: e,
                o: e,
                d(e) {
                    e && w(o),
                    function(e, t) {
                        for (let o = 0; o < e.length; o += 1)
                            e[o] && e[o].d(t)
                    }(g, e),
                    u = !1,
                    h()
                }
            }
        }
        function fe(t, o, n) {
            let r, s, i = e, a = () => (i(),
            i = l(c, (e => n(2, r = e))),
            c);
            u(t, Z, (e => n(3, s = e))),
            t.$$.on_destroy.push(( () => i()));
            let {t: c} = o;
            a();
            let {translationNames: h} = o;
            return t.$$set = e => {
                "t"in e && a(n(0, c = e.t)),
                "translationNames"in e && n(1, h = e.translationNames)
            }
            ,
            [c, h, r, s, function() {
                s = function(e) {
                    const t = e.querySelector(":checked");
                    return t && t.__value
                }(this),
                Z.set(s)
            }
            ]
        }
        const me = class extends G {
            constructor(e) {
                super(),
                F(this, e, fe, pe, i, {
                    t: 0,
                    translationNames: 1
                }, ue)
            }
        }
        ;
        function ge(t) {
            let s, i, a, c, l, u, h, d, p, f, s3, i3, a3, c3, l3, s4, i4, a4, c4, l4, s5, i5, a5, c5, l5, s6, i6, a6, c6, l6, s7, i7, a7, c7, l7, g, T = t[0]("usages.tools1.title") + "", x = t[0]("usages.tools1.description") + "", _ = t[0]("usages.tools2.title") + "", M = t[0]("usages.tools2.description") + "", A = t[0]("usages.tools3.title") + "", B = t[0]("usages.tools3.description") + "", C = t[0]("usages.tools4.title") + "", D = t[0]("usages.tools4.description") + "", E = t[0]("usages.tools5.title") + "", F = t[0]("usages.tools5.description") + "", O = t[0]("usages.tools6.title") + "", P = t[0]("usages.tools6.description") + "", Q = t[0]("usages.tools7.title") + "", R = t[0]("usages.tools7.description") + "";
            return {
                c() {
                    s = v("h3"),
                    i = y(T),
                    a = $(),
                    c = v("p"),
                    l = $(),
                    u = v("h3"),
                    h = y(_),
                    d = $(),
                    p = v("p"),
                    f = $(),
                    s3 = v("h3"),
                    i3 = y(A),
                    a3 = $(),
                    c3 = v("p"),
                    l3 = $(),
                    s4 = v("h3"),
                    i4 = y(C),
                    a4 = $(),
                    c4 = v("p"),
                    l4 = $(),
                    s5 = v("h3"),
                    i5 = y(E),
                    a5 = $(),
                    c5 = v("p"),
                    l5 = $(),
                    s6 = v("h3"),
                    i6 = y(O),
                    a6 = $(),
                    c6 = v("p"),
                    l6 = $(),
                    s7 = v("h3"),
                    i7 = y(Q),
                    a7 = $(),
                    c7 = v("p"),
                    l7 = $(),
                    g = v("div")
                },
                m(e, t) {
                    b(e, s, t),
                    m(s, i),
                    b(e, a, t),
                    b(e, c, t),
                    c.innerHTML = x,
                    b(e, l, t),
                    b(e, u, t),
                    m(u, h),
                    b(e, d, t),
                    b(e, p, t),
                    p.innerHTML = M,
                    b(e, f, t),
                    b(e, s3, t),
                    m(s3, i3),
                    b(e, a3, t),
                    b(e, c3, t),
                    c3.innerHTML = B,
                    b(e, l3, t),
                    b(e, s4, t),
                    m(s4, i4),
                    b(e, a4, t),
                    b(e, c4, t),
                    c4.innerHTML = D,
                    b(e, l4, t),
                    b(e, s5, t),
                    m(s5, i5),
                    b(e, a5, t),
                    b(e, c5, t),
                    c5.innerHTML = F,
                    b(e, l5, t),
                    b(e, s6, t),
                    m(s6, i6),
                    b(e, a6, t),
                    b(e, c6, t),
                    c6.innerHTML = P,
                    b(e, l6, t),
                    b(e, s7, t),
                    m(s7, i7),
                    b(e, a7, t),
                    b(e, c7, t),
                    c7.innerHTML = R,
                    b(e, l7, t),
                    b(e, g, t)
                },
                p(e, [t]) {
                    1 & t && T !== (T = e[0]("usages.tools1.title") + "") && H(i, T),
                    1 & t && x !== (x = e[0]("usages.tools1.description") + "") && (c.innerHTML = x),
                    1 & t && _ !== (_ = e[0]("usages.tools2.title") + "") && H(h, _),
                    1 & t && M !== (M = e[0]("usages.tools2.description") + "") && (p.innerHTML = M),
                    1 & t && A !== (A = e[0]("usages.tools3.title") + "") && H(i3, A),
                    1 & t && B !== (B = e[0]("usages.tools3.description") + "") && (c3.innerHTML = B),
                    1 & t && C !== (C = e[0]("usages.tools4.title") + "") && H(i4, C),
                    1 & t && D !== (D = e[0]("usages.tools4.description") + "") && (c4.innerHTML = D),
                    1 & t && E !== (E = e[0]("usages.tools5.title") + "") && H(i5, E),
                    1 & t && F !== (F = e[0]("usages.tools5.description") + "") && (c5.innerHTML = F),
                    1 & t && O !== (O = e[0]("usages.tools6.title") + "") && H(i6, O),
                    1 & t && P !== (P = e[0]("usages.tools6.description") + "") && (c6.innerHTML = P),
                    1 & t && Q !== (Q = e[0]("usages.tools7.title") + "") && H(i7, Q),
                    1 & t && R !== (R = e[0]("usages.tools7.description") + "") && (c7.innerHTML = R)
                },
                i: e,
                o: e,
                d(e) {
                    e && w(s),
                    e && w(a),
                    e && w(c),
                    e && w(l),
                    e && w(u),
                    e && w(d),
                    e && w(p),
                    e && w(f),
                    e && w(s3),
                    e && w(a3),
                    e && w(c3),
                    e && w(l3),
                    e && w(s4),
                    e && w(a4),
                    e && w(c4),
                    e && w(l4),
                    e && w(s5),
                    e && w(a5),
                    e && w(c5),
                    e && w(l5),
                    e && w(s6),
                    e && w(a6),
                    e && w(c6),
                    e && w(l6),
                    e && w(s7),
                    e && w(a7),
                    e && w(c7),
                    e && w(l7),
                    e && w(g)
                }
            }
        }
        function be(e, t, o) {
            let n;
            return u(e, oe, (e => o(0, n = e))),
            [n]
        }
        const we = class extends G {
            constructor(e) {
                super(),
                F(this, e, be, ge, i, {})
            }
        }
        ;
        function ve(e) {
            g(e, "svelte-1l1u2mb", "img{max-width:100%;max-height:50vh;display:block;margin:1em auto;border-radius:1em}main.svelte-1l1u2mb{padding:2em;max-width:600px;margin:auto}")
        }
        function ye(e) {
            let t, o, n, r, s, i, a, c, l, u, h, d, p, f, g, y, k;
            return document.title = r = e[1]("main.title"),
            c = new se({}),
            h = new we({}),
            f = new le({}),
            y = new me({
                props: {
                    t: oe,
                    translationNames: te
                }
            }),
            {
                c() {
                    t = v("link"),
                    o = v("link"),
                    s = $(),
                    i = v("main"),
                    a = v("p"),
                    B(c.$$.fragment),
                    l = $(),
                    u = v("p"),
                    B(h.$$.fragment),
                    d = $(),
                    p = v("p"),
                    B(f.$$.fragment),
                    g = $(),
                    B(y.$$.fragment),
                    T(t, "rel", "stylesheet"),
                    T(t, "href", "./common/styles/common.css"),
                    T(o, "rel", "stylesheet"),
                    T(o, "href", n = "./common/styles/theme-" + e[0] + ".css"),
                    T(i, "class", "svelte-1l1u2mb")
                },
                m(e, n) {
                    m(document.head, t),
                    m(document.head, o),
                    b(e, s, n),
                    b(e, i, n),
                    m(i, a),
                    V(c, a, null),
                    m(i, l),
                    m(i, u),
                    V(h, u, null),
                    m(i, d),
                    m(i, p),
                    V(f, p, null),
                    b(e, g, n),
                    V(y, e, n),
                    k = !0
                },
                p(e, [t]) {
                    (!k || 1 & t && n !== (n = "./common/styles/theme-" + e[0] + ".css")) && T(o, "href", n),
                    (!k || 2 & t) && r !== (r = e[1]("main.title")) && (document.title = r)
                },
                i(e) {
                    k || (D(c.$$.fragment, e),
                    D(h.$$.fragment, e),
                    D(f.$$.fragment, e),
                    D(y.$$.fragment, e),
                    k = !0)
                },
                o(e) {
                    R(c.$$.fragment, e),
                    R(h.$$.fragment, e),
                    R(f.$$.fragment, e),
                    R(y.$$.fragment, e),
                    k = !1
                },
                d(e) {
                    w(t),
                    w(o),
                    e && w(s),
                    e && w(i),
                    P(c),
                    P(h),
                    P(f),
                    e && w(g),
                    P(y, e)
                }
            }
        }
        function $e(e, t, o) {
            let n, r, s;
            var i;
            return u(e, Z, (e => o(2, n = e))),
            u(e, X, (e => o(0, r = e))),
            u(e, oe, (e => o(1, s = e))),
            i = () => {
                var e;
                e = n,
                localStorage.setItem("language", e)
            }
            ,
            function() {
                if (!p)
                    throw new Error("Function called outside component initialization");
                return p
            }().$$.on_mount.push(i),
            [r, s]
        }
        new class extends G {
            constructor(e) {
                super(),
                F(this, e, $e, ye, i, {}, ve)
            }
        }
        ({
            target: document.body
        })
    }
    )()
}
)();
