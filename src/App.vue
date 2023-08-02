<template>

    <terms-essencial></terms-essencial>

  <router-view />
  <!-- MOONLIGHT -->
  <div class="moon">
    <q-btn @click="activeMod()">
      <i class="fas fa-moon"></i>
    </q-btn>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import TermsEssencial from "./components/dialog/TermsEssencial.vue";
import useCookie from "./composables/cookie/UseCookie";

export default defineComponent({
  name: "App",
  components: {
    TermsEssencial,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const { getOneCookie, setMoonLight } = useCookie();
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
    const setMoon = async (status) => {
      try {
        await setMoonLight(status);
      } catch (e) {
        console.log(e);
      } finally {
      }
    };
    function activeMod() {
      console.log("aqui ->", activeMod.name);
      // get status
      console.log($q.dark.isActive); // true, false

      // get configured status
      console.log($q.dark.mode); // "auto", true, false
      setMoon($q.dark.isActive);
      $q.dark.toggle();
    }
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
    return {

      activeMod,
    };
  },
});
</script>
