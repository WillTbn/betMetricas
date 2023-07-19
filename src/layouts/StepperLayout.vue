<template>
  <q-step
    :name="name"
    :title="title"
    :icon="icon"
    :done="step > name"
    :caption="caption"
  >
    <slot />
  </q-step>
</template>
<script>
export default {
  props: {
    name: { type: Number },
    step: { type: Number },
    title: { type: String },
    icon: { type: String },
    caption: { type: String },
  },
};
</script>
