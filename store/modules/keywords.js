let state = {}
let getters = {}
let mutations = {}
let actions = {}

state = () => ({
  keywords: []
})

getters = {
  keywords: (state) => state.keywords,
  findKeywords: (state) => (query) => {
    return state.keywords
  }
}

mutations = {
  setKeywords: (state, payload) => {
    state.keywords = payload
  }
}

actions = {
  setKeywords(context, payload) {
    context.commit('setKeywords', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
