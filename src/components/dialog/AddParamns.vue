<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Qual nome do novo Paramentro?</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input dense v-model="NewParamns" autofocus />
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Add address" @click="isUpdateParamns" />
    </q-card-actions>
  </q-card>
</template>
<script>
import { useRoute } from "vue-router";
import UseCookie from "../../composables/cookie/UseCookie";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AddParamns",
  setup() {
    const NewParamns = ref();
    const { setUpdateParamns } = UseCookie();
    const route = useRoute();
    const isUpdateParamns = async () => {
      try {
        await setUpdateParamns(NewParamns.value);
      } catch (e) {
        console.log(e);
      } finally {
        route.realod();
      }
    };
    return {
      NewParamns,
    };
  },
});
</script>
