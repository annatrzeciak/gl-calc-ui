<template>
  <div :class="['search-page', { 'has-results': $route.params.searchValue }]">
    <Calculator
      @remove-product="removeProductFromCalc"
      :products="productsToCalculate"
      :calculatorIsOpened="calculatorIsOpened"
      @toggle-calculator="calculatorIsOpened = !calculatorIsOpened"
      @close-calculator="calculatorIsOpened = false"
    />
    <b-container fluid>
      <h1 class="text-center font-weight-bold">Znajdź interesujący Cię produkt</h1>
      <SearchInput
        :value="searchValue"
        @filter="
          $route.params.searchValue !== $event
            ? $router.push({ name: 'search-list', params: { searchValue: $event } })
            : null
        "
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
              @add-to-calc="addToCalc"
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
import Calculator from "@/components/Calculator/Calculator.vue";

export default {
  name: "Search",
  components: { SearchInput, Spinner, ProductMain, Calculator },
  data() {
    return {
      loading: false,
      step: 0,
      searchValue: "",
      foundProducts: [],
      productsToCalculate: [],
      calculatorIsOpened: false
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
        .get(`http://${process.env.VUE_APP_API_HOST}:3000/api/products/search/` + value)
        .then(response => {
          this.loading = false;
          this.foundProducts = response.data.products;
          this.step = 1;
        })
        .catch(e => {
          console.error(e);
        });
    }, 500),
    addToCalc(product) {
      this.calculatorIsOpened = true;
      const productInCalc = this.productsToCalculate.find(
        productInCalc => productInCalc.id == product.id
      );
      if (productInCalc) {
        productInCalc.count += product.count;
      } else {
        this.productsToCalculate.push(product);
      }
    },
    removeProductFromCalc(productId) {
      this.productsToCalculate = this.productsToCalculate.filter(
        product => product.id !== productId
      );
    }
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
