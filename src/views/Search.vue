<template>
  <div class="wrapper">
    <div class="search">
      <div class="input-group">
      <label>Szukaj</label>
      <input type="search" v-model="searchValue" @keyup="filterProducts" />
      </div>
    </div>
    <div class="results" v-if="filteredProducts.length > 0">
      <p>Znaleziono {{ filteredProducts.length }} produktów</p>
      <ul>
        <li :key="product.id" v-for="product in filteredProducts">
          {{ product.name_pl }} / {{ product.name }}
          <img :src="product.photo" alt="" width="240" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash.debounce";

export default {
  name: "Search",
  data() {
    return {
      searchValue: "",
      filteredProducts: [],
      isFiltering: false
    };
  },
  methods: {
    filterProducts: debounce(function() {
      this.isFiltering = true;
      axios
        .get("http://localhost:3000/api/products/search/" + this.searchValue)
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
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 30px;
}

.search {
  display: flex;
  flex-direction: column;
  width: 300px;

  label {
    font-family: Montserrat, sans-serif;
  }

  input {
    height: 30px;
    border: 0;
    border-bottom: 1px solid black;
  }
}
</style>
