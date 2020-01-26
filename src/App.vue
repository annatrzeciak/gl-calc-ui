<template>
  <div id="app">
    <nav>
      <h3>
        <router-link class="brand-logo" to="/">GI</router-link>
      </h3>
      <div class="nav-content">
        <router-link to="/about">o stronie</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap");
html{
  width: 100vw;
  height: 100vh;
  margin: 0;
}
body {
  font-family: "Montserrat", sans-serif;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none !important;

    &:hover {
    }
  }
}
</style>
