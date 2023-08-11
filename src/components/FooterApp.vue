<template>
  <footer>
    <div class="moon">
      <q-btn @click="activeMod()">
        <i class="fas fa-moon"></i>
      </q-btn>
    </div>
    <div class="shared text-caption">
      <address>
        {{ frase }}
        Jorge Nunes
        <span v-for="shared in link" :key="shared.id">
          <a :href="shared.link" target="_blank" class="q-px-sm">
            <i :class="shared.icon"></i>
          </a>
        </span>
      </address>
    </div>
  </footer>
</template>
<script>
import { useQuasar } from "quasar";
import useCookie from "src/composables/cookie/UseCookie";
import { defineComponent } from "vue";
export default defineComponent({
  name: "FooterApp",
  props: {
    email: { type: String },
    link: { type: Array },
    frase: { type: String },
  },
  setup() {
    const $q = useQuasar();
    const { setMoonLight } = useCookie();
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
    return { activeMod };
  },
});
</script>
