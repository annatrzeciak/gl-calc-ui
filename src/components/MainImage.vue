<template>
  <div class="background-image"></div>
</template>

<script>
export default {
  name: "MainImage"
};
</script>

<style scoped>
.background-image {
  z-index: -1;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  right: 0;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/images/smoothies.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
