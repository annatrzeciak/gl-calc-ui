import Vue from "vue";
import { authenticationHeader } from "./apiHost";

export async function getUserSubscriptions(email) {
  return await Vue.http.get(`/api/subscriptions/` + email, {
    headers: authenticationHeader()
  });
}

export async function createPaymentIntent(email) {
  return await Vue.http.post(
    `/api/subscriptions/` + email + "/create-payment-intent",
    {},
    {
      headers: authenticationHeader()
    }
  );
}
