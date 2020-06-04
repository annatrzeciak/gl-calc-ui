<template>
  <tr class="font-weight-bold">
    <td colspan="4" class="text-right">Razem</td>
    <td class="text-right">{{ glycemicLoad }}</td>
    <td class="text-right">{{ kcal }}</td>
  </tr>
</template>

<script>
export default {
  name: "CalculatorResult",
  props: {
    calculations: { type: Array }
  },
  computed: {
    kcal() {
      let sum = 0;
      this.calculations.forEach(calcItem => {
        sum +=
          Math.round(
            ((calcItem.product.details.energyKcal
              ? calcItem.product.details.energyKcal.val
              : calcItem.product.details.energyKj.val / 4.1858) *
              calcItem.count) /
              10
          ) / 10;
      });
      return sum;
    },
    glycemicLoad() {
      let sum = 0;
      this.calculations.forEach(calcItem => {
        sum +=
          (calcItem.product.details.gi.val *
            Math.abs(calcItem.product.details.carbohydrate.val - calcItem.product.details.fibre.val) *
            calcItem.count) /
          10000;
      });
      return Math.round(sum * 100) / 100;
    }
  }
};
</script>

<style scoped lang="scss"></style>
