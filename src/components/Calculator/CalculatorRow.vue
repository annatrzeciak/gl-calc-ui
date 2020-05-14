<template>
  <tr class="calculator-item">
    <td class="text-right">{{ product.count }}g</td>
    <td>{{ product.main.name_pl.substr(0, 20) }}...</td>
    <td class="text-right">
      {{ availableCarbs }}
    </td>
    <td class="text-right">{{ product.details.gi.val }}</td>
    <td class="text-right">{{ glycemicLoad }}</td>
    <td class="text-right">{{ kcal }}</td>
    <td><i @click="$emit('remove-product')" class="icon icon-delete" /></td>
  </tr>
</template>

<script>
export default {
  name: "CalculatorRow",
  props: { product: { type: Object } },
  computed: {
    availableCarbs() {
      return (
        Math.round(
          Math.abs(this.product.details.carbohydrate.val - this.product.details.fibre.val) *
            this.product.count
        ) / 100
      );
    },
    glycemicLoad() {
      return (
        Math.round(
          (this.product.details.gi.val *
            Math.abs(this.product.details.carbohydrate.val - this.product.details.fibre.val) *
            this.product.count) /
            100
        ) / 100
      );
    },
    kcal() {
      return (
        Math.round(
          (this.product.details.energyKcal
            ? this.product.details.energyKcal.val
            : this.product.details.energyKj.val / 4.1858) * this.product.count
        ) / 100
      );
    }
  }
};
</script>

<style scoped lang="scss">
i.icon {
  bottom: 2px;
}
</style>
