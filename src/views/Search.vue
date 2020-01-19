<template>
  <div class="wrapper">
    <div class="search">
      <md-field>
        <label>Szukaj</label>
        <md-input type="search" v-model="searchValue"></md-input>
      </md-field>
    </div>
    <div class="results" v-if="searchValue.length > 2">
      <p>Znaleziono {{ flirtedProducts.length }} produktów</p>
      <ul>
        <li :key="product.id" v-for="product in flirtedProducts">{{ product.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "../Firebase";

export default {
  name: "Search",
  data() {
    return {
      searchValue: "",
      db: firebase.database().ref("products")
    };
  },
  computed: {
    products: function() {
      let result = [];
      this.db.on(
        "value",
        snapshot => {
          result = snapshot.val();
          console.log(result);
          console.log(result[0]);
        },
        () => {
          return [];
        }
      );
      return result;
    },
    flirtedProducts: function() {
      // console.log(this.products);

      if (this.searchValue.length > 2 && this.products) {
        // console.log(this.products.filter());
        return this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      }
      return this.products;
    }
  }
};
</script>
<style scoped lang="scss">
.wrapper {
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
