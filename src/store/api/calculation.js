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

export async function getTodayUserCalculations(email) {
  return await Vue.http.get(`/api/calculations/` + email + "/today", {
    headers: authenticationHeader()
  });
}
export async function saveCalculation(email, calculations) {
  return await Vue.http.post(
    `/api/calculations/` + email + "/add-calculation",
    { calculations },
    {
      headers: authenticationHeader()
    }
  );
}
