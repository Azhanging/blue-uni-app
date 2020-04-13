import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

//vue $store
const store = new Vuex.Store({
  state,
  getters,
  mutations
});

//mixin vuex store in vue instance
Vue.mixin({
  store
});

export default store;
