<template>
  <div :class="['search-page', { 'has-results': $route.params.searchValue }]">
    <Calculator
      @remove-product="removeProductFromCalc($event)"
      :calculations="productsToCalculate"
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
import SearchInput from "@/components/Utils/SearchInput.vue";
import Spinner from "@/components/Utils/Spinner.vue";
import ProductMain from "@/components/Product/ProductMain.vue";
import Calculator from "@/components/Calculator/Calculator.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Search",
  components: { SearchInput, Spinner, ProductMain, Calculator },
  data() {
    return {
      loading: false,
      step: 0,
      searchValue: "",
      productsToCalculate: [
        { mealNumber: 1, products: [] },
        { mealNumber: 2, products: [] },
        { mealNumber: 3, products: [] },
        { mealNumber: 4, products: [] },
        { mealNumber: 5, products: [] }
      ],
      calculatorIsOpened: false,
      savingCalculation: false
    };
  },
  computed: {
    ...mapGetters("product", ["foundProducts"]),
    ...mapGetters("auth", ["loggedUserEmail"]),
    ...mapGetters("calculation", ["todayCalculations"]),

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
    ...mapActions("product", ["searchProducts"]),
    ...mapActions("calculation", ["fetchTodayCalculations", "addCalculation"]),

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
      this.searchProducts(value)
        .then(() => {
          this.loading = false;
          this.step = 1;
        })
        .catch(e => {
          console.error(e);
        });
    }, 500),
    addToCalc(product) {
      this.calculatorIsOpened = true;
      const meal = this.productsToCalculate.find(meal => meal.mealNumber === product.mealNumber);
      if (meal) {
        const productInCalc = meal.products.find(prod => prod.product._id == product._id);
        if (productInCalc) {
          productInCalc.count += product.count;
        } else {
          meal.products.push(product);
        }
        this.saveCalculation();
      }
    },
    removeProductFromCalc({ productId, mealNumber }) {
      const meal = this.productsToCalculate.find(meal => meal.mealNumber === mealNumber);

      meal.products = meal.products.filter(product => product._id !== productId);
      this.saveCalculation();
    },
    saveCalculation() {
      this.savingCalculation = true;
      const calculationToSave = {
        date: new Date().toDateString(),
        calculations: this.productsToCalculate.filter(meal => meal.products.length || meal._id)
      };
      this.addCalculation({ email: this.loggedUserEmail, data: calculationToSave })
        .then(() => this.$toasted.success("Kalkulacja zapisna pomyślnie"))
        .catch(() =>
          this.$toasted.error("Wystąpił błąd podczas zapisywania. Spróbuj ponownie później")
        )

    }
  },
  created() {
    if (this.$route.params.searchValue) {
      this.searchValue = this.$route.params.searchValue;
      this.filterProducts(this.$route.params.searchValue);
    }
  },
  async mounted() {
    if (this.loggedUserEmail) await this.fetchTodayCalculations({ email: this.loggedUserEmail });
  },
  watch: {
    $route() {
      if (this.$route.params.searchValue !== this.searchValue) {
        this.searchValue = this.$route.params.searchValue;
        this.filterProducts(this.$route.params.searchValue);
      }
    },
    todayCalculations() {
      if (this.todayCalculations) {
        Object.values(this.todayCalculations).forEach(calcFromDb => {
          let meal = this.productsToCalculate.find(
            meal => meal.mealNumber === calcFromDb.mealNumber
          );
          if (meal) {
            meal.products = calcFromDb.products;
            meal._id = calcFromDb._id;
            meal.date = calcFromDb.date;
            meal.mealNumber = calcFromDb.mealNumber;
            meal.userId = calcFromDb.userId;
          }
        });
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
