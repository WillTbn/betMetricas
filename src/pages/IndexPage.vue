<template>
  <!-- <div class="flex flex-center"> -->
  <div class="q-pa-md">
    <div class="row justify-center">
      <h4 class="col-10 col-md-12 col-sm-6 text-h6 text-weight-bold">
        Adicione a metrica que quiser!
      </h4>
      <div class="col-12">
        <span class="text-overline"
          >sigar o passo a passo e terá todas os dados com as medias no
          final</span
        >
      </div>
    </div>
  </div>
  <q-stepper
    class="q-mx-lg"
    v-model="step"
    color="primary"
    animated
    style="min-height: 60vh"
    header-nav
    ref="stepper"
    contracted
    alternative-labels
  >
    <StepperLayout
      title="De o nome da sua metrica"
      :step="step"
      :name="1"
      icon="fa-solid fa-shield-halved"
    >
      <one-step />
    </StepperLayout>

    <!-- ETAPA 2 -->
    <StepperLayout
      title="Quais parametros?"
      caption="ex:Chute a gol, ace, bola de três, etc.."
      :step="step"
      :name="2"
      icon="fa-solid fa-chart-gantt"
    >
      <two-step />
    </StepperLayout>
    <!-- ETAPA 3 -->
    <StepperLayout
      title="Quantidade de jogos"
      caption=""
      :step="step"
      :name="3"
      icon="assignment"
    >
      <three-step
        @sendQuantityOrMetrica="
          (data.quantity = $event.quantity), (metricasValues = $event.metrica)
        "
      />
    </StepperLayout>
    <!-- ETAPA 4 -->
    <StepperLayout
      title="Coloque os dados"
      :step="step"
      :name="4"
      icon="add_comment"
    >
      <q-form class="q-gutter-xs" @submit.prevent="onSubmit">
        <div
          class="row"
          v-for="(campo, index) in metricasValues"
          :key="campo.id"
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
              v-model="metricasValues[index][i]"
              :rules="[
                (val) => (val && val.length > 0) || 'Campo não pode esta vazio',
              ]"
            />
          </div>
        </div>
        <div class="row justify-around">
          <q-btn
            class="q-mt-md q-mr-sm"
            color="primary"
            label="continua"
            type="submit"
          />
          <q-btn
            flat
            @click="sendRemovePlay()"
            color="primary"
            label="Back"
            class="q-mt-md q-mr-sm"
          />
        </div>
      </q-form>
    </StepperLayout>
    <!-- ETAPA 5 -->
    <StepperLayout
      title="Tabela elaborada"
      :step="step"
      :name="5"
      icon="add_comment"
    >
      <five-step />
    </StepperLayout>
  </q-stepper>
  <!-- </div> -->
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
// import TableMetricas from "../components/TableMetricas.vue";
import OneStep from "../components/steps/OneStep.vue";
import TwoStep from "../components/steps/TwoStep.vue";
import ThreeStep from "../components/steps/ThreeStep.vue";
import FiveStep from "../components/steps/FiveeStep.vue";
// import FourStep from "../components/steps/FourStep.vue";
import StepperLayout from "../layouts/StepperLayout.vue";
import { useRouter } from "vue-router";
import { returnVirgula, metricas } from "../utils/essencial";

export default {
  components: {
    OneStep,
    TwoStep,
    ThreeStep,
    FiveStep,
    // FourStep,
    StepperLayout,
  },
  setup() {
    const loading = ref(false);
    const router = useRouter();
    const store = useStore();
    // const $q = useQuasar();
    const listParams = computed(() => store.state.parameters.data);
    const step = computed(() => store.state.parameters.step);

    const metricasValues = ref();
    const data = ref({
      quantity: "2",
    });

    function sendRemovePlay() {
      store.commit("parameters/sendRemove", []);
      store.commit("parameters/toDecreaseStep", 1);
    }
    function onSubmit() {
      //   play.value.validate();
      const lista = [];
      for (let i = 0; i < listParams.value.length; i++) {
        lista.push(listParams.value[i].name);
      }
      console.log("play values ->", metricasValues.value);

      const separateComma = returnVirgula(metricasValues.value);
      console.log("valores virgula", separateComma);
      console.log("lista ->", lista);
      store.commit("parameters/increaseStep", 1);

      store.commit(
        "parameters/setParamsRow",
        metricas(
          separateComma,
          data.value.quantity,
          data.value.time,
          lista,
          "row"
        )
      );
      store.commit(
        "parameters/setParamsColumns",
        metricas(
          separateComma,
          data.value.quantity,
          data.value.time,
          lista,
          "columns"
        )
      );
      store.commit("parameters/setMetricas", metricasValues.value);
    }

    return {
      step,
      listParams,
      data,
      router,
      loading,
      metricasValues,
      sendRemovePlay,
      onSubmit,
      store,
    };
  },
};
</script>
