<template>
  <q-form class="column q-gutter-xs">
    <div
      class="row"
      v-for="(campo, index) in getMetricas"
      :key="campo.id"
      @submit.prevent="onSubmit"
    >
      <p class="col-12 q-gutter-ys">{{ index }}</p>
      <div class="col-3" v-for="(jogo, i) in campo" :key="jogo.id">
        <q-input
          style="max-width: 80px"
          type="number"
          standout
          dense
          placeholder=""
          :label="i"
          class="q-gutter-xs"
          v-model="valuesMetricas[index][i]"
        />
      </div>
    </div>

    <q-btn color="primary" label="continua" type="submit" />
    <q-btn
      flat
      @click="sendRemovePlay()"
      color="primary"
      label="Back"
      class="q-ml-sm"
    />
  </q-form>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { returnVirgula, metricas } from "../../utils/essencial";

export default {
  props: {
    getMetricas: { type: Object },
    quantity: { type: Number },
    team: { type: String },
  },

  setup() {
    const store = useStore();

    const listParams = computed(() => store.state.parameters.data);
    const params = ref("");
    const columnsParams = ref("");

    function sendRemovePlay() {
      store.commit("parameters/sendRemove", []);
      store.commit("parameters/toDecreaseStep", 1);
    }
    const valuesMetricas = ref();
    function onSubmit() {
      //   play.value.validate();
      const lista = [];
      for (let i = 0; i < listParams.value.length; i++) {
        lista.push(listParams.value[i].name);
      }
      console.log("play values ->", valuesMetricas.value);

      const separateComma = returnVirgula(valuesMetricas.value);
      console.log("valores virgula", separateComma);
      console.log("lista ->", lista);

      //   console.log("oi");
      params.value = metricas(separateComma, quantity, team, lista, "row");
      columnsParams.value = metricas(
        separateComma,
        quantity,
        team,
        lista,
        "columns"
      );
      let dataSalved = [];
      dataSalved.push({
        name: team,
        params: params.value,
        editable: { ...valuesMetricas.value },
        created_at: Date.now(),
      });
      console.log(dataSalved);
      Object.assign(dataSalved[0], {
        columns: columnsParams.value,
      });
      console.log("row -> ", params.value);
      console.log("columns -> ", columnsParams.value);
      store.commit("parameters/increaseStep", 1);
    }
    return {
      valuesMetricas,
      sendRemovePlay,
      onSubmit,
    };
  },
};
</script>
