<template>
  <div
    id="calculator"
    v-click-outside="{
      exclude: ['calculator'],
      handler: 'closeCalc'
    }"
    :class="['calculator', { opened: calculatorIsOpened }]"
  >
    <h3 @click="$emit('toggle-calculator')">Kalkulator</h3>
    <div class="calculator-content">
      <div v-if="calculationsIncludesProducts">
        <h4>Dodane produkty</h4>
        <div v-if="firstMeal && firstMeal.products.length">
          <h5>Śniadanie</h5>
          <CalculatorTable
            :calculations="firstMeal.products"
            @remove-product="$emit('remove-product', { productId: $event, mealNumber: 1 })"
          />
        </div>
        <div v-if="secondMeal && secondMeal.products.length">
          <h5>II Śniadanie</h5>
          <CalculatorTable
            :calculations="secondMeal.products"
            @remove-product="$emit('remove-product', { productId: $event, mealNumber: 2 })"
          />
        </div>
        <div v-if="thirdMeal && thirdMeal.products.length">
          <h5>Obiad</h5>
          <CalculatorTable
            :calculations="thirdMeal.products"
            @remove-product="$emit('remove-product', { productId: $event, mealNumber: 3 })"
          />
        </div>
        <div v-if="fourthMeal.products.length">
          <h5>Podwieczorek</h5>
          <CalculatorTable
            :calculations="fourthMeal.products"
            @remove-product="$emit('remove-product', { productId: $event, mealNumber: 4 })"
          />
        </div>
        <div v-if="fifthMeal && fifthMeal.products.length">
          <h5>Kolacja</h5>
          <CalculatorTable
            :calculations="fifthMeal.products"
            @remove-product="$emit('remove-product', { productId: $event, mealNumber: 5 })"
          />
        </div>
        <button @click.stop="saveCalculation" class="btn btn-blue no-shadow border-1">
          Zapisz
        </button>
      </div>
      <div v-else>Dodaj produkty do kalkulatora</div>
    </div>
  </div>
</template>

<script>
import CalculatorTable from "./CalculatorTable";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Calculator",
  components: { CalculatorTable },
  props: {
    calculations: { type: Array },
    calculatorIsOpened: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters("auth", ["loggedUserEmail"]),
    calculationsIncludesProducts() {
      if (this.calculations) {
        return Object.values(this.calculations).find(calc => calc.products.length);
      }
      return false;
    },
    firstMeal() {
      if (this.calculations) return this.calculations.find(calc => calc.mealNumber === 1);

      return null;
    },
    secondMeal() {
      if (this.calculations) return this.calculations.find(calc => calc.mealNumber === 2);

      return null;
    },
    thirdMeal() {
      if (this.calculations) return this.calculations.find(calc => calc.mealNumber === 3);

      return null;
    },
    fourthMeal() {
      if (this.calculations) return this.calculations.find(calc => calc.mealNumber === 4);

      return null;
    },
    fifthMeal() {
      if (this.calculations) return this.calculations.find(calc => calc.mealNumber === 5);

      return null;
    }
  },
  methods: {
    ...mapActions("calculation", ["addCalculation"]),
    closeCalc() {
      if (this.calculatorIsOpened) this.$emit("close-calculator");
    },
    saveCalculation() {
      const calculationToSave = {
        date: new Date().toDateString(),
        calculations: this.calculations.filter(meal => meal.products.length)
      };
      this.addCalculation({ email: this.loggedUserEmail, data: calculationToSave })
        .then(() => this.$toasted.success("Kalkulacja zapisna pomyślnie"))
        .catch(() =>
          this.$toasted.error("Wystąpił błąd podczas zapisywania. Spróbuj ponownie później")
        );
    }
  }
};
</script>

<style lang="scss">
@import "./../../styles/colors";
.calculator {
  position: fixed;
  top: 100px;
  right: 0;
  min-height: 200px;
  transform: translateX(100%);
  transition: 0.3s ease-out;
  z-index: 1;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
  background: white;
  &.opened {
    transform: translateX(0%);
  }
  h3 {
    padding: 10px;
    background: white;
    position: absolute;
    color: $blue;
    top: 138px;
    font-weight: bold;
    font-size: 26px;
    transform: rotateZ(-90deg) translate(0px, -25px);
    transform-origin: left;
    cursor: pointer;
  }
  .calculator-content {
    padding: 10px;
  }
  td {
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>
