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
    products: { type: Array }
  },
  computed: {
    kcal() {
      let sum = 0;
      this.products.forEach(product => {
        sum +=
          Math.round(
            ((product.details.energyKcal
              ? product.details.energyKcal.val
              : product.details.energyKj.val / 4.1858) *
              product.count) /
              10
          ) / 10;
      });
      return sum;
    },
    glycemicLoad() {
      let sum = 0;
      this.products.forEach(product => {
        sum +=
          (product.details.gi.val *
            Math.abs(product.details.carbohydrate.val - product.details.fibre.val) *
            product.count) /
          10000;
      });
      return Math.round(sum * 100) / 100;
    }
  }
};
</script>

<style scoped lang="scss"></style>
