<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <h3 class="text-h6 text-weight-bold col-6 col-sm-4">Times Salvos</h3>
      <size-local></size-local>
    </div>
    <!-- <div class="column justify-center"> -->
    <div v-if="games.length > 0">
      <div v-for="team in games" :key="team.name">
        <div class="row justify-center">
          <table-metricas
            class="col-md-8 col-12"
            :team="team.name"
            :columnsMetricas="team.columns"
            :rowMetricas="team.params"
          />
        </div>
        <div class="row justify-center q-px-md padding-buttons-stat">
          <div class="col-4">
            <q-btn
              type="submit"
              :loading="loading"
              label="Editar"
              class="q-mt-md"
              color="info"
              icon="edit"
              @click="edit(team)"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
          <div class="">
            <q-btn
              type="submit"
              :loading="loading"
              label="Deletar"
              class="q-mt-md"
              color="red"
              icon="delete_forever"
              @click="deletedAction(team)"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </div>
      </div>
    </div>

    <div class="" v-else>Não tem times salvos!!</div>
  </div>
  <!-- </div> -->
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import TableMetricas from "../components/TableMetricas.vue";
import { useRouter } from "vue-router";
import { Notify, useQuasar } from "quasar";
import SizeLocal from "../components/SizeLocal.vue";
import useMetricas from "src/composables/demo/UseMetricas";

export default {
  components: {
    TableMetricas,
    SizeLocal,
  },
  setup() {
    const loading = ref(false);
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();
    const games = computed(() => store.state.parameters.gamesSalved);
    const { deleted, getAll } = useMetricas();
    function edit(team) {
      router.push({ path: `${team.key}/statistics`, params: team.key });
    }

    const deletedAction = async (item) => {
      loading.value = true;
      try {
        await deleted(item);
      } catch (e) {
        console.log(e);
      } finally {
        Notify.create({
          type: "positive",
          message: "Estatística excluída com sucesso",
        });
        setTimeout(() => {
          router.go({ path: "statiticas" });
        }, 2000);
      }
    };
    onMounted(() => {
      //   store.dispatch("parameters/getGamesSalved");
      getAll();
    });
    return {
      games,
      loading,
      deletedAction,
      edit,
    };
  },
};
</script>
