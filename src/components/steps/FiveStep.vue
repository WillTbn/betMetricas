<template>
  <div>
    <table-metricas
      :team="team"
      :columnsMetricas="columns"
      :rowMetricas="paramsRow"
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
  props: {
    columns: { type: Array },
    paramsRow: { type: Array },
    metricas: { type: Object },
  },
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
    const salvedData = async () => {
      loading.value = true;
      console.log("team ->", team);
      console.log("params ->", paramsRow);
      console.log("metricas ->", metricas);
      console.log("columns ->", columns);
      try {
        await create(team, paramsRow, metricas, columns);
      } catch (e) {
        console.log(e);
        errorNotify(e);
      } finally {
        infoNotify("Estatística salva com sucesso!");
        loading.value = false;
        setTimeout(() => {
          router.go({ path: "statiticas" });
        }, 1000);
      }
    };
    return { salvedData, loading, team };
  },
};
</script>
