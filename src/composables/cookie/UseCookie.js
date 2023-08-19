// import { useStore } from "vuex";
export default function useCookie() {
  // const store = useStore();
  const getOneCookie = async (name) => {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split("=");

      if (cookie[0] === name) {
        if (name === "terms") {
          return cookie[1] == "true" ? true : false;
        } else if (name === "moon") {
          return cookie[1] == "true" ? false : true;
        }
        return cookie;
      }
    }
    return false;
  };
  const getTerms = async (name) => {
    var cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split("=");
      if (cookie.includes(name)) {
        return cookie[1] == "true" ? true : false;
      }
    }
    console.log(getTerms.name);
    return false;
  };
  const setCookieTerms = async () => {
    document.cookie = "terms=false";
  };
  const setMoonLight = async (status) => {
    document.cookie = `moon=${status}`;
  };
  const setUpdateParamns = async (value, team) => {
    document.cookie = `${team}=${value}`;
    // document.cookie = `teamIsUpdate=${team}`;
    // document.cookie = `newParamns=${value}`;
  };
  const setDelet = async (item) => {
    document.cookie =
      item + "=; expires=Thu, 01 jan 1970 00:00:00 UTC; path=/;";
  };
  return {
    getOneCookie,
    setCookieTerms,
    setMoonLight,
    setUpdateParamns,
    setDelet,
    getTerms,
  };
}
