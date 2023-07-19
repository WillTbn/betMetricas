<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h5">Editando dados</p>
      </div>
      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
        @submit.prevent="handleSubmit"
      >
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
              v-model="play.editable[index][i]"
              :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
            />
          </div>
        </div>
        <div class="row justify-between">
          <q-btn label="Update" color="primary" flat type="submit" />
          <q-btn
            class=""
            label="ver lista"
            color="info"
            flat
            :to="{ name: 'team' }"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import UseNotify from "../composables/demo/UseNotify";
import UseMetricas from "../composables/demo/UseMetricas";
import { useQuasar } from "quasar";

export default {
  setup() {
    const { getOne, update } = UseMetricas();
    const { errorNotify, successNotify } = UseNotify();
    const store = useStore();
    const route = useRoute();
    const $q = useQuasar();
    const play = ref();
    const play2 = ref();
    const metricasValues = ref();

    const isUpdate = computed(() => route.params.key);
    const handleMetrica = async (item) => {
      $q.loading.show();
      try {
        play.value = await getOne(item);
        successNotify("Estatitica achada!");
      } catch (e) {
        console.log(e);
        errorNotify();
      } finally {
        metricasValues.value = { ...play.value.editable };
        setTimeout(() => {
          $q.loading.hide();
        }, 2000);
      }
    };
    onMounted(() => {
      if (isUpdate.value) {
        console.log(isUpdate.value);
        handleMetrica(isUpdate.value);
      }
    });

    const handleSubmit = async () => {
      $q.loading.show();
      try {
        await update(play.value);
      } catch (e) {
        console.log(e);
        errorNotify();
      } finally {
        setTimeout(() => {
          $q.loading.hide();
        }, 2000);
      }
    };
    return {
      play,
      play2,
      metricasValues,
      handleSubmit,
    };
  },
};
</script>
