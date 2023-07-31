<template>
  <div class="">
    <div class="row justify-center text-center">
      <p class="col-12 text-weight-medium">
        Aqui adicione quantas e quais metricas quiser, isso será usado para
        nomear os dados.
      </p>
    </div>
    <div class="row">
      <div class="col-2" v-for="item in listParams" :key="item.id">
        <q-chip color="dark" text-color="white">
          <q-icon round name="closed" @click="removeParams()" />
          {{ item.name }}
        </q-chip>
      </div>
    </div>

    <q-form
      class="column items-center justify-center q-my-lg"
      @submit.prevent="addParams()"
    >
      <q-input
        class="col-4 col-md-6 col-sm-12 q-glutter-sm"
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
      <q-btn label="adicionar" type="submit" color="black" class="q-ml-sm">
        <q-icon name="arrow_forward" />
      </q-btn>
      <!-- <q-btn
        type="submit"
        dense
        color="primary"
        label="adicionar"
        class="col-4 col-md-2 col-sm-2"
      >
        <q-icon name="arrow_forward" />
      </q-btn> -->
    </q-form>

    <div class="row justify-around">
      <q-btn
        @click="increase()"
        color="primary"
        label="Continue"
        class="col-4 col-md-2"
      />
      <q-btn
        flat
        @click="toDecrease()"
        color="primary"
        label="Back"
        class="col-4 col-md-2 q-ml-sm"
      />
    </div>
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
      if (
        listParams.value.length > 0 &&
        listParams.value.filter((e) => e.name == params.value).length > 0
      ) {
        errorNotify("Nome de metrica já adicionado.");
      } else {
        store.commit("parameters/addName", params.value);
      }
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
