import { boot } from "quasar/wrappers";
// import axios from "axios";
import googleLogin from "vue3-google-login";
import GoogleSignInPlugin from "vue3-google-signin";

export default boot(({ app }) => {
  app.use(googleLogin, {
    clientId: process.env.GOOGLE_ID,
  });
  app.use(GoogleSignInPlugin, {
    clientId:process.env.GOOGLE_ID
  })
});
