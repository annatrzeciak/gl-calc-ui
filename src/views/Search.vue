<template>
  <div :class="['search-page', { 'has-results': $route.params.searchValue }]">
    <b-container fluid>
      <h1 class="text-center font-weight-bold">Znajdź interesujący Cię produkt</h1>
      <SearchInput
        :value="searchValue"
        @filter="$route.params.searchValue !== $event ? $router.push($event) : null"
        :disabled="loading"
      />
      <div v-if="$route.params.searchValue">
        <Spinner v-if="loading" class="mt-4" />
        <div class="results" v-if="foundProducts && !loading && step === 1">
          <p class="text-right">Znaleziono {{ foundProducts.length }} {{ productsLabel }}</p>
          <b-row>
            <ProductMain
              @scroll-list-to-product="scrollToProduct($event)"
              v-for="product in foundProducts"
              :key="product._id"
              :product="product"
            />
          </b-row>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import axios from "axios";
import SearchInput from "@/components/Utils/SearchInput.vue";
import Spinner from "@/components/Utils/Spinner.vue";
import ProductMain from "@/components/Product/ProductMain.vue";

export default {
  name: "Search",
  components: { SearchInput, Spinner, ProductMain },
  data() {
    return {
      loading: false,
      step: 0,
      searchValue: "",
      foundProducts: []
    };
  },
  computed: {
    productsLabel() {
      if (this.foundProducts.length === 1) {
        return "produkt";
      } else if (1 < this.foundProducts.length && this.foundProducts.length < 5) {
        return "produkty";
      } else {
        return "produktów";
      }
    }
  },
  methods: {
    scrollToProduct(productId) {
      const productComponent = document.getElementById("product-main-info-" + productId);
      const navbar = document.querySelector("nav");

      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: productComponent.offsetTop - navbar.clientHeight
      });
    },
    filterProducts: debounce(function(value) {
      this.loading = true;
      axios
        .get("http://localhost:3000/api/products/search/" + value)
        .then(response => {
          this.loading = false;
          this.foundProducts = response.data.products;
          this.step = 1;
        })
        .catch(e => {
          console.error(e);
        });
    }, 500)
  },
  created() {
    if (this.$route.params.searchValue) {
      this.searchValue = this.$route.params.searchValue;
      this.filterProducts(this.$route.params.searchValue);
    }
  },
  watch: {
    $route() {
      if (this.$route.params.searchValue !== this.searchValue) {
        this.searchValue = this.$route.params.searchValue;
        this.filterProducts(this.$route.params.searchValue);
      }
    }
  }
};
</script>
<style scoped lang="scss">
.search-page {
  margin-top: 20vh;
  padding: 70px 0 0;
  transition: 0.3s ease-in-out;
  &.has-results {
    margin-top: 0;
  }
}

.results {
  padding: 80px;
  width: 100%;
}
</style>
