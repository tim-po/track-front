let state = {}
let getters = {}
let mutations = {}
let actions = {}

state = () => ({
  keywords: ['тест', 'тесто'],
  queryKeywords: []
})

getters = {
  keywords: (state) => state.keywords,
  queryKeywords: (state) => state.queryKeywords
}

mutations = {
  setKeywords: (state, payload) => {
    state.keywords = payload
  },

  setQueryKeywords: (state, payload) => {
    state.queryKeywords = payload
  }
}

actions = {
  async getKeywords(context, query) {
    try {
      const response = await this.$axios.get('/api/keywords/')
      context.commit('setQueryKeywords', response.data)
    } catch {
      // alert('Error')
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
