<template>
  <tr class="calculator-item">
    <td class="text-right">{{ count }}g</td>
    <td>{{ size === "narrow" ? product.name_pl.substr(0, 20) + "..." : product.name_pl }}</td>
    <td class="text-right">
      {{ availableCarbs }}
    </td>
    <td class="text-right">{{ product.details.gi.val }}</td>
    <td class="text-right">{{ glycemicLoad }}</td>
    <td class="text-right">{{ kcal }}</td>
    <td>
      <i v-if="deleteIsPossible" @click.stop="$emit('remove-product')" class="icon icon-delete" />
    </td>
  </tr>
</template>

<script>
export default {
  name: "CalculatorRow",
  props: {
    product: { type: Object },
    count: { type: Number },
    deleteIsPossible: { type: Boolean, default: true, required: false },
    size: { type: String, default: "narrow", required: false }
  },
  computed: {
    availableCarbs() {
      return (
        Math.round(
          Math.abs(this.product.details.carbohydrate.val - this.product.details.fibre.val) *
            this.count
        ) / 100
      );
    },
    glycemicLoad() {
      return (
        Math.round(
          (this.product.details.gi.val *
            Math.abs(this.product.details.carbohydrate.val - this.product.details.fibre.val) *
            this.count) /
            100
        ) / 100
      );
    },
    kcal() {
      return (
        Math.round(
          (this.product.details.energyKcal
            ? this.product.details.energyKcal.val
            : this.product.details.energyKj.val / 4.1858) * this.count
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
