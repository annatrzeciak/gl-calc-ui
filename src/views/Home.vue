<template>
  <div class="home-page">
    <Header @scroll-to-more="scrollToMore" />
    <MoreInfo />
  </div>
</template>

<script>
import Header from "@/views/Home/Header.vue";
import MoreInfo from "@/views/Home/MoreInfo.vue";

export default {
  name: "Home",
  components: { MoreInfo, Header },

  methods: {
    scrollToMore() {
      const headerHeight = document.getElementById("header").offsetHeight;
      const navHeight = document.querySelector("nav").offsetHeight;
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: headerHeight - navHeight
      });
    }
  }
};
</script>
<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  max-width: 100%;
  margin: 0;
  position: relative;

  &.flex-start {
    justify-content: flex-start;
  }
}

.logo {
  font-weight: 800;
  color: black;
  font-size: 26px;
  position: absolute;
  top: 25px;
}

.results {
  padding-top: 80px;
  width: 100%;
}
</style>
