import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import MagicGrid from "vue-magic-grid";
import store from "./store";
//import { config } from "./config/firebaseConfig";

Vue.use(MagicGrid);

Vue.config.productionTip = false;

new Vue({
  vuetify, store,
  render: (h) => h(App),
}).$mount("#app");
