<template>
  <div class="q-mx-lg q-my-lg">
    <div class="row justify-between">
      <div class="col-6 col-sm-3 text-center">
        <p class="text-h5 text-weight-bold">Editando dados</p>
      </div>
      <div class="col-3 col-sm-2">
        <q-btn
          class=""
          label="volta"
          color="info"
          flat
          icon="fa-solid fa-arrow-left fa-sm"
          :to="{ name: 'statistics' }"
        />
      </div>
    </div>
    <!-- class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" -->
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-card
        class="row q-mx-lg"
        v-for="(campo, index) in metricasValues"
        :key="campo.id"
      >
        <p class="col-12 text-h6 text-weight-bold q-gutter-ys q-mx-lg">
          {{ index }}
        </p>
        <q-card-section class="col-3" v-for="(jogo, i) in campo" :key="jogo.id">
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
        </q-card-section>
      </q-card>
      <div class="row justify-between">
        <q-btn label="Update" color="positive" type="submit" />
        <q-btn label="novo parametro" color="dark" />

        <q-btn
          @click="sendCardAddPlays()"
          label="Add jogos"
          color="accent"
          icon="fa-solid fa-plus fa-sm"
        ></q-btn>
      </div>
    </q-form>
    <q-dialog v-model="prompt" persistent>
      <!-- <add-plays
        @updateEditable="
          (metricasValues = { ...$event.metricas }), (prompt = $event.prompt)
        "
      ></add-plays> -->
      <plays-add
        @updateEditable="
          (metricasValues = { ...$event.metricas }), (prompt = $event.prompt)
        "
      />
    </q-dialog>
  </div>
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import UseNotify from "../composables/demo/UseNotify";
import UseMetricas from "../composables/demo/UseMetricas";
import { useQuasar } from "quasar";
import PlaysAdd from "../components/dialog/PlaysAdd.vue";

export default {
  components: {
    PlaysAdd,
  },
  setup() {
    const prompt = ref(false);
    const { getOne, update } = UseMetricas();
    const { errorNotify, successNotify } = UseNotify();
    const store = useStore();
    const route = useRoute();
    const $q = useQuasar();
    const play = ref();
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

    const sendCardAddPlays = () => {
      store.commit("parameters/setMetricas", metricasValues.value);

      prompt.value = true;
    };

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
      prompt,
      metricasValues,
      handleSubmit,
      sendCardAddPlays,
    };
  },
};
</script>
