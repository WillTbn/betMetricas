<template>
  <q-circular-progress
    show-value
    font-size="12px"
    :value="mediaSize.porc"
    size="60px"
    :thickness="0.25"
    :color="colorCircular"
    track-color="grey-3"
    class="q-ma-md"
    :class="{ 'text-red': mediaSize.porc > 75 }"
  >
    {{ mediaSize.porc }}%
    <q-tooltip
      anchor="top left"
      self="top right"
      class="text-widt shadow-4"
      :class="bgNotice"
    >
      <i class="fa-solid fa-circle-exclamation"></i>
      Total de armazenamento local utilizado
    </q-tooltip>
  </q-circular-progress>
  <!-- <q-circular-progress
    show-value
    font-size="16px"
    class="text-red q-ma-md"
    :value="mediaSize.mb"
    size="60px"
    :thickness="0.05"
    color="red"
    track-color="grey-3"
  >
    <q-icon name="volume_up" class="q-mr-xs" />
    {{ mediaSize.porc }}
  </q-circular-progress> -->
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import useMetricas from "../composables/demo/UseMetricas";

export default defineComponent({
  name: "SizeLocal",
  setup() {
    const { sizeLocalStorage } = useMetricas();
    const kbbb = ref();
    const bgNotice = ref("bg-positive");
    const colorCircular = ref("positive");
    const mediaSize = ref({
      kb: 0,
      mb: 0,
      porc: 0,
    });

    const getSize = async () => {
      try {
        mediaSize.value.kb = await sizeLocalStorage("kb");
        mediaSize.value.mb = await sizeLocalStorage("mb");
        mediaSize.value.porc = await sizeLocalStorage("porc");
        if (mediaSize.value.porc > 75) {
          colorCircular.value = "red";
          bgNotice.value = "bg-red";
        }
      } catch (e) {
        console.log(e);
      } finally {
        console.log("terminiou de pergar o size");
      }
    };

    onMounted(() => {
      getSize();
    });

    return {
      kbbb,
      colorCircular,
      bgNotice,
      mediaSize,
    };
  },
});
</script>
