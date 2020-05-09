<template>
  <b-navbar toggleable="lg" type="dark" class="text-shadow">
    <b-navbar-brand class="font-weight-bold">
      <router-link to="/">Oblicz GL</router-link>
    </b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <router-link to="/szukaj">szukaj</router-link>
        <router-link to="/wiecej">o stronie</router-link>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  props: { dark: { type: Boolean } },
  data() {
    return {
      isDark: true
    };
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


    &:hover {
      opacity: 1;
      border-bottom: 2px solid $darkBlue;
    }
  }
}
</style>
