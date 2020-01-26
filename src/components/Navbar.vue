<template>
  <nav>
    <h3>
      <router-link class="brand-logo" to="/">GI</router-link>
    </h3>
    <div class="nav-content">
      <router-link to="/about">o stronie</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none !important;
    color: white;
    opacity: .7;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
