<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,600,800&display=swap");
* {
  box-sizing: border-box;
}
html {
  width: 100vw;
  height: 100vh;
  margin: 0;
}
body {
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
}
</style>
<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: { Navbar }
};
</script>
