import keyword from "../../components/Keyword";

let state = {}
let getters = {}
let mutations = {}
let actions = {}

import {debounce} from "lodash";

state = () => ({
  keywords: [],
  queryKeywords: [],
  addedKeywords: [],
  trajectoryIds: []
})

getters = {
  keywords: (state) => state.keywords,
  queryKeywords: (state) => state.queryKeywords,
  addedKeywords: (state) => state.addedKeywords,
  trajectoryIds: (state) => state.trajectoryIds,
}

mutations = {
  setQueryKeywords: (state, payload) => {
    state.queryKeywords = payload
  },

  setTrajectoryIds: (state, payload) => {
    state.trajectoryIds = payload
  },

  setKeywords: (state, payload) => {
    state.keywords = payload
  },

  addKeywords: (state, payload) => {
    state.addedKeywords = [...state.addedKeywords, ...payload]
  },

  deleteKeyword: (state, payload) => {
    state.keywords = state.keywords.filter(word => word !== payload)
  },

  deleteAddedKeyword: (state, payload) => {
    state.addedKeywords = state.addedKeywords.filter(word => word !== payload)
  },

  deleteQueryKeyword: (state, payload) => {
    state.queryKeywords = state.queryKeywords.filter(word => word !== payload)
  },

  clearKeywords: (state) => {
    state.addedKeywords = []
    state.queryKeywords = []
  }
}

actions = {
  async getKeywords(context, query) {
    if (query === '') {
      context.commit('setQueryKeywords', [])
    } else {
      try {
        const response = await this.$axios.get(`/api/keywords/?text_like=${query}`)
        context.commit('setQueryKeywords', response.data)
      } catch {
        console.log('Error in keywords' + query)
      }
    }
  },


  debounceKeywords: debounce(({dispatch}, query) => {
    dispatch("getKeywords", query);
  }, 500),


  async sendKeywords({state, commit}) {
    let postKeywords = []
    state.keywords.forEach(e => postKeywords.push(e.id))
    state.addedKeywords.forEach(e => postKeywords.push(e.id))

    const response = await this.$axios.post('/api/trajectories/?top_n=3', {'keywords': postKeywords})

    commit('modules/trajectory/setTrajectories', response.data, {root: true})
    console.log(response)

    let ids = []
    response.data.forEach(el => ids.push(el.id))
    commit('setTrajectoryIds', ids)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
