<template>
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand class="font-weight-bold">
      <router-link to="/">Oblicz GL</router-link>
    </b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <router-link to="/szukaj">szukaj</router-link>
        <router-link to="/wiecej">o stronie</router-link>
        <router-link to="/zaloguj" v-if="!isLogged">zaloguj</router-link>
        <b-nav-item-dropdown right v-if="isLogged" text="konto">
          <router-link tag="b-dropdown-item" :to="{ name: 'account' }">{{
            loggedUserEmail ? loggedUserEmail : "konto"
          }}</router-link>
          <router-link tag="b-dropdown-item" :to="{ name: 'subscriptions' }"
            >subskrypcje</router-link
          >
          <router-link tag="b-dropdown-item" :to="{ name: 'calculations' }">kalkulacje</router-link>
          <router-link tag="b-dropdown-item" :to="{ name: 'shop' }">sklep</router-link>
          <b-dropdown-item @click="logoutUser">wyloguj</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  props: { dark: { type: Boolean } },
  data() {
    return {
      isDark: true
    };
  },
  computed: {
    ...mapGetters("auth", ["isLogged", "loggedUserEmail"])
  },
  methods: {
    ...mapActions("auth", ["logoutUser"])
  }
};
</script>

<style lang="scss">
@import "../styles/colors";
nav {
  top: 0;
  position: fixed !important;
  width: 100%;
  max-width: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  &.navbar-light a {
    color: #000000;
  }
  &.navbar-dark a {
    color: $white;
    font-weight: 600;
  }
  .navbar-brand a {
    font-weight: 800;
  }
  a:not(.dropdown-item) {
    text-decoration: none !important;
    border-bottom: 2px solid transparent;
    padding: 3px 5px;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

    &:hover,
    &.router-link-active {
      opacity: 1;
      border-bottom: 2px solid $darkBlue;
    }
  }
  .b-nav-dropdown {
    & > a.dropdown-toggle {
      padding: 3px 5px;
      font-weight: 600;
      color: white !important;
    }
    & a.dropdown-item {
      color: rgba(0, 0, 0, 0.5);
      text-align: right;
      font-size: 14px;
      &:hover,
      &.router-link-active {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
}
</style>
