import * as Calculation from "../api/calculation";

export const constans = {
  SET_CALCULATIONS: "SET_CALCULATIONS",
  SET_COUNT_CALCULATIONS: "SET_COUNT_CALCULATIONS",
  SET_TODAY_CALCULATIONS: "SET_TODAY_CALCULATIONS"
};

export default {
  namespaced: true,
  state: {
    calculations: [],
    countCalculations: 0,
    todayCalculations: []
  },
  getters: {
    allCalculations: state => state.calculations,
    todayCalculations: state => state.todayCalculations
  },
  mutations: {
    [constans.SET_CALCULATIONS](state, calculations) {
      state.calculations = calculations;
    },
    [constans.SET_COUNT_CALCULATIONS](state, count) {
      state.countCalculations = count;
    },
    [constans.SET_TODAY_CALCULATIONS](state, calculations) {
      state.todayCalculations = calculations;
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
    async fetchTodayCalculations({ commit, state }, { email }) {
      return Calculation.getTodayUserCalculations(email)
        .then(success => {
          commit(constans.SET_TODAY_CALCULATIONS, success.data.calculations);
          return Promise.resolve(success.data);
        })
        .catch(err => Promise.reject(err));
    },
    async addCalculation({ commit }, { email, data }) {
      return Calculation.saveCalculation(email, data)
        .then(success => {
          commit(constans.SET_TODAY_CALCULATIONS, success.data.calculations);
          return Promise.resolve(success.data);
        })
        .catch(err => Promise.reject(err));
    }
  }
};
