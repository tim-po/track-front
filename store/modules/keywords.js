import keywords from "@/pages/keywords";

let state = {}
let getters = {}
let mutations = {}
let actions = {}

state = () => ({
  keywords: [],
  queryKeywords: [],
  addedKeywords: []
})

getters = {
  keywords: (state) => state.keywords,
  queryKeywords: (state) => state.queryKeywords,
  addedKeywords: (state) => state.addedKeywords
}

mutations = {
  setQueryKeywords: (state, payload) => {
    state.queryKeywords = payload
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
    console.log(payload)
    state.queryKeywords = state.queryKeywords.filter(word => word !== payload)
  }
}

actions = {
  async getKeywords(context, query) {
    try {
      const response = await this.$axios.get(`/api/keywords/?text_like=${query}`)
      context.commit('setQueryKeywords', response.data)
    } catch {
      alert('Error in keywords' + query)
    }
  },

  async sendKeywords({state, commit}) {
    let postKeywords = []
    state.keywords.forEach(e => postKeywords.push(e.id))
    state.addedKeywords.forEach(e => postKeywords.push(e.id))

    const response = await this.$axios.post('/api/trajectories/', {'keywords': postKeywords})
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
