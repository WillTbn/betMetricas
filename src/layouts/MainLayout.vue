<template>
  <q-layout view="lhh lpR fFr">
    <q-header class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title>
          <LogoComponent sizeClass="font-awe size-font-9" />
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <q-list>
        <q-item-label header></q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { computed, defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import LogoComponent from "components/LogoComponent.vue";
import { useStore } from "vuex";

const linksList = [
  {
    title: "Cria metricas",
    caption: "created",
    icon: "fa-solid fa-table-list",
    link: "/#/created",
  },
  {
    title: "Estatísticas salvas",
    caption: "",
    icon: "fa-solid fa-floppy-disk",
    link: "/#/statistics",
  },
  //   {
  //     title: "Times API",
  //     caption: "",
  //     icon: "table_view",
  //     link: "/#/teams",
  //   },
];
export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    LogoComponent,
  },

  setup() {
    const store = useStore();
    const rightDrawerOpen = ref(false);

    // const cookie = computed(() => store.getters["essencial/statusCookie"]);
    const cookie = computed(() => store.state.essencial.terms);

    return {
      essentialLinks: linksList,
      rightDrawerOpen,
      cookie,

      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>
