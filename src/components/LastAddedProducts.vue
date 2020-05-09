<template>
  <div class="slick-content text-center">
    <h3 class="font-weight-bold">Ostatnio dodane produkty</h3>
    <slick ref="slick" :options="slickOptions">
      <a v-for="product in lastAddedProducts" :key="product._id" href="/">
        <img
          :src="product.photo ? product.photo : '/images/default-image.png'"
          :alt="product.name_pl"
        />
        <h4 class="product-main-header">{{ product.name_pl }}</h4>
      </a>
    </slick>
  </div>
</template>

<script>
import Slick from "vue-slick";
import axios from "axios";

export default {
  name: "LastAddedProducts",

  components: { Slick },

  data() {
    return {
      lastAddedProducts: [],
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
    axios
      .get("http://localhost:3000/api/products/last-added")
      .then(response => {
        this.lastAddedProducts = response.data.products;
      })
      .catch(e => {
        console.error(e);
      });
  },

  methods: {
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
@import "./../styles/colors";

.slick-content {
  margin-top: 15vh;
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
