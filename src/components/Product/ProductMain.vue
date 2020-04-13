<template>
  <b-col md="4" sm="6">
    <div class="product-main-info m-2">
      <img
        :src="product.photo ? product.photo : '/images/default-image.png'"
        :alt="product.name_pl"
      />
      <h4 class="product-main-header">{{ product.name_pl }}</h4>
      <h5>{{ product.name }}/{{ product._id }}</h5>
    </div>
  </b-col>
</template>

<script>
export default {
  name: "ProductMain",
  props: {
    product: { type: Object, required: true }
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
    &:hover {
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
