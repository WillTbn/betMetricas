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
            }
        }
        return true;
    };

    const setCookieTerms = async () => {
        document.cookie = "terms=false";
    };
    const setMoonLight = async (status) => {
        console.log("status -> ", status);
        document.cookie = `moon=${status}`;
    };
    return {
        getOneCookie,
        setCookieTerms,
        setMoonLight,
    };
}
