import * as Auth from "../api/auth";
import Vue from "vue";
import router from "../../router";

export const constans = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_AUTH_USER: "SET_AUTH_USER",
  SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER: "SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER",
  SET_USERS_LIST: "SET_USERS_LIST"
};

export default {
  namespaced: true,
  state: {
    isAuthorized: false,
    tokenRefreshCounterId: null,
    auth: {},
    account: {
      users: []
    }
  },
  getters: {
    isLogged: state => state.isAuthorized
  },
  mutations: {
    [constans.SET_AUTH_USER](state, tokens) {
      const decodeAccessToken = Auth.decodeJWT(tokens && tokens.accessToken);
      state.auth = {
        accessToken: (tokens && tokens.accessToken) || "",
        refreshToken: (tokens && tokens.refreshToken) || "",
        sub: (decodeAccessToken && decodeAccessToken.sub) || "",
        rol: (decodeAccessToken && decodeAccessToken.rol) || "",
        iat: (decodeAccessToken && decodeAccessToken.iat) || "",
        exp: (decodeAccessToken && decodeAccessToken.exp) || ""
      };
    },
    [constans.SET_AUTHENTICATED](state, isAuth) {
      state.isAuthorized = isAuth;
    },
    [constans.SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER](state, payload) {
      state.tokenRefreshCounterId = payload;
    },
    [constans.SET_USERS_LIST](state, payload) {
      Vue.set(state.account, "users", payload.users);
    }
  },
  actions: {
    getNewRefreshToken({ dispatch }) {
      new Promise(resolve => {
        return Auth.refreshToken(Auth.getRefreshToken()).then(async response => {
          await dispatch("authorize", response.data);
          return resolve();
        });
      });
    },
    async refreshToken({ commit, dispatch, state }) {
      await dispatch("clearTimeoutToken");
      const renewalTimeBuffer = 2000;
      const timeDiff = Auth.getTimeDiff(state && state.auth && state.auth.exp);
      let timeoutCount = renewalTimeBuffer < timeDiff ? timeDiff - renewalTimeBuffer : timeDiff;
      if (timeoutCount) {
        const renewalTimeout = setTimeout(() => {
          dispatch("getNewRefreshToken");
        }, timeoutCount);
        commit(constans.SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER, renewalTimeout);
      } else {
        await dispatch("getNewRefreshToken");
      }
    },

    async authenticationUser({ dispatch }, { email, password }) {
      return Auth.loginInTheApplication(email, password).then(async success => {
        await dispatch("authorize", success.data);
      });
    },

    async authorize({ commit, dispatch }, tokens) {
      const accessTokenValid = Auth.checkTokenValidity(tokens && tokens.accessToken);
      commit(constans.SET_AUTHENTICATED, accessTokenValid);
      if (accessTokenValid) {
        commit(constans.SET_AUTH_USER, tokens);
        await Auth.setLocalStorageTokens(tokens);
      }
      return dispatch("refreshToken");
    },

    clearTimeoutToken({ commit, state }) {
      clearTimeout(state.tokenRefreshCounterId);
      commit(constans.SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER, null);
    },

    async logoutUser({ commit, dispatch }) {
      await dispatch("clearTimeoutToken");
      Auth.removeLocalStorageTokens();
      commit(constans.SET_AUTH_USER, null);
      commit(constans.SET_AUTHENTICATED, false);
      router.push({ name: "login" });
    }
  }
};
