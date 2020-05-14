<template>
  <div :class="['calculator', { opened: calculatorIsOpened }]">
    <h3 @click="$emit('toggle-calculator')">Kalkulator</h3>
    <div class="calculator-content">
      <div v-if="products.length">
        <h4>Dodane produkty</h4>
        <table>
          <thead>
            <tr class="font-weight-bold text-center">
              <td>Ilość</td>
              <td>Nazwa</td>
              <td>Węglowodany<br />przyswajalne</td>
              <td>IG</td>
              <td>ŁG</td>
              <td>Kcal</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <CalculatorRow
              @remove-product="$emit('remove-product', product.id)"
              v-for="product of products"
              :key="product.main._id"
              :product="product"
            />
            <CalculatorResult :products="products" />
          </tbody>
        </table>
      </div>
      <div v-else>Dodaj produkty do kalkulatora</div>
    </div>
  </div>
</template>

<script>
import CalculatorRow from "@/components/Calculator/CalculatorRow.vue";
import CalculatorResult from "@/components/Calculator/CalculatorResult.vue";

export default {
  name: "Calculator",
  components: { CalculatorRow, CalculatorResult },
  props: {
    products: { type: Array, default: () => [] },
    calculatorIsOpened: { type: Boolean, default: false }
  },

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
