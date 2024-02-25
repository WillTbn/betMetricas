<template>
  <div class="send-auth">
    <!-- class="text-subtitle2 q-mr-lg" -->
    <q-btn-dropdown
      class="glossy"
      label="Login"
      v-if="!auth"
      no-caps
      flat
      outline
      push
    >
      <div class="row no-wrap q-pa-md">
        <q-btn
          label="Login com Google"
          @click.prevent="googleLogin"
          no-caps
          icon="fa-brands fa-google"
        />
        <!-- <google-login :callback="callback" /> -->
      </div>
    </q-btn-dropdown>
    <q-btn-dropdown class="" v-else :label="fullName">
      <div class="column items-center">
        <!-- <q-avatar size="72px">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar> -->

        <div class="text-subtitle1 q-mt-md q-mb-xs">{{ auth.email }}</div>

        <q-btn
          color="primary"
          label="Logout"
          push
          size="sm"
          v-close-popup
          @click.prevent="setLogout"
        />
      </div>
    </q-btn-dropdown>
  </div>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from "vue";
// import { googleTokenLogin } from "vue3-google-login";
// import { google } from "googleapis";
// import axios from "axios";
import { useStore } from "vuex";
import userLogin from "../../composables/Auth/useLogin";
import { mapGetters } from "vuex";
// import { verify } from "crypto";

export default defineComponent({
  name: "SendAuth",
  computed: {
    ...mapGetters("user", ["fullName"]),
  },
  setup() {
    const store = useStore();
    const auth = computed(() => store.state.user.data);

    const { googleLogin, getUserInfo, dataLocal, expireData, setLogout } =
      userLogin();
    const VerifiyUser = () => {
      console.log("-> o verifyUser", dataLocal);
      if (dataLocal) {
        expireData(dataLocal.initial_expires, dataLocal.expire_in)
          ? setLogout()
          : getUserInfo(dataLocal);
      }
    };
    onMounted(() => {
      VerifiyUser();
    });

    return {
      mobileData: ref(false),
      bluetooth: ref(false),
      auth,
      googleLogin,
      setLogout,
      // name: computed(() => store.getters.user.fullName()),
    };
  },
});
</script>
