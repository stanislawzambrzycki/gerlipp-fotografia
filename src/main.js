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

Vue.use(MagicGrid);
document.title = "Piotr Gerlipp Photography"



Vue.config.productionTip = false;

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
    console.log('main.js', this.$store.getters.user)
    if (!this.$store.getters.loginPending)
      if (!this.$store.getters.user)
        firebase.auth().signInAnonymously().then(result => {
          this.$store.dispatch('login', result.user).then(user => {
            console.log('main.js anno', user)
          });
        })
  }
}).$mount("#app");
