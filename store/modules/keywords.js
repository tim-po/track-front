let state = {}
let getters = {}
let mutations = {}
let actions = {}

import {debounce} from "lodash";

state = () => ({
  keywords: [],
  queryKeywords: [],
  addedKeywords: [],
  trajectoryId: 0
})

getters = {
  keywords: (state) => state.keywords,
  queryKeywords: (state) => state.queryKeywords,
  addedKeywords: (state) => state.addedKeywords,
  trajectoryId: (state) => state.trajectoryId,
}

mutations = {
  setQueryKeywords: (state, payload) => {
    state.queryKeywords = payload
  },

  setTrajectoryId: (state, payload) => {
    state.trajectoryId = payload
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
        alert('Error in keywords' + query)
      }
    }
  },


  debounceKeywords: debounce(({dispatch}, query) => {
    dispatch("getKeywords", query);
  }, 300),


  async sendKeywords({state, commit}) {
    let postKeywords = []
    state.keywords.forEach(e => postKeywords.push(e.id))
    state.addedKeywords.forEach(e => postKeywords.push(e.id))

    const response = await this.$axios.post('/api/trajectories/', {'keywords': postKeywords})

    commit('modules/trajectory/setTrajectory', response.data[0], {root: true})
    commit('setTrajectoryId', response.data[0].id)
    console.log(response)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
