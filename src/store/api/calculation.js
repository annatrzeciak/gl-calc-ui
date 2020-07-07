import Vue from "vue";
import { authenticationHeader } from "./apiHost";

export async function getUserCalculations(email, page, pageSize) {
  return await Vue.http.post(
    `api/calculations/` + email,
    { page, pageSize },
    {
      headers: authenticationHeader()
    }
  );
}

export async function getTodayUserCalculations(email) {
  console.log(Vue.http.options);
  return await this.$http.get(`api/calculations/` + email + "/today", {
    headers: authenticationHeader()
  });
}
export async function saveCalculation(email, calculations) {
  return await Vue.http.post(
    `api/calculations/` + email + "/add-calculation",
    { calculations },
    {
      headers: authenticationHeader()
    }
  );
}

export function saveCalculationInStorage(data) {
  const now = new Date();
  if (data)
    localStorage.setItem(
      "calculations:" + now.toLocaleDateString(),
      JSON.stringify(data.calculations)
    );
}

export function getTodayUserCalculationsFromStorage() {
  return new Promise(resolve => {
    const now = new Date();
    const calculations = localStorage.getItem("calculations:" + now.toLocaleDateString());
    resolve(JSON.parse(calculations));
  });
}
