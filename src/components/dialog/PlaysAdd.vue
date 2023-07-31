<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Quantos jogos quer adicionar?</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input dense v-model="quantity" autofocus type="number" />
    </q-card-section>

    <q-card-actions align="center" class="text-primary">
      <q-btn flat label="Cancel" color="negative" v-close-popup />
      <q-btn flat label="Add jogos" color="positive" @click="sendAdd" />
    </q-card-actions>
  </q-card>
</template>
<script>
import { computed, defineComponent, ref, defineEmits } from "vue";
import UseMetricas from "../../composables/demo/UseMetricas";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PlaysAdd",
  setup() {
    const store = useStore();
    const quantity = ref();
    const metricas = computed(() => store.state.parameters.metricas);
    const $q = useQuasar();
    const { addPlaysMetricas } = UseMetricas();
    const editable = ref();
    const emitAlgo = defineEmits(["updateEditable"]);
    const sendAdd = async () => {
      $q.loading.show();
      try {
        editable.value = await addPlaysMetricas(quantity, metricas.value);
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          emitAlgo("updateEditable", { metricas, prompt });
          $q.loading.hide();
        }, 1500);
      }
      console.log("ola=>", metricas.value);
    };
    return {
      quantity,
      sendAdd,
      emitAlgo,
    };
  },
});
</script>
