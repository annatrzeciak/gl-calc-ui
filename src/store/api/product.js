import Vue from "vue";

// ENDPOINTS
export async function getLastAddedProducts() {
  return await Vue.http.get(`/api/products/last-added`);
}

export async function searchProducts(searchValue) {
  return await Vue.http.get(`/api/products/search/${searchValue}`);
}

export async function getProductWithDetails(productId) {
  return await Vue.http.get(`/api/products/${productId}?withDetails=true`);
}
