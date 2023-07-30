<template>
  <div class="q-pa-md">
    <h3>Times Salvos</h3>
    <div class="row justify-center">
      <div class="row" v-if="games.length > 0">
        <div class="col-6" v-for="team in games" :key="team.name">
          <table-metricas
            :team="team.name"
            :columnsMetricas="team.columns"
            :rowMetricas="team.params"
          />
          <div class="row justify-around">
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
            <div class="col-4">
              <q-btn
                type="submit"
                :loading="loading"
                label="Deletar"
                class="q-mt-md"
                color="red"
                icon="delete_forever"
                @click="deleted(team)"
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
  </div>
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import TableMetricas from "../components/TableMetricas.vue";
import { useRouter } from "vue-router";
import { Notify, useQuasar } from "quasar";

export default {
  components: {
    TableMetricas,
  },
  setup() {
    const loading = ref(false);
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();
    const games = computed(() => store.state.parameters.gamesSalved);
    function edit(team) {
      router.push({ path: `${team.key}/statistics`, params: team.key });
    }

    function deleted(item) {
      loading.value = true;
      console.log("vai deleta a key -> ", item.key);
      setTimeout(() => {
        loading.value = false;
        store.dispatch("parameters/deletedGameSalved", item);
        Notify.create({
          type: "positive",
          message: "Estatística excluída com sucesso",
        });
        router.push("statistics");
        // router.replace({ path: "/times" });
      }, 4000);
    }
    onMounted(() => {
      store.dispatch("parameters/getGamesSalved");
    });
    return {
      games,
      loading,
      deleted,
      edit,
    };
  },
};
</script>
