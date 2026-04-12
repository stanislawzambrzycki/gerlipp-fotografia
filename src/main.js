import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import MagicGrid from "vue-magic-grid";
import store from "./store";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { config } from "./config/firebaseConfig";
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css'

Vue.use(MagicGrid);
Vue.use(VueCroppie);
document.title = "Piotr Gerlipp Photography"



Vue.config.productionTip = false;

function isValidAuthUser(user) {
  return Boolean(
    user &&
    typeof user === "object" &&
    (
      typeof user.uid === "string" ||
      typeof user.email === "string" ||
      typeof user.isAnonymous === "boolean"
    )
  );
}

function isAdminRoute(router) {
  let path = typeof window !== "undefined" ? window.location.pathname : ""
  if (typeof path === "string" && path.indexOf("/admin") === 0) return true

  let currentRoute = router && router.currentRoute
  return Boolean(currentRoute && typeof currentRoute.path === "string" && currentRoute.path.indexOf("/admin") === 0)
}

new Vue({
  icons: {
    iconfont: 'md',
  },
  vuetify,
  store,
  render: (h) => h(App),
  router,
  beforeMount() {
    firebase.initializeApp(config);
    let persistedUser = this.$store.state.user

    if (persistedUser && !isValidAuthUser(persistedUser)) {
      this.$store.dispatch('logout')
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('login', user)
        if (!user.isAnonymous) {
          this.$store.dispatch('loginPending', false)
        }
        return
      }

      this.$store.dispatch('logout')
      if (isAdminRoute(this.$router)) {
        return
      }

      if (!this.$store.getters.loginPending) {
        firebase.auth().signInAnonymously().then(result => {
          this.$store.dispatch('login', result.user)
        }).catch(error => {
          console.error('Anonymous sign-in failed', error)
        })
      }
    })
  }
}).$mount("#app");
