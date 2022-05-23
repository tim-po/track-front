let state = {}
let getters = {}
let mutations = {}
let actions = {}

state = () => ({
  headerText: '',
})

getters = {
  headerText: (state) => state.headerText,
}

mutations = {
  setHeaderText: (state, payload) => {
    state.headerText = payload
  }
}

actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
