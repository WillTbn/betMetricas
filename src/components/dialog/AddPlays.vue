<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Your address</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input dense v-model="quantity" autofocus />
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Add address" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AddPlays",
  setup() {
    const quantity = ref();
    return {
      quantity,
    };
  },
});
</script>
