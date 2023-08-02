<template >
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
        <p>
          Nos usamos cookie para melhora sua experiência, de forma alguma para
          coletar qualquer dados que seja, tudo fica no seu navegador!
        </p>
        <span class="q-ml-sm">
          Aceitar salva cookie para melhora sua experiência ?
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
</template>
<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import useCookie from "../../composables/cookie/UseCookie";

export default defineComponent({
  name: "TermsEssencial",
  setup() {
    const store = useStore();
    const { setCookieTerms } = useCookie();
    const cookie = computed(() => store.state.essencial.terms);
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

    return {
      toogleDialog,
      cookie,
    };
  },
});
</script>
