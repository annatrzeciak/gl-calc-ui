import * as Calculation from "../api/calculation";
import * as Auth from "../api/auth";

export const constans = {
  SET_CALCULATIONS: "SET_CALCULATIONS",
  SET_COUNT_CALCULATIONS: "SET_COUNT_CALCULATIONS"
};

export default {
  namespaced: true,
  state: {
    calculations: [],
    countCalculations: 0
  },
  getters: {
    allCalculations: state => state.calculations,
    todayCalculations: state =>
      state.calculations.filter(
        calculation => new Date(calculation.date).toDateString() === new Date().toDateString()
      )
  },
  mutations: {
    [constans.SET_CALCULATIONS](state, calculations) {
      state.calculations = calculations;
    },
    [constans.SET_COUNT_CALCULATIONS](state, count) {
      state.countCalculations = count;
    }
  },
  actions: {
    async fetchCalculations({ commit, state }, { email, page, pageSize }) {
      return Calculation.getUserCalculations(email, page, pageSize)
        .then(success => {
          commit(constans.SET_CALCULATIONS, success.data.calculations);
          commit(constans.SET_COUNT_CALCULATIONS, success.data.details.count);
          return Promise.resolve(success.data);
        })
        .catch(err => Promise.reject(err));
    },
    async addCalculation(ctx, { email, data }) {
      console.log(email);
      return Calculation.saveCalculation(email, data)
        .then(response => {
          return Promise.resolve(response);
        })
        .catch(err => Promise.reject(err));
    }
  }
};
