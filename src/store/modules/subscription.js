import * as Subscription from "../api/subscription";

export const constans = {
  SET_SUBSCRIPTIONS: "SET_SUBSCRIPTIONS"
};

export default {
  namespaced: true,
  state: {
    subscriptions: []
  },
  getters: {
    allSubscriptions: state => state.subscriptions
  },
  mutations: {
    [constans.SET_SUBSCRIPTIONS](state, subscriptions) {
      state.subscriptions = subscriptions;
    }
  },
  actions: {
    async fetchSubscriptions({ commit, state }, { email }) {
      return Subscription.getUserSubscriptions(email)
        .then(success => {
          commit(constans.SET_SUBSCRIPTIONS, success.data.subscriptions);
          return Promise.resolve(success.data);
        })
        .catch(err => Promise.reject(err));
    },
    createPayment({ commit, state }, { email, startDate }) {
      return Subscription.createPaymentIntent(email, startDate)
        .then(success => {
          commit(constans.SET_SUBSCRIPTIONS, success.data.session);
          return Promise.resolve(success.data);
        })
        .catch(err => Promise.reject(err));
    }
  }
};
