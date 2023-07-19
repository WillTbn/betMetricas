<template>
  <div class="">
    <p>
      Aqui adicione quantas e quais metricas quiser, lembresse isso será usado
      para seleciona os dados.
    </p>

    <div class="" v-for="item in listParams" :key="item.id">
      <q-chip color="dark" text-color="white">
        <q-icon round name="closed" @click="removeParams()" />
        {{ item.name }}
      </q-chip>
    </div>
    <q-form class="row justify-center" @submit.prevent="addParams()">
      <q-input
        class="col-4"
        standout
        dense
        placeholder="Ex: total de chute, chute a gol, arremessos de 3 "
        v-model="params"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Campo vazio, digite o nome do parametro',
        ]"
      />
      <div class="col-4">
        <q-btn round type="submit" color="black" class="q-ml-sm">
          <q-icon name="arrow_forward" />
        </q-btn>
      </div>
    </q-form>
    <q-stepper-navigation>
      <q-btn @click="increase()" color="primary" label="Continue" />
      <q-btn
        flat
        @click="toDecrease()"
        color="primary"
        label="Back"
        class="q-ml-sm"
      />
    </q-stepper-navigation>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import useNotify from "../../composables/demo/UseNotify";

export default {
  setup() {
    const { errorNotify } = useNotify();
    const params = ref();
    const store = useStore();
    // const $q = useQuasar();
    const listParams = computed(() => store.state.parameters.data);
    function toDecrease() {
      store.commit("parameters/toDecreaseStep", 1);
    }
    function increase() {
      console.log(listParams.value.length);
      if (listParams.value.length <= 0) {
        params.value = 1;
        errorNotify("Ops, esqueceu de passa os parametros.");
        params.value = "";
      } else {
        store.commit("parameters/increaseStep", 1);
      }
    }
    function removeParams(item) {
      store.commit("parameters/removeName", item);
    }
    function addParams() {
      store.commit("parameters/addName", params.value);
    }

    return {
      params,
      addParams,

      listParams,
      toDecrease,
      increase,
      removeParams,
    };
  },
};
</script>
