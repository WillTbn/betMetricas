<template>
  <div>
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

export default {
  components: {
    TableMetricas,
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
    function toDecrease() {
      store.commit("parameters/toDecreaseStep", 1);
    }
    const salvedData = async () => {
      loading.value = true;
      console.log("team ->", team);
      console.log("params ->", params);
      console.log("metricas ->", metricas);
      console.log("columns ->", columns);
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
    };
    return { salvedData, toDecrease, loading, team, params, columns };
  },
};
</script>
