<template>
  <div id="app">
    <nav>
      <md-toolbar class="md-accent" md-elevation="0">
        <h3 class="md-title" style="flex: 1">
          <router-link class="brand-logo" to="/">wyszukiwarka</router-link>
        </h3>
        <md-button> <router-link class="m" to="/about">o stronie</router-link> </md-button>
      </md-toolbar>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
nav a:hover {
  text-decoration: none !important;
}
</style>
