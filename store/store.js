import Vue from 'vue'
import Vuex from 'vuex'
import professions from './modules/professions'
import keywords from './modules/keywords'
import trajectory from './modules/trajectory'
import header from './modules/header'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {professions, keywords, trajectory, header}
})
