<template>
  <div class="slick-content text-center" v-if="lastAddedProducts.length">
    <h3 class="font-weight-bold">Ostatnio dodane produkty</h3>
    <slick ref="slick" :options="slickOptions">
      <router-link
        :to="{
          name: 'product-id',
          params: { searchValue: product.name_pl, productId: product._id }
        }"
        v-for="product in lastAddedProducts"
        :key="product._id"
      >
        <img
          :src="product.photo ? product.photo : '/images/default-image.png'"
          :alt="product.name_pl"
        />
        <h4 class="product-main-header">{{ product.name_pl }}</h4>
      </router-link>
    </slick>
  </div>
</template>

<script>
import Slick from "vue-slick";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductsLastAdded",

  components: { Slick },

  data() {
    return {
      slickOptions: {
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("product", ["lastAddedProducts"])
  },
  watch: {
    lastAddedProducts() {
      let currIndex = this.$refs.slick.currentSlide();

      this.$refs.slick.destroy();
      this.$nextTick(() => {
        this.$refs.slick.create();
        this.$refs.slick.goTo(currIndex, true);
      });
    }
  },
  created() {
    this.fetchLastAddedProducts();
  },

  methods: {
    ...mapActions("product", ["fetchLastAddedProducts"]),

    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    }
  }
};
</script>

<style scoped lang="scss">
@import "./../../styles/colors";

.slick-content {
  margin-top: 10vh;
  a {
    height: 180px;
    position: relative;
    padding-right: 30px;
    padding-left: 30px;
    overflow: hidden;
    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
    }
    h4 {
      font-weight: 600;
      font-size: 18px;
      position: absolute;
      color: $white;
      bottom: 0;
      width: calc(100% - 60px);
      background: rgba(0, 0, 0, 0.5);
      min-height: 62px;
      margin-bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px;
    }
  }
}
</style>
