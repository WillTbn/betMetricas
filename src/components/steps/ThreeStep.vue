<template>
  <q-form class="row justify-around" @submit.prevent="createValues()">
    <div class="col-12 q-mt-md q-mr-sm">
      <q-input
        style="max-width: 200px"
        c
        type="number"
        standout
        dense
        placeholder=""
        v-model="quantity"
        :rules="[
          (val) =>
            (val && val > 0) || 'Adione quantidades de metricas por parametros',
        ]"
      />
    </div>
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
