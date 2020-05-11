<template>
  <b-col sm="12">
    <b-row
      v-if="
        productDetails &&
          (productDetails.energyKcal || productDetails.energyKj) &&
          !detailsAreLoaded
      "
    >
      <b-col md="4" sm="6" class="additional-nutritional-values">
        <h6 class="font-weight-bold text-right">Energia</h6>
        <div class="d-flex justify-content-between" v-if="productDetails.energyKj">
          <div>Energia (Kj)</div>
          <div>
            {{ Math.round(productDetails.energyKj.val * 100) / 100
            }}{{ productDetails.energyKj.unit }}
          </div>
        </div>
        <div
          class="d-flex justify-content-between"
          v-if="productDetails.energyKcal || productDetails.energyKj"
        >
          <div>Energia (Kcal)</div>
          <div>
            {{
              Math.round(
                (productDetails.energyKcal
                  ? productDetails.energyKcal.val
                  : productDetails.energyKj.val / 4.1858) * 100
              ) / 100
            }}{{ productDetails.energyKcal ? productDetails.energyKcal.unit : "kcal" }}
          </div>
        </div>
        <h6 class="font-weight-bold text-right">Makroskładniki</h6>
        <div class="d-flex justify-content-between" v-if="productDetails.carbohydrate">
          <div>Węglowodany</div>
          <div>
            {{ Math.round(productDetails.carbohydrate.val * 100) / 100
            }}{{ productDetails.carbohydrate.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.protein">
          <div>Białko</div>
          <div>
            {{ Math.round(productDetails.protein.val * 100) / 100
            }}{{ productDetails.protein.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.fat">
          <div>Tłuszcz</div>
          <div>
            {{ Math.round(productDetails.fat.val * 100) / 100 }}{{ productDetails.fat.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.water">
          <div>Woda</div>
          <div>
            {{ Math.round(productDetails.water.val * 100) / 100 }}{{ productDetails.water.unit }}
          </div>
        </div>
        <div
          class="d-flex justify-content-between"
          v-if="productDetails.waterDr && productDetails.waterDr.val"
        >
          <div><em>Woda z napojów</em></div>
          <div>
            {{ Math.round(productDetails.waterDr.val * 100) / 100
            }}{{ productDetails.waterDr.unit }}
          </div>
        </div>
        <div
          class="d-flex justify-content-between"
          v-if="productDetails.alcohol && productDetails.alcohol.val"
        >
          <div>Alkohol</div>
          <div>
            {{ Math.round(productDetails.alcohol.val * 100) / 100
            }}{{ productDetails.alcohol.unit }}
          </div>
        </div>
        <h6 class="font-weight-bold text-right">Węglowodany</h6>
        <div class="d-flex justify-content-between" v-if="productDetails.starch">
          <div>Skrobia</div>
          <div>
            {{ Math.round(productDetails.starch.val * 100) / 100 }}{{ productDetails.starch.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.oligosaccharide">
          <div>Oligosacharydy</div>
          <div>
            {{ Math.round(productDetails.oligosaccharide.val * 100) / 100
            }}{{ productDetails.oligosaccharide.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.fibre">
          <div>Błonnik</div>
          <div>
            {{ Math.round(productDetails.fibre.val * 100) / 100 }}{{ productDetails.fibre.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.nsp">
          <div>NSP</div>
          <div>
            {{ Math.round(productDetails.nsp.val * 100) / 100 }}{{ productDetails.nsp.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.sugars">
          <div>Cukier</div>
          <div>
            {{ Math.round(productDetails.sugars.val * 100) / 100 }}{{ productDetails.sugars.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.glucose">
          <div><em>Glukoza</em></div>
          <div>
            {{ Math.round(productDetails.glucose.val * 100) / 100
            }}{{ productDetails.glucose.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.galactose">
          <div><em>Galaktoza</em></div>
          <div>
            {{ Math.round(productDetails.galactose.val * 100) / 100
            }}{{ productDetails.galactose.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.fructose">
          <div><em>Fruktoza</em></div>
          <div>
            {{ Math.round(productDetails.fructose.val * 100) / 100
            }}{{ productDetails.fructose.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.sucrose">
          <div><em>Sacharoza</em></div>
          <div>
            {{ Math.round(productDetails.sucrose.val * 100) / 100
            }}{{ productDetails.sucrose.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.maltose">
          <div><em>Maltoza</em></div>
          <div>
            {{ Math.round(productDetails.maltose.val * 100) / 100
            }}{{ productDetails.maltose.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.lactose">
          <div><em>Laktoza</em></div>
          <div>
            {{ Math.round(productDetails.lactose.val * 100) / 100
            }}{{ productDetails.lactose.unit }}
          </div>
        </div>
      </b-col>
      <b-col md="4" sm="6" class="additional-nutritional-values">
        <h6 class="font-weight-bold text-right">Tłuszcze</h6>
        <div class="d-flex justify-content-between" v-if="productDetails.satfat">
          <div>Tłuszcz nasycony</div>
          <div>
            {{ Math.round(productDetails.satfat.val * 100) / 100 }}{{ productDetails.satfat.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.satfat">
          <div><em>Tłuszcz jednonienasycony</em></div>
          <div>
            {{ Math.round(productDetails.satfat.val * 100) / 100 }}{{ productDetails.satfat.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.poly">
          <div>Tłuszcz wielonienasycony</div>
          <div>
            {{ Math.round(productDetails.poly.val * 100) / 100 }}{{ productDetails.poly.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.n3poly">
          <div><em>Omega-3</em></div>
          <div>
            {{ Math.round(productDetails.n3poly.val * 100) / 100 }}{{ productDetails.n3poly.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.n6poly">
          <div><em>Omega-6</em></div>
          <div>
            {{ Math.round(productDetails.n6poly.val * 100) / 100 }}{{ productDetails.n6poly.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.trans">
          <div>Tłuszcze trans</div>
          <div>
            {{ Math.round(productDetails.trans.val * 100) / 100 }}{{ productDetails.trans.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.cholesterol">
          <div>Cholesterol</div>
          <div>
            {{ Math.round(productDetails.cholesterol.val * 100) / 100
            }}{{ productDetails.cholesterol.unit }}
          </div>
        </div>
        <h6 class="font-weight-bold text-right">Minerały i pierwiastki śladowe</h6>
        <div class="d-flex justify-content-between" v-if="productDetails.sodium">
          <div>Sól</div>
          <div>
            {{ Math.round(productDetails.sodium.val * 100) / 100 }}{{ productDetails.sodium.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.potassium">
          <div>Potas</div>
          <div>
            {{ Math.round(productDetails.potassium.val * 100) / 100
            }}{{ productDetails.potassium.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.chloride">
          <div>Chlorek</div>
          <div>
            {{ Math.round(productDetails.chloride.val * 100) / 100
            }}{{ productDetails.chloride.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.calcium">
          <div>Wapń</div>
          <div>
            {{ Math.round(productDetails.calcium.val * 100) / 100
            }}{{ productDetails.calcium.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.phosphorus">
          <div>Fosfor</div>
          <div>
            {{ Math.round(productDetails.phosphorus.val * 100) / 100
            }}{{ productDetails.phosphorus.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.magnesium">
          <div>Magnez</div>
          <div>
            {{ Math.round(productDetails.magnesium.val * 100) / 100
            }}{{ productDetails.magnesium.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.iron">
          <div>Żelazo</div>
          <div>
            {{ Math.round(productDetails.iron.val * 100) / 100 }}{{ productDetails.iron.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.zinc">
          <div>Cynk</div>
          <div>
            {{ Math.round(productDetails.zinc.val * 100) / 100 }}{{ productDetails.zinc.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.copper">
          <div>Miedź</div>
          <div>
            {{ Math.round(productDetails.copper.val * 100) / 100 }}{{ productDetails.copper.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.selenium">
          <div>Selen</div>
          <div>
            {{ Math.round(productDetails.selenium.val * 100) / 100
            }}{{ productDetails.selenium.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.iodine">
          <div>Jod</div>
          <div>
            {{ Math.round(productDetails.iodine.val * 100) / 100 }}{{ productDetails.iodine.unit }}
          </div>
        </div>
      </b-col>
      <b-col md="4" sm="6" class="additional-nutritional-values">
        <h6 class="font-weight-bold text-right">Witaminy</h6>
        <div class="d-flex justify-content-between" v-if="productDetails.vita">
          <div>Witamina A</div>
          <div>
            {{ Math.round(productDetails.vita.val * 100) / 100 }}{{ productDetails.vita.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.retinol">
          <div><em>Retinol</em></div>
          <div>
            {{ Math.round(productDetails.retinol.val * 100) / 100
            }}{{ productDetails.retinol.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.carotene">
          <div><em>Karoten</em></div>
          <div>
            {{ Math.round(productDetails.carotene.val * 100) / 100
            }}{{ productDetails.carotene.unit }}
          </div>
        </div>

        <div class="d-flex justify-content-between" v-if="productDetails.vitd">
          <div>Witamina D</div>
          <div>
            {{ Math.round(productDetails.vitd.val * 100) / 100 }}{{ productDetails.vitd.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.vite">
          <div>Witamina E</div>
          <div>
            {{ Math.round(productDetails.vite.val * 100) / 100 }}{{ productDetails.vite.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.vitk">
          <div>Witamina K1</div>
          <div>
            {{ Math.round(productDetails.vitk.val * 100) / 100 }}{{ productDetails.vitk.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.thiamin">
          <div>Witamina B1 (tiamina)</div>
          <div>
            {{ Math.round(productDetails.thiamin.val * 100) / 100
            }}{{ productDetails.thiamin.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.riboflavin">
          <div>Witamina B2 (ryboflawina)</div>
          <div>
            {{ Math.round(productDetails.riboflavin.val * 100) / 100
            }}{{ productDetails.riboflavin.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.niacineqv">
          <div>Witamina B3 (niacyna)</div>
          <div>
            {{ Math.round(productDetails.niacineqv.val * 100) / 100
            }}{{ productDetails.niacineqv.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.niacin">
          <div><em>Niacyna </em></div>
          <div>
            {{ Math.round(productDetails.niacin.val * 100) / 100 }}{{ productDetails.niacin.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.tryptophan">
          <div><em>Tryptofan </em></div>
          <div>
            {{ Math.round(productDetails.tryptophan.val * 100) / 100
            }}{{ productDetails.tryptophan.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.pantothenate">
          <div>Witamina B5 (pantotenian)</div>
          <div>
            {{ Math.round(productDetails.pantothenate.val * 100) / 100
            }}{{ productDetails.pantothenate.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.vitb6">
          <div>Witamina B6</div>
          <div>
            {{ Math.round(productDetails.vitb6.val * 100) / 100 }}{{ productDetails.vitb6.unit }}
          </div>
        </div>

        <div class="d-flex justify-content-between" v-if="productDetails.folate">
          <div>Witamina B9 (folian)</div>
          <div>
            {{ Math.round(productDetails.folate.val * 100) / 100 }}{{ productDetails.folate.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.vitb12">
          <div>Witamina B12</div>
          <div>
            {{ Math.round(productDetails.vitb12.val * 100) / 100 }}{{ productDetails.vitb12.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.biotin">
          <div>Witamina B7 (biotyna)</div>
          <div>
            {{ Math.round(productDetails.biotin.val * 100) / 100 }}{{ productDetails.biotin.unit }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.vitc">
          <div>Witamina C</div>
          <div>
            {{ Math.round(productDetails.vitc.val * 100) / 100 }}{{ productDetails.vitc.unit }}
          </div>
        </div>
        <h6 class="font-weight-bold text-right">Inne</h6>
        <div class="d-flex justify-content-between" v-if="productDetails.gi">
          <div>Indeks glikochemiczny</div>
          <div>
            {{ Math.round(productDetails.gi.val * 100) / 100 }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.gi">
          <div>Ładunek glikochemiczny</div>
          <div>
            {{ Math.round(productDetails.gi.val * productDetails.carbohydrate.val) / 100 }}
          </div>
        </div>
        <div class="d-flex justify-content-between" v-if="productDetails.caffeine">
          <div>Kofeina</div>
          <div>
            {{ Math.round(productDetails.caffeine.val * 100) / 100
            }}{{ productDetails.caffeine.unit }}
          </div>
        </div>
      </b-col>
    </b-row>
    <Spinner v-if="detailsAreLoaded" class="mt-4" />
  </b-col>
</template>

<script>
import Spinner from "@/components/Utils/Spinner.vue";

export default {
  name: "ProductNutritionalValuesAdditional",
  components: { Spinner },
  props: {
    productDetails: { type: Object, required: false },
    detailsAreLoaded: { type: Boolean, required: true }
  }
};
</script>

<style lang="scss" scoped>
@import "./../../../styles/colors";

.subdata {
  margin-right: 10px;
}
table {
  width: 100%;
}
.additional-nutritional-values {
  h6 {
    color: $blue;
    background: rgb(238, 238, 238);
    margin: 5px 0px;
    padding: 3px 8px;
    border-left: 2px solid $blue;
  }
  & > div {
    border-bottom: 1px solid rgb(238, 238, 238);

    padding: 3px 8px;
    em {
      margin-left: 0.5rem;
    }
    & > div:nth-of-type(2) {
      color: $blue;
      /*font-weight: bold;*/
    }
  }
}
</style>
