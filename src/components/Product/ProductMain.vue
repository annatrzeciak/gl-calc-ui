<template>
  <b-col  :id="'product-main-info-' + product._id" :md="isShowedDetails ? 12 : 4" :sm="isShowedDetails ? 12 : 6">
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
          <h5>{{ product.name }}/{{ product._id }}</h5>
        </b-col>
        <ProductNutritionalValuesMain
          v-if="isShowedDetails"
          :productDetails="productDetails"
          :detailsAreLoaded="detailsAreLoaded"
        />
        <ProductNutritionalValuesAdditional
          v-if="isShowedDetails"
          :productDetails="productDetails"
          :detailsAreLoaded="detailsAreLoaded"
        />
      </b-row>
    </div>
  </b-col>
</template>

<script>
import debounce from "lodash.debounce";
import axios from "axios";
import ProductNutritionalValuesAdditional from "@/components/Product/ProductNutritionalValues/ProductNutritionalValuesAdditional.vue";
import ProductNutritionalValuesMain from "@/components/Product/ProductNutritionalValues/ProductNutritionalValuesMain.vue";

export default {
  name: "ProductMain",
  components: { ProductNutritionalValuesAdditional, ProductNutritionalValuesMain },
  props: {
    product: { type: Object, required: true }
  },
  data() {
    return {
      detailsAreLoaded: false,
      isShowedDetails: false,
      productDetails: {}
    };
  },
  methods: {
    showDetails() {
      this.isShowedDetails = true;
      this.loadDetails();
    },
    hideDetails() {
      this.isShowedDetails = false;
    },
    loadDetails: debounce(function() {
      if (this.product) {
        this.detailsAreLoaded = true;
        this.$emit('scroll-list-to-product', this.product._id)
        axios
          .get("http://localhost:3000/api/details/" + this.product._id)
          .then(response => {
            this.detailsAreLoaded = false;
            this.productDetails = response.data.details;
          })
          .catch(e => {
            console.error(e);
          });
      }
    }, 500)
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
