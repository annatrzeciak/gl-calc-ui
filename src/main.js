import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "slick-carousel/slick/slick.css";

import "./styles/main.scss";
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vuelidate from "vuelidate";
import Toasted from "vue-toasted";

import App from "./App.vue";
import ClickOutside from "@/directives/ClickOutside";
import store from "./store/store";

import router from "./router";

Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Toasted, {
  theme: "toasted-primary",
  position: "bottom-right",
  duration: 5000,
  keepOnHover: true,
  iconPack: "fontawesome"
});
Vue.config.productionTip = false;
Vue.directive("click-outside", ClickOutside);

new Vue({
  router,
  store,
  render(h) {
    return h(App);
  }
}).$mount("#app");
