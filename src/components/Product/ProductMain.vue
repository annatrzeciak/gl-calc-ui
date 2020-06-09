<template>
  <b-col
    :id="'product-main-info-' + product._id"
    :md="isShowedDetails ? 12 : 4"
    :sm="isShowedDetails ? 12 : 6"
  >
    <div
      :class="['product-main-info', 'm-2', { 'details-showed': isShowedDetails }]"
      @click="showDetails"
    >
      <b-row>
        <b-col :md="isShowedDetails ? 4 : 12" :sm="isShowedDetails ? 6 : 12">
          <img
            :src="product.photo ? product.photo : '/images/default-image.png'"
            :alt="product.name_pl"
          />
          <h4 class="product-main-header">{{ product.name_pl }}</h4>

          <b-form class="mb-2" @submit="$event.preventDefault()" inline v-if="isShowedDetails">
            <b-input
              type="number"
              id="inline-form-input-name"
              class="col-3 offset-3 mr-2 text-right"
              placeholder="Podaj wagę"
              :value="countValue"
              @change="updateValue"
            />
            <label class="mr-3" for="inline-form-input-name">g</label>
            <b-dropdown text="Dodaj do" variant="blue">
              <b-dropdown-item @click.stop="addToCalculator(1)">śniadania</b-dropdown-item>
              <b-dropdown-item @click.stop="addToCalculator(2)">II śniadania</b-dropdown-item>
              <b-dropdown-item @click.stop="addToCalculator(3)">obiadu</b-dropdown-item>
              <b-dropdown-item @click.stop="addToCalculator(4)">podwieczorku</b-dropdown-item>
              <b-dropdown-item @click.stop="addToCalculator(5)">kolacji</b-dropdown-item>
            </b-dropdown>
          </b-form>
        </b-col>
        <ProductNutritionalValuesMain
          v-if="isShowedDetails"
          :productDetails="openedProductWithDetails.details ? openedProductWithDetails.details : {}"
          :detailsAreLoaded="detailsAreLoaded"
        />
        <ProductNutritionalValuesAdditional
          v-if="isShowedDetails"
          :productDetails="openedProductWithDetails.details ? openedProductWithDetails.details : {}"
          :detailsAreLoaded="detailsAreLoaded"
        />
      </b-row>
    </div>
  </b-col>
</template>

<script>
import debounce from "lodash.debounce";
import ProductNutritionalValuesAdditional from "@/components/Product/ProductNutritionalValues/ProductNutritionalValuesAdditional.vue";
import ProductNutritionalValuesMain from "@/components/Product/ProductNutritionalValues/ProductNutritionalValuesMain.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductMain",
  components: { ProductNutritionalValuesAdditional, ProductNutritionalValuesMain },
  props: {
    product: { type: Object, required: true }
  },
  data() {
    return {
      detailsAreLoaded: false,
      countValue: 100
    };
  },
  computed: {
    ...mapGetters("product", ["openedProductWithDetails"]),

    isShowedDetails() {
      return this.$route.params.productId && this.$route.params.productId == this.product._id;
    }
  },
  methods: {
    ...mapActions("product", ["fetchProductWithDetails"]),

    showDetails() {
      if (!this.isShowedDetails && this.$route.params.productId !== this.product._id) {
        this.$router.push({ name: "product-id", params: { productId: this.product._id } });
        this.loadDetails();
      }
    },
    loadDetails: debounce(function() {
      if (this.product) {
        this.detailsAreLoaded = true;
        this.$emit("scroll-list-to-product", this.product._id);
        this.fetchProductWithDetails(this.product._id, 1)
          .then(() => {
            this.detailsAreLoaded = false;
          })
          .catch(e => {
            console.error(e);
          });
      }
    }, 500),
    updateValue(event) {
      this.countValue = event;
    },
    addToCalculator(mealNumber) {
      this.$emit("add-to-calc", {
        id: this.product._id,
        mealNumber,
        product: this.openedProductWithDetails,
        count: Number(this.countValue)
      });
    }
  },
  created() {
    if (this.isShowedDetails) {
      this.loadDetails();
    }
  }
};
</script>

<style lang="scss" scoped>
.product-main {
  &-header {
    font-weight: bold;
  }
  &-info {
    width: calc(100% - 0.5rem);
    height: calc(100% - 2rem);
    color: black;
    box-sizing: border-box;
    float: left;
    min-height: 400px;
    text-align: center;
    padding: 15px 15px 45px;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    opacity: 0.8;
    &:hover,
    &.details-showed {
      cursor: pointer;
      opacity: 1;
    }
    img {
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 10px;
      height: 300px;
      width: calc(100% - 10px);
      object-fit: cover;
      object-position: center;
      display: block;
    }
  }
}
</style>
