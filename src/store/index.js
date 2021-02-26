import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/mock';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: [],
    isLoading: false,
    isCached: false,
    cacheNames: ['payments'],
  }),

  mutations: {
    setStatusSpinner(state, value) {
      state.isLoading = value;
    },
    setPayments(state, data) {
      state.data = data;
    },
    clearCache(state) {
      state.isCached = false;
      localStorage.clear();
    },
    isCached(state, data) {
      state.isCached = data.some((item) => Boolean(localStorage.getItem(item)));
    },
    setCache(state, key) {
      localStorage.setItem(key, JSON.stringify(state.data));
    },
    getCache(state, { cacheNames, key }) {
      state.isCached = true;
      state.data = JSON.parse(localStorage.getItem(cacheNames.find((item) => item === key)));
      return state.data;
    },
  },

  actions: {
    async load({ commit, state }, params = {}) {
      commit('isCached', state.cacheNames);
      if (state.isCached) {
        commit('getCache', { cacheNames: state.cacheNames, key: 'payments' });
        return null;
      }
      commit('setStatusSpinner', true);
      return api
        .getPayments(params)
        .then((data) => {
          commit('setPayments', data);
          commit('setCache', 'payments');
        })
        .catch((e) => alert(e?.message))
        .finally(() => commit('setStatusSpinner', false));
    },
  },
});
