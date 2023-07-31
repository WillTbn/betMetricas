<template>
  <div class="q-pa-md q-gutter-md">
    <q-badge color="blue"> {{ name }} </q-badge>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BadgeTeams",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>
