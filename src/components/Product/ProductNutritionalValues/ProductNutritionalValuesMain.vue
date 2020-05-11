<template>
  <b-col md="8" sm="5">
    <b-row>
      <b-col md="6" sm="8">
        <div
          v-if="
            productDetails &&
              (productDetails.energyKcal || productDetails.energyKj) &&
              !detailsAreLoaded
          "
        >
          <h5 class="font-weight-bold">Wartości odżywcze w 100 g produktu</h5>
          <table class="w-100 main-nutritional-values">
            <thead>
              <tr class=" font-weight-bold">
                <td></td>
                <td colspan="2">w 100 g</td>
                <td>%RWS</td>
              </tr>
            </thead>
            <tbody class="text-left">
              <tr v-if="productDetails.energyKj">
                <td>
                  Energia (Kj):
                </td>
                <td class="text-right">
                  {{ Math.round(productDetails.energyKj.val * 100) / 100 }}
                </td>
                <td>
                  {{ productDetails.energyKj.unit }}
                </td>
                <td class="text-right">
                  {{ Math.round(productDetails.energyKj.percentRI * 100) / 100 }}%
                </td>
              </tr>
              <tr v-if="productDetails.energyKcal || productDetails.energyKj">
                <td>Energia (Kcal):</td>
                <td class="text-right">
                  {{
                    Math.round(
                      (productDetails.energyKcal
                        ? productDetails.energyKcal.val
                        : productDetails.energyKj.val / 4.1858) * 100
                    ) / 100
                  }}
                </td>
                <td>
                  {{ productDetails.energyKcal ? productDetails.energyKcal.unit : "kcal" }}
                </td>
                <td class="text-right">
                  {{
                    Math.round(
                      productDetails.energyKcal
                        ? productDetails.energyKcal.percentRI
                        : productDetails.energyKj.percentRI * 100
                    ) / 100
                  }}%
                </td>
              </tr>
              <tr v-if="productDetails.fat">
                <td>
                  Tłuszcz:
                </td>
                <td class="text-right">
                  {{ Math.round(productDetails.fat.val * 100) / 100 }}
                </td>
                <td>
                  {{ productDetails.fat.unit }}
                </td>
                <td class="text-right">
                  {{ Math.round(productDetails.fat.percentRI * 100) / 100 }}%
                </td>
              </tr>

              <tr v-if="productDetails.satfat">
                <td class="pl-2"><em>w tym kw. tłuszczowe nasycone:</em></td>
                <td class="text-right">
                  {{ Math.round(productDetails.satfat.val * 100) / 100 }}
                </td>
                <td>
                  {{ productDetails.satfat.unit }}
                </td>
                <td class="text-right">
                  {{ Math.round(productDetails.satfat.percentRI * 100) / 100 }}%
                </td>
              </tr>
              <tr v-if="productDetails.carbohydrate">
                <td>Węglowodany:</td>
                <td class="text-right">
                  {{ Math.round(productDetails.carbohydrate.val * 100) / 100 }}
                </td>
                <td>
                  {{ productDetails.carbohydrate.unit }}
                </td>
                <td class="text-right">
                  {{ Math.round(productDetails.carbohydrate.percentRI * 100) / 100 }}%
                </td>
              </tr>
              <tr v-if="productDetails.sugars">
                <td class="pl-2"><em>w tym cukier:</em></td>
                <td class="text-right">
                  {{ Math.round(productDetails.sugars.val * 100) / 100 }}
                </td>
                <td>
                  {{ productDetails.sugars.unit }}
                </td>
                <td class="text-right">
                  {{ Math.round(productDetails.sugars.percentRI * 100) / 100 }}%
                </td>
              </tr>

              <tr v-if="productDetails.fibre">
                <td>Błonnik:</td>
                <td class="text-right">
                  {{ Math.round(productDetails.fibre.val * 100) / 100 }}
                </td>
                <td>
                  {{ productDetails.fibre.unit }}
                </td>
                <td class="text-right">
                  {{ Math.round(productDetails.fibre.percentRI * 100) / 100 }}%
                </td>
              </tr>
              <tr v-if="productDetails.protein">
                <td>Białko:</td>
                <td class="text-right">
                  {{ Math.round(productDetails.protein.val * 100) / 100 }}
                </td>
                <td>
                  {{ productDetails.protein.unit }}
                </td>
                <td class="text-right">
                  {{ Math.round(productDetails.protein.percentRI * 100) / 100 }}%
                </td>
              </tr>
              <tr v-if="productDetails.salt">
                <td>Sól:</td>
                <td class="text-right">
                  {{ Math.round(productDetails.salt.val * 100) / 100 }}
                </td>
                <td>
                  {{ productDetails.salt.unit }}
                </td>
                <td class="text-right">
                  {{ Math.round(productDetails.salt.percentRI * 100) / 100 }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Spinner v-if="detailsAreLoaded" class="mt-4" />
      </b-col>
      <b-col md="6" sm="4">
        <Graph
          v-if="!detailsAreLoaded"
          :carbs="productDetails.carbohydrate ? productDetails.carbohydrate.val : 0"
          :protein="productDetails.protein ? productDetails.protein.val : 0"
          :fat="productDetails.fat ? productDetails.fat.val : 0"
          :kcal="productDetails.energyKcal ? productDetails.energyKcal.val : 0"
          :kJ="productDetails.energyKj ? productDetails.energyKj.val : 0"
          :GI="productDetails.gi ? productDetails.gi.val : 0"
        /> </b-col
    ></b-row>
  </b-col>
</template>

<script>
import Spinner from "@/components/Utils/Spinner.vue";
import Graph from "@/components/Utils/Graph.vue";

export default {
  name: "ProductNutritionalValuesMain",
  components: { Spinner, Graph },
  props: {
    productDetails: { type: Object, required: false },
    detailsAreLoaded: { type: Boolean, required: true }
  }
};
</script>

<style lang="scss" scoped>
table.main-nutritional-values {
  td {
    padding-right: 5px;
  }
}
</style>
