import * as Product from "../api/product";

export const constans = {
  SET_LAST_ADDED_PRODUCTS: "SET_LAST_ADDED_PRODUCTS",
  SET_SEARCH_VALUE: "SET_SEARCH_VALUE",
  SET_FOUND_PRODUCTS: "SET_FOUND_PRODUCTS",
  SET_OPENED_PRODUCT_ID: "SET_OPENED_PRODUCT_ID",
  SET_OPENED_PRODUCT_DETAILS: "SET_OPENED_PRODUCT_DETAILS"
};

export default {
  namespaced: true,
  state: {
    lastAddedProducts: [],
    searchValue: "",
    foundProducts: [],
    openedProductId: "",
    openedProductWithDetails: {}
  },
  getters: {
    lastAddedProducts: state => state.lastAddedProducts,
    foundProducts: state => state.foundProducts,
    openedProductWithDetails: state => state.openedProductWithDetails
  },
  mutations: {
    [constans.SET_LAST_ADDED_PRODUCTS](state, data) {
      state.lastAddedProducts = data.products;
    },
    [constans.SET_FOUND_PRODUCTS](state, data) {
      state.foundProducts = data.products;
    },
    [constans.SET_SEARCH_VALUE](state, value) {
      state.searchValue = value;
    },
    [constans.SET_OPENED_PRODUCT_ID](state, value) {
      state.openedProductId = value;
    },
    [constans.SET_OPENED_PRODUCT_DETAILS](state, data) {
      state.openedProductWithDetails = data.product;
    }
  },
  actions: {
    async fetchLastAddedProducts({ commit }) {
      return Product.getLastAddedProducts()
        .then(success => {
          commit(constans.SET_LAST_ADDED_PRODUCTS, success.data);
          return Promise.resolve(success.data);
        })
        .catch(err => Promise.reject(err));
    },
    async searchProducts({ commit, state }, searchValue) {
      commit(constans.SET_SEARCH_VALUE, searchValue);

      return Product.searchProducts(state.searchValue)
        .then(success => {
          commit(constans.SET_FOUND_PRODUCTS, success.data);
          return Promise.resolve(success.data);
        })
        .catch(err => Promise.reject(err));
    },
    async fetchProductWithDetails({ commit, state }, productId) {
      commit(constans.SET_OPENED_PRODUCT_ID, productId);
      return Product.getProductWithDetails(state.openedProductId)
        .then(success => {
          commit(constans.SET_OPENED_PRODUCT_DETAILS, success.data);
          return Promise.resolve(success.data);
        })
        .catch(err => Promise.reject(err));
    }
  }
};
