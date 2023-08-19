<template>
  <q-card style="min-width: 350px">
    {{ team }}
    <q-card-section>
      <div class="text-h6">Qual nome do novo Paramentro?</div>
    </q-card-section>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="NewParamns"
          autofocus
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn class="q-my-md" label="Update" color="positive" type="submit" />
        <!-- <q-btn flat label="Add address" @click="isUpdateParamns" /> -->
      </q-card-actions>
    </q-form>
  </q-card>
</template>
<script>
import { useRouter, useRoute } from "vue-router";
import UseCookie from "../../composables/cookie/UseCookie";
import { computed, defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ParamnsUpdate",
  setup() {
    const $q = useQuasar();
    const NewParamns = ref();
    const { setUpdateParamns, setDelete } = UseCookie();
    const router = useRouter();
    const route = useRoute();
    const isTeam = computed(() => route.params.key);

    const handleSubmit = async () => {
      $q.loading.show();
      try {
        await setUpdateParamns(NewParamns.value, isTeam.value);
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          $q.loading.hide();
          router.go({ path: `${isTeam.value}/statistics` });
        }, 2000);
      }
    };
    return {
      NewParamns,
      handleSubmit,
    };
  },
});
</script>
