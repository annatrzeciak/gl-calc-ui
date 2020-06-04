<template>
  <table :class="['table-' + size]">
    <thead>
      <tr class="font-weight-bold text-center">
        <td class="text-right">Ilość</td>
        <td class="text-left">Nazwa</td>
        <td class="text-right">Węglowodany<br />przyswajalne</td>
        <td class="text-right">IG</td>
        <td class="text-right">ŁG</td>
        <td class="text-right">Kcal</td>
        <td></td>
      </tr>
    </thead>
    <tbody>
      <CalculatorRow
        @remove-product="$emit('remove-product', calcItem.id)"
        v-for="calcItem of calculations"
        :key="calcItem.id"
        :product="calcItem.product"
        :count="calcItem.count"
        :deleteIsPossible="deleteIsPossible"
        :size="size"
      />
      <CalculatorResult :calculations="calculations" />
    </tbody>
  </table>
</template>

<script>
import CalculatorRow from "@/components/Calculator/CalculatorRow.vue";
import CalculatorResult from "@/components/Calculator/CalculatorResult.vue";

export default {
  name: "CalculatorTable",
  components: { CalculatorRow, CalculatorResult },
  props: {
    calculations: { type: Array, default: () => [] },
    deleteIsPossible: { type: Boolean, default: true, required: false },
    size: { type: String, default: "narrow", required: false }
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

  .calculator-content {
    padding: 10px;
  }
  td {
    padding-right: 5px;
    padding-left: 5px;
  }
}
.table-wide {
  width: 100%;
  td {
    padding: 5px 10px;
  }
}
</style>
