<template>
  <b-navbar toggleable="lg" type="dark" class="text-shadow">
    <b-navbar-brand class="font-weight-bold">
      <router-link to="/">Oblicz GL</router-link>
    </b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <router-link to="/szukaj">szukaj</router-link>
        <router-link to="/wiecej">o stronie</router-link>
        <router-link to="/zaloguj" v-if="!isLogged">zaloguj</router-link>
        <router-link to="/konto" v-if="isLogged">konto</router-link>
        <a v-if="isLogged" @click="logoutUser">wyloguj</a>
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
    ...mapGetters("auth", ["isLogged"])
  },
  methods: {
    ...mapActions("auth", ["logoutUser"])
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors";
nav {
  top: 0;
  position: fixed;
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
  a {
    text-decoration: none !important;
    border-bottom: 2px solid transparent;
    padding: 3px 5px;

    &:hover,
    &.router-link-active {
      opacity: 1;
      border-bottom: 2px solid $darkBlue;
    }
  }
}
</style>
