<template>
  <a href="/" class="brand">
    <h4 :class="sizeClass">
      Metricas
      <i class="fas fa-basketball" style="font-size: small"></i>
      <i class="fas fa-baseball" style="font-size: small"></i>
      <i class="fas fa-futbol" style="font-size: small"></i>...
    </h4>
  </a>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LogoComponent",
  props: {
    sizeClass: {
      type: String,
      default: "font-awe text-weight-bolder text-h3",
    },
  },
});
</script>
