import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import MagicGrid from "vue-magic-grid";
import store from "./store";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { config } from "./config/firebaseConfig";

Vue.use(MagicGrid);



Vue.config.productionTip = false;

new Vue({
  vuetify, store,
  render: (h) => h(App),  
  beforeMount() {
    firebase.initializeApp(config);
    firebase.auth().signInAnonymously()
  .then(() => {
    // Signed in..
  })
  // .catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // ...
  // })
  }
}).$mount("#app");
