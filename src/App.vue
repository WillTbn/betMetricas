<template>
  <terms-essencial></terms-essencial>

  <router-view />
  <!-- MOONLIGHT -->
  <footer-app email="jlbnunes@live.com" frase="Desenvolvedor:" :link="shared" />
  {{ valueEnv }}
</template>

<script>
import { useQuasar } from "quasar";
import { ref, computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import TermsEssencial from "./components/dialog/TermsEssencial.vue";
import useCookie from "./composables/cookie/UseCookie";
import FooterApp from "./components/FooterApp.vue";
export default defineComponent({
  name: "App",
  components: {
    TermsEssencial,
    FooterApp,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const { getOneCookie, getTerms } = useCookie();
    const guard = ref();
    const valueEnv = ref(null);

    const Diaolog = async () => {
      try {
        guard.value = await getTerms("terms");

        store.commit("essencial/setStatusCookie", guard.value);
        valueEnv.value = process.env.API_URL;
        console.log("teste env -> ", process.env);
      } catch (e) {
        console.log(e);
      } finally {
        console.log("finally app", Diaolog.name);
      }
    };
    const stateMoon = async () => {
      try {
        let status = await getOneCookie("moon");
        $q.dark.set(status);
      } catch (e) {
        console.log(e);
      } finally {
        console.log("finally moon", stateMoon.name);
      }
    };
    onMounted(() => {
      //   if (cookie.value == true) {
      Diaolog();
      stateMoon();
      //   }
    });
    const shared = [
      {
        link: "https://github.com/WillTbn",
        name: "github",
        icon: "fa-brands fa-github",
      },
      {
        link: "https://twitter.com/jlbnwill",
        name: "twitter",
        icon: "fa-brands fa-twitter",
      },
    ];

    return {
      shared,
      guard,
      valueEnv,
    };
  },
});
</script>
