import Vue from 'vue'
import Vuex from 'vuex'
import professions from './modules/professions'
import keywords from './modules/keywords'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {professions, keywords}
})
