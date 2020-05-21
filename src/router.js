import Vue from "vue";
import VueRouter from "vue-router";

import auth from "@/middleware/auth";
import noAuth from "@/middleware/noAuth";

import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Search from "@/views/Search.vue";
import Login from "@/views/Login.vue";
import Account from "@/views/Account.vue";
import NewAccount from "./views/NewAccount";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/wiecej",
    name: "about",
    component: About
  },
  {
    path: "/szukaj",
    name: "search",
    component: Search,

    children: [
      {
        path: ":searchValue",
        name: "search-list",
        children: [
          {
            path: ":productId",
            name: "product-id"
          }
        ]
      }
    ]
  },
  {
    path: "/zaloguj",
    name: "login",
    component: Login,
    beforeEnter: noAuth
  },
  {
    path: "/rejestracja",
    name: "new-account",
    component: NewAccount,
    beforeEnter: noAuth
  },
  {
    path: "/konto",
    name: "account",
    component: Account,
    beforeEnter: auth
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
