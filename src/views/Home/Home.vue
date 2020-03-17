<template>
  <div class="home-page">
    <Header @scroll-to-more="scrollToMore" />
    <MoreInfo />
    <SearchInput :value="searchValue" @filter="filterProducts" :dark="step === 1" />

    <div class="results" v-if="filteredProducts && !loading && step === 1">
      <!--      <p>Znaleziono {{filteredProducts.length}} produktów</p>-->
      <b-row>
        <ProductMain v-for="product in filteredProducts" :key="product._id" :product="product" />
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash.debounce";
import Header from "@/views/Home/Header.vue";
import SearchInput from "@/components/SearchInput.vue";
import ProductMain from "@/components/Product/ProductMain.vue";
import MoreInfo from "@/views/Home/MoreInfo.vue";

export default {
  name: "Home",
  components: { MoreInfo, ProductMain, SearchInput, Header },
  data() {
    return {
      loading: false,
      step: 0,
      searchValue: "",
      filteredProducts: []
    };
  },
  methods: {
    scrollToMore() {
      const headerHeight = document.getElementById("header").offsetHeight;
      const navHeight = document.querySelector("nav").offsetHeight;
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: headerHeight - navHeight
      });
      console.log(headerHeight);
    },
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
    }, 500)
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
