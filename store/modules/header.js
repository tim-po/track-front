let state = {}
let getters = {}
let mutations = {}
let actions = {}

state = () => ({
  headerText: '',
  layoutBg: '#FFFFFF'
})

getters = {
  headerText: (state) => state.headerText,
  bgColor: (state) => state.layoutBg
}

mutations = {
  setHeaderText: (state, payload) => {
    state.headerText = payload
  },
  setBgGray: (state) => {
    state.layoutBg = '#F1F2F8'
  },
  setBgWhite: (state) => {
    state.layoutBg = '#FFFFFF'
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
