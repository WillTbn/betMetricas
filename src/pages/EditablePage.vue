<template>
  <div class="q-mx-lg q-my-lg">
    <div class="row justify-between">
      <div class="col-12 text-center">
        <p class="text-h5 text-weight-bold">Editando dados</p>
      </div>
      <div class="col-md-6 col-sm-3 text-center">
        <p class="text-h4 text-weight-bold">{{ isUpdate }}</p>
      </div>
      <div class="col-md-3 col-sm-4">
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
    <q-form class="q-gutter-y-xl" @submit.prevent="handleSubmit">
      <div class="row justify-center">
        <q-card
          class="row q-my-lg q-py-md"
          v-for="(campo, index) in metricasValues"
          :key="campo.id"
          style="max-width: 50rem"
        >
          <p
            class="col-12 col-sm-12 text-h6 text-weight-bold q-gutter-ys q-mx-lg"
          >
            {{ index }}
          </p>
          <q-card-section
            class="col-md-3 col-sm-2"
            v-for="(jogo, i) in campo"
            :key="jogo.id"
          >
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
      </div>
      <div class="row justify-between">
        <q-btn
          label="novo parametro"
          color="dark"
          class="q-ma-md"
          @click="handleDialog"
          ><q-tooltip
            v-if="terms"
            color="primary"
            transition-show="rotate"
            transition-hide="rotate"
          >
            Voce não aceitor salva cookie!
          </q-tooltip>
        </q-btn>

        <q-btn
          @click="sendAcremend()"
          label="Add jogos"
          color="accent"
          icon="fa-solid fa-plus fa-sm"
          class="q-ma-md"
        >
        </q-btn>
        <q-btn class="q-my-md" label="Update" color="positive" type="submit" />
      </div>
    </q-form>
    <q-dialog v-model="prompt" persistent>
      <paramns-update></paramns-update>
    </q-dialog>
  </div>
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useStore, mapGetters } from "vuex";
import { useRoute, useRouter } from "vue-router";
import UseNotify from "../composables/demo/UseNotify";
import UseMetricas from "../composables/demo/UseMetricas";
import UseCookie from "../composables/cookie/UseCookie";
import { useQuasar } from "quasar";
import ParamnsUpdate from "../components/dialog/ParamnsUpdate.vue";

export default {
  components: {
    ParamnsUpdate,
  },
  setup() {
    const prompt = ref(false);
    const { getOne, update, addPlaysMetricas, updateField } = UseMetricas();
    const { errorNotify, successNotify, infoNotify } = UseNotify();
    const { getOneCookie, getTerms, setDelet } = UseCookie();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const play = ref();
    const metricasValues = ref({});
    const terms = computed(() => store.state.essencial.terms);
    const isAddParamns = ref();
    const isUpdate = computed(() => route.params.key);
    const handleMetrica = async (item) => {
      $q.loading.show();
      try {
        isAddParamns.value = await getOneCookie(isUpdate.value);
        play.value = await getOne(item);
        // terms.value = await getTerms("terms");
        successNotify("Estatitica achada!");
      } catch (e) {
        console.log(e);
        errorNotify();
      } finally {
        if (isAddParamns.value) {
          metricasValues.value = await updateField(
            isUpdate.value,
            isAddParamns.value[1],
            play.value.editable
          );
        } else {
          metricasValues.value = { ...play.value.editable };
        }
        // store.commit("parameters/setMetricas", {
        //     ...play.value.editable,
        // });
        // metricasValues.value = { ...play.value.editable };
        setTimeout(() => {
          $q.loading.hide();
        }, 2000);
      }
    };
    const sendAcremend = async () => {
      $q.loading.show();
      try {
        metricasValues.value = await addPlaysMetricas(1, metricasValues.value);
      } catch (e) {
        console.log(e);
      } finally {
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
    const handleDialog = () => {
      console.log("TERMS ->", terms.value);
      if (terms.value) {
        infoNotify("Para utilizar precisa aceitar os termos!");
        setTimeout(() => {
          store.commit("essencial/setStatusCookie", true);
        }, 1000);
      } else {
        prompt.value = true;
      }
    };
    const handleSubmit = async () => {
      $q.loading.show();
      try {
        successNotify("Estatística atualizada com sucesso!");
        await update(play.value, metricasValues.value);
        if (isAddParamns.value) {
          await setDelet(isUpdate.value);
        }
      } catch (e) {
        console.log(e);
        errorNotify();
      } finally {
        setTimeout(() => {
          $q.loading.hide();
          router.go({ path: "statiticas" });
        }, 2000);
      }
    };
    return {
      play,
      prompt,
      metricasValues,
      handleSubmit,
      sendAcremend,
      handleDialog,
      isAddParamns,
      isUpdate,
      terms,
    };
  },
};
</script>
