<template>
  <terms-essencial></terms-essencial>

  <router-view />
  <!-- MOONLIGHT -->
  <footer-app email="jlbnunes@live.com" frase="Desenvolvedor:" :link="shared" />
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
    const { getOneCookie } = useCookie();
    const guard = ref();

    const Diaolog = async () => {
      try {
        guard.value = await getOneCookie("terms");
        store.commit("essencial/setStatusCookie", guard.value);
        console.log("guard -> ", guard.value);
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
        console.log("state Moon set", status);
        console.log("state Moon", $q.dark.mode);
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
    };
  },
});
</script>
