<template>
  <div class="row justify-center text-center">
    <p class="col-12">
      Aqui você irá adionar um identificador para sua metrica. Isso pode ou não
      se salvo por você no final.
    </p>
    <q-form class="col-md-3 col-sm-6 items-center" @submit.prevent="sendStep()">
      <q-input
        standout
        dense
        placeholder="Ex: Flamengo, oklahoma city thunder, Nadal"
        v-model="team"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Adicione o identificador para sua metrica',
        ]"
      />

      <q-stepper-navigation>
        <q-btn type="submit" color="primary" label="Continue" class="q-ma-md" />
      </q-stepper-navigation>
    </q-form>
    <!-- <q-stepper-navigation>

    </q-stepper-navigation> -->
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import useNotify from "../../composables/demo/UseNotify";

export default {
  setup() {
    const store = useStore();
    const team = ref("");
    const { errorNotify } = useNotify();
    const textError = ref();
    function sendStep() {
      let names = Object.keys(localStorage);
      if (
        names.filter(
          (e) =>
            e.toUpperCase().replace(/\s+/g, "") ===
            team.value.toUpperCase().replace(/\s+/g, "")
        ).length > 0
      ) {
        textError.value =
          "Use outro identificador, atualize o existente ou exclusao e volte aqui. ";
        errorNotify("Identificador já utilizado!");
      } else {
        store.commit("parameters/addTeam", team.value);
        store.commit("parameters/increaseStep", 1);
      }
    }
    return {
      team,
      sendStep,
    };
  },
};
</script>
