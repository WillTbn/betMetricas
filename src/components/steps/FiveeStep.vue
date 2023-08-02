<template>
  <div>
    <terms-essencial></terms-essencial>
    <table-metricas
      :team="team"
      :columnsMetricas="columns"
      :rowMetricas="params"
    />

    <div class="row">
      <q-btn
        type="submit"
        :loading="loading"
        label="Salva"
        class="q-mt-md q-ma-md col-3"
        color="teal"
        @click="salvedData"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
      <!-- <q-btn color="success" label="salvar" @click="salvedData" /> -->
      <q-btn
        :disabled="loading"
        flat
        @click="toDecrease()"
        color="primary"
        label="Back"
        class="q-mt-md q-ma-md col-3"
      />
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import TableMetricas from "../TableMetricas.vue";
import { useRouter } from "vue-router";
import useNotify from "../../composables/demo/UseNotify";
import useMetricas from "../../composables/demo/UseMetricas";
import { useStore } from "vuex";
import TermsEssencial from "../dialog/TermsEssencial.vue";
import useCookie from "src/composables/cookie/UseCookie";

export default {
  components: {
    TableMetricas,
    TermsEssencial,
  },
  setup() {
    const loading = ref(false);
    const router = useRouter();
    const { create } = useMetricas();
    const { infoNotify, errorNotify } = useNotify();
    const store = useStore();
    const team = computed(() => store.state.parameters.team);
    const params = computed(() => store.state.parameters.paramsRow);
    const columns = computed(() => store.state.parameters.paramsColumns);
    const metricas = computed(() => store.state.parameters.metricas);
    const cookie = computed(() => store.state.essencial.terms);
    const guard = ref();
    const { getOneCookie } = useCookie();
    function toDecrease() {
      store.commit("parameters/toDecreaseStep", 1);
    }
    const salvedData = async () => {
      loading.value = true;
      //   console.log("team ->", team);
      //   console.log("params ->", params);
      //   console.log("metricas ->", metricas);
      //   console.log("columns ->", columns);
      console.log("cookie -> ", cookie.value);
      guard.value = await getOneCookie("terms");
      console.log("get -> ", getOneCookie("terms"));
      if (guard.value === false) {
        try {
          await create(team.value, params.value, metricas.value, columns.value);
          router.replace({ path: "/statistics" });
        } catch (e) {
          console.log(e);
          errorNotify(e);
        } finally {
          infoNotify("Estatística salva com sucesso!");
          loading.value = false;
        }
      } else {
        store.commit("essencial/setStatusCookie", true);
        errorNotify(
          "Você tem que aceita os cookie para podemos salva as informações dessa metrica localmente"
        );
        setTimeout(() => {
          loading.value = false;
        }, 1000);
      }
    };
    return { salvedData, toDecrease, loading, team, params, columns, cookie };
  },
};
</script>
