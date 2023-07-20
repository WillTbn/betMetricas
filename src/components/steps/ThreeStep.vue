<template>
  <q-form @submit.prevent="createValues()">
    <div class="column items-center justify-center q-my-lg">
      <q-input
        class="col-4 col-sm-6 col-md-6 q-glutter-sm"
        type="number"
        standout
        dense
        label="quantidade"
        placeholder=""
        v-model="quantity"
        :rules="[
          (val) =>
            (val && val > 0) || 'Adione quantidades de metricas por parametros',
        ]"
      />
    </div>
    <div class="row justify-around">
      <!-- <q-btn @click="setGamesInline()" color="primary" label="Continue" /> -->
      <q-btn
        class="q-mt-md q-mr-sm"
        type="submit"
        color="primary"
        label="Continue"
      />
      <q-btn
        flat
        @click="toDecrease()"
        color="primary"
        label="Back"
        class="q-mt-md q-mr-sm"
      />
    </div>
  </q-form>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { metricasParamsValues } from "../../utils/essencial";
const store = useStore();
const quantity = ref(2);
const metricasValues = ref();
const listParams = computed(() => store.state.parameters.data);
const emitEvento = defineEmits(["sendQuantityOrMetrica"]);
function createValues() {
  metricasValues.value = metricasParamsValues(listParams.value, quantity.value);
  emitEvento("sendQuantityOrMetrica", {
    quantity: quantity.value,
    metrica: metricasValues.value,
  });
  store.commit("parameters/sendGames", quantity);
  store.commit("parameters/increaseStep", 1);
  console.log("VALOR metricas -> ", metricasValues.value);
}
function toDecrease() {
  store.commit("parameters/toDecreaseStep", 1);
}
</script>
