import Vue from "vue";
import { authenticationHeader } from "./apiHost";

export async function getUserCalculations(email, page, pageSize) {
  return await Vue.http.post(
    `/api/calculations/` + email,
    { page, pageSize },
    {
      headers: authenticationHeader()
    }
  );
}
