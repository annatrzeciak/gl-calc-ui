<template>
  <b-col md="3" sm="6">
    <div class="product-main-info">
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
    width: calc(100% - 30px);
    height: calc(100% - 60px);
    color: black;
    margin: 15px;
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
