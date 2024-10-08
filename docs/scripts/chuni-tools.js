(() => {
    "use strict";
  
    const Language = {
      EN_US: "en_US",
      ZH_TW: "zh_TW"
    };
  
    const DOMAIN = "chunithm-net-eng.com";
    const BASE_URL = `https://${DOMAIN}`;
  
    const messages = {
      [Language.EN_US]: {
        alreadyRun: "Please refresh the page before running CHUNI TOOLS again!",
        wrongBase: `Oops! Looks like you are on the wrong page.\nPlease open CHUNITHM-NET Intl. (${DOMAIN}) and login, then try again.`
      },
      [Language.ZH_TW]: {
        alreadyRun: "請重新整理頁面後再執行 CHUNITHM 查分器！",
        wrongBase: `請到 CHUNITHM-NET Intl. (${DOMAIN}) 登入之後再試一次。`
      }
    };
  
    const getLanguage = () => {
      const urlLangParam = new URLSearchParams(location.search).get("lang");
      if (urlLangParam) {
        return urlLangParam.startsWith("zh") ? Language.ZH_TW : Language.EN_US;
      }
  
      const localStorageLang = localStorage.getItem("language");
      if (localStorageLang) {
        return localStorageLang === Language.ZH_TW ? Language.ZH_TW : Language.EN_US;
      }
  
      return navigator.language.startsWith("zh") ? Language.ZH_TW : Language.EN_US;
    };
  
    const lang = getLanguage();
  
    if (window.chuniTools) {
      alert(messages[lang].alreadyRun);
      return;
    }
  
    window.chuniTools = true;
  
    if (window.location.hostname !== DOMAIN) {
      alert(messages[lang].wrongBase);
      window.location.href = BASE_URL;
      return;
    }
  
    const loadScript = (scriptName) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = `${getScriptBaseUrl()}/scripts/${scriptName}.js`;
      document.body.appendChild(scriptElement);
    };
  
    const getScriptBaseUrl = () => {
      const scriptElements = Array.from(document.querySelectorAll("script"));
      for (let script of scriptElements.reverse()) {
        if (script.src.includes("chuni-tools")) {
          const url = new URL(script.src);
          const path = url.pathname;
          return `${url.origin}${path.substring(0, path.lastIndexOf("/scripts"))}`;
        }
      }
      return "https://jack4215.github.io/chuni-tools";
    };
  
    const pathname = window.location.pathname;
    if (pathname.includes("/mobile/home/userOption/updateUserName")) {
      loadScript("idxmap-generate");
    } else if (pathname.includes("/mobile/record/musicGenre")) {
      loadScript("export-csv");
    } else {
      loadScript("fetch-all");
    }
  })();
  