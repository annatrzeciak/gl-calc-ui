<template>
  <div :class="['search-page', { 'has-results': filteredProducts.length }]">
    <b-container fluid>
      <h1 class="text-center font-weight-bold">Znajdź interesujący Cię produkt</h1>
      <SearchInput
        v-if="!loading"
        :value="searchValue"
        @filter="filterProducts"
        :disabled="loading"
      />

      <Spinner v-if="loading" class="mt-4" />
      <div class="results" v-if="filteredProducts && !loading && step === 1">
        <p class="text-right">Znaleziono {{ filteredProducts.length }} {{ productsLabel }}</p>
        <b-row>
          <ProductMain v-for="product in filteredProducts" :key="product._id" :product="product" />
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash.debounce";
import SearchInput from "@/components/SearchInput.vue";
import ProductMain from "@/components/Product/ProductMain.vue";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "Search",
  components: { Spinner, ProductMain, SearchInput },
  data() {
    return {
      loading: false,
      step: 0,
      searchValue: "",
      filteredProducts: []
    };
  },
  computed: {
    productsLabel() {
      if (this.filteredProducts.length === 1) {
        return "produkt";
      } else if (1 < this.filteredProducts.length && this.filteredProducts.length < 5) {
        return "produkty";
      } else {
        return "produktów";
      }
    }
  },
  methods: {
    scrollToMore() {
      const headerHeight = document.getElementById("header").offsetHeight;
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: headerHeight
      });
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
.search-page {
  margin-top: 20vh;
  padding: 70px 0 0;
  transition: 0.3s ease-in-out;
  /*max-width: 100%;*/
  /*margin: 0;*/
  /*position: relative;*/
  &.has-results {
    margin-top: 0;
  }
}

.results {
  padding: 80px;
  width: 100%;
}
</style>
