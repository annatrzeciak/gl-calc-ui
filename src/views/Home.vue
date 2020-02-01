<template>
  <div :class="[{ 'flex-start': step === 1 }, 'wrapper']">
    <transition name="slide">
      <span class="logo" v-if="step === 1">Kalkulator ładunku glikochemicznego</span>
    </transition>
    <transition name="fade">
      <MainImage v-if="step === 0" />
    </transition>
    <transition name="fade">
      <MainInfo v-if="step === 0" />
    </transition>
    <SearchInput :value="searchValue" @filter="filterProducts" :dark="step === 1" />
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash.debounce";
import MainInfo from "@/components/MainInfo.vue";
import SearchInput from "@/components/SearchInput.vue";
import MainImage from "@/components/MainImage.vue";

export default {
  name: "Home",
  components: { MainImage, SearchInput, MainInfo },
  data() {
    return {
      loading: false,
      step: 0,
      searchValue: "",
      filteredProducts: []
    };
  },
  methods: {
    filterProducts: debounce(function(value) {
      this.loading = true;
      axios
        .get("http://localhost:3000/api/products/search/" + value)
        .then(response => {
          this.loading = false;
          this.filteredProducts = response.data.products;
          this.step = 1;
        })
        .catch(e => {
          console.error(e);
        });
      this.isFiltering = false;
    }, 500)
  }
};
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: margin-top 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  margin-top: -40px;
}
.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 30px;
  color: white;
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
</style>
