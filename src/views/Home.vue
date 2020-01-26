<template>
  <div class="wrapper">
    <MainInfo />
    <SearchInput :value="searchValue" @filter="filterProducts"/>
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash.debounce";
import MainInfo from "@/components/MainInfo.vue";
import SearchInput from "@/components/SearchInput.vue";

export default {
  name: "Home",
  components: {SearchInput, MainInfo },
  data() {
    return {
      searchValue: "",
      filteredProducts: [],
      isFiltering: false
    };
  },
  methods: {
    filterProducts: debounce(function(value) {
      console.log(value)
      this.isFiltering = true;
      axios
        .get("http://localhost:3000/api/products/search/" + value)
        .then(response => (this.filteredProducts = response.data.products))
        .catch(e => {
          console.error(e);
        });
      this.isFiltering = false;
    }, 500)
  }
};
</script>
<style scoped lang="scss">
.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 30px;
  background-image: linear-gradient(to bottom,rgba(0,0,0,.7),rgba(0,0,0,.7)), url("/images/smoothies.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
}

</style>
