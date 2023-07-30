<template>
  <q-dialog
    v-model="cookie"
    persistent
    transition-show="rotate"
    transition-hide="rotate"
  >
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          icon="fa-solid fa-cookie-bite"
          color="primary"
          text-color="white"
        />
        <span class="q-ml-sm"
          >Aceitar salva cookie para melhora sua experiencia ?
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          @click="toogleDialog(false)"
        />
        <q-btn
          flat
          label="Aceitar"
          color="positive"
          @click="toogleDialog(true)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
import useCookie from "./composables/cookie/UseCookie";

export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const { getOneCookie, setCookieTerms, setMoonLight } = useCookie();
    const guard = ref();
    const cookie = computed(() => store.state.essencial.terms);
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
    const setCookies = async () => {
      try {
        await setCookieTerms();
      } catch (e) {
        console.log(e);
      } finally {
      }
    };
    function toogleDialog(status) {
      if (status == true) {
        setCookies();
      }
      // store.dispatch("essencial/updateStatusCookie", status);
      store.commit("essencial/setStatusCookie", false);
    }
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
      cookie,
      toogleDialog,
      activeMod,
    };
  },
});
</script>
