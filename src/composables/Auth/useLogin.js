import { computed, ref } from "vue";
import { googleTokenLogin } from "vue3-google-login";
import useNotify from "../demo/UseNotify";
import { useStore } from "vuex";
import axios from "axios";
import { route } from "quasar/wrappers";
export default function useAuth() {
  const { infoNotify, errorNotify } = useNotify();
  const store = useStore();
  const dataUser = computed(() => store.state.user.data);
  // const dataLocal = JSON.parse(localStorage.getItem(process.env.KEY_USER));
  const dataLocal = JSON.parse(localStorage.getItem("localUserMetricas"));
  const googleAuth = ref();
  const getUserInfo = async (getData) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${getData.access_token}`,
          },
        }
      );
      store.commit("user/setData", response.data);
      // user.value = response.data;
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
      throw error;
    }
  };
  const getToken = async () => {
    googleTokenLogin()
      .then((response) => {
        console.log("handler the reponse: ", response);
        googleAuth.value = response;
        // googleAuth.value.resourceName = "people/me";
        googleAuth.value.personFields = ["emailAddresses", "names", "photos"];

        googleAuth.value.initial_expires = new Date();
        localStorage.setItem(
          "localUserMetricas",
          JSON.stringify(googleAuth.value)
        );
        getUserInfo(googleAuth.value);
      })
      .catch((error) => {
        console.error(error);
        errorNotify("Erro ao authentifica com o google!");
      });
  };
  const expireData = (initial, expire_in) => {
    let returnBoolean = false;
    if (dataLocal) {
      console.log("estou com datalocal");
      const dataInitial = new Date(initial);
      const dataFinal = new Date();

      const diffMS = dataFinal - dataInitial;
      const difMinuts = diffMS / (1000 * 60);
      returnBoolean = difMinuts > expire_in;
    }

    console.log("-> expireData ", returnBoolean);
    return returnBoolean;
  };
  const googleLogin = async () => {
    if (dataLocal) {
      await getUserInfo();
    } else {
      await getToken();
    }
  };
  const setLogout = () => {
    localStorage.removeItem("localUserMetricas");
    window.location.reload();
  };

  return {
    googleLogin,
    expireData,
    setLogout,
    getUserInfo,
    dataLocal,
  };
}
