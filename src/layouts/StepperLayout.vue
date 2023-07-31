<template>
  <q-step
    class="col-1 col-md-2 col-sm-1"
    :name="name"
    :title="title"
    :icon="icon"
    :done="step > name"
    :caption="caption"
    :header-nav="step > name"
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
