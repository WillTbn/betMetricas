<template>
  <q-step title="Coloque os números do time" icon="add_comment">
    <div class="row items-center" v-for="items in list" :key="items.id">
      <div class="row">
        <label class="col-12 text-bold">{{ items.name }}</label>
        <div class="col-4" v-for="(game, index) in items.jogos" :key="index">
          <label class="text-uppercase">{{ game.name }}</label>
          <q-input
            style="max-width: 80px"
            type="number"
            standout
            dense
            placeholder=""
            class="q-gutter-xs"
            v-model="play[game.name]"
          />
        </div>
      </div>
    </div>

    <q-stepper-navigation>
      <q-btn color="primary" label="continua" @click="onSubmit" />
      <q-btn
        flat
        @click="sendRemovePlay()"
        color="primary"
        label="Back"
        class="q-ml-sm"
      />
    </q-stepper-navigation>
  </q-step>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

const play = ref({});
const store = useStore();
export default defineComponent({
  name: "StepFour",
  props: {
    list: { type: Array, required: true },
    // step: { type: Number, required: true },
  },
  // const listParams = computed(() => store.state.parameters.data);
  setup() {
    const sendRemovePlay = () => {
      store.commit("parameters/sendRemove", []);
      step.value = 3;
    };
  },
});
</script>
