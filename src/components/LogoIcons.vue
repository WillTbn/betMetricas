<template>
  <a href="/" class="brand">
    <q-item to="/" exact dense clickable manual-focus>
      <q-item-section side>
        <q-avatar :size="iconsSize">
          <img src="icons/metricas.png" />
        </q-avatar>
      </q-item-section>
    </q-item>
  </a>
</template>
<script>
// import SvgLogo from "./svgs/SvgLogo.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LogoIcons",
  props: {
    iconsSize: { type: String, default: "146px" },
  },
});
</script>
