<template>
  <q-layout view="lhh lpR fFr">
    <q-header class="bg-dark text-white">
      <q-toolbar>
        <!-- <q-toolbar-title> -->
        <!-- </q-toolbar-title> -->
        <q-toolbar-title>
          <logo-icons iconsSize="56px" />
        </q-toolbar-title>
        <q-space></q-space>

        <SendauthVue class="q-mr-lg" />

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
import LogoIcons from "components/LogoIcons.vue";

import { useStore } from "vuex";
import SendauthVue from "components/Auth/Sendauth.vue";

const linksList = [
  {
    title: "Cria metricas",
    caption: "",
    icon: "fa-solid fa-table-list",
    link: "/created",
  },
  {
    title: "Estatísticas salvas",
    caption: "",
    icon: "fa-solid fa-floppy-disk",
    link: "/statistics",
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
    LogoIcons,
    SendauthVue,
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
