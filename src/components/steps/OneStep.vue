<template>
  <div>
    <p>
      Aqui você irá adionar um identificador para sua metrica. <br />
      Isso pode ou não se salvo por você no final.
    </p>
    <q-form class="column items-center" @submit.prevent="sendStep()">
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

export default {
  setup() {
    const store = useStore();
    const team = ref("Teste Play");
    function sendStep() {
      store.commit("parameters/addTeam", team.value);
      store.commit("parameters/increaseStep", 1);
    }
    return {
      team,
      sendStep,
    };
  },
};
</script>
