import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import product from "./modules/product";
import calculation from "./modules/calculation";
import subscription from "./modules/subscription";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    product,
    calculation,
    subscription
  }
});
