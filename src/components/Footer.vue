<template>
  <footer>
    <LastAddedProducts />
    <div class="text-center footer-content">Wszelkie prawa zastrzeżone &copy; 2020</div>
  </footer>
</template>

<script>
import LastAddedProducts from "@/components/LastAddedProducts.vue";

export default {
  name: "Footer",
  components: { LastAddedProducts }
};
</script>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  margin-bottom: 0;
  width: 100%;
  .footer-content{
    margin-top: 10px;
    background: #88c000;
    color: white;
    font-weight: bold;
    padding: 5px  ;
  }
}
</style>
