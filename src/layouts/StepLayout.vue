<template>
  <q-step :name="name" :title="title" :icon="icon" :done="step > name">
    <slot />
  </q-step>
</template>
<script>
defineComponent({
  props: {
    name: { type: Number },
    step: { type: Number },
    title: { type: String },
    icon: { type: String },
  },
});
</script>
