<template>
  <b-navbar toggleable="lg" :type="isDark ? 'dark' : 'light'" class="text-shadow">
    <b-navbar-brand class="font-weight-bold">
      <router-link to="/">Oblicz GL</router-link>
    </b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <router-link to="/about">o stronie</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isDark: true
    };
  },
  created() {
    document.addEventListener("scroll", () => {
      const headerHeight = document.getElementById("header").offsetHeight;
      if (window.scrollY < headerHeight) {
        this.isDark = true;
      } else {
        this.isDark = false;
      }
      console.log(window.scrollY);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors";
nav {
  position: fixed;
  width: 100%;
  max-width: 100%;
  z-index: 100;
  &.navbar-light a {
    color: #000000;
  }
  &.navbar-dark a {
    color: #ffffff;
  }
  a {
    text-decoration: none !important;
    opacity: 0.7;

    &:hover {
      opacity: 1;
      color: $green;
    }
  }
}
</style>
