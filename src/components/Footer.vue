<template>
  <footer>
    <ProductsLastAdded />
    <div class="text-center footer-content">Wszelkie prawa zastrzeżone &copy; 2020</div>
  </footer>
</template>

<script>
import ProductsLastAdded from "@/components/Product/ProductsLastAdded.vue";

export default {
  name: "Footer",
  components: { ProductsLastAdded }
};
</script>

<style lang="scss" scoped>
@import "./../styles/colors";

footer {
  margin-top: auto;
  margin-bottom: 0;
  width: 100%;
  .footer-content {
    margin-top: 10px;
    background: $darkBlue;
    color: white;
    font-weight: bold;
    padding: 5px;
  }
}
</style>
