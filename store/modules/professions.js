let state = {}
let getters = {}
let mutations = {}
let actions = {}

state = () => ({
  professions: [],
  selectedProfession: null,
  colors: {
    'Программирование': '#C1D5F6',
    'Менеджмент': 'rgba(245, 179, 20, 0.3)',
    'Оптика': '#C5E9F0',
    'Биотехнологии': '#C6F0B3',
  }
})

getters = {
  professions: (state) => state.professions,
  selectedProfession: (state) => state.selectedProfession,
  color: (state) => (category) => {
    return state.colors[category]
  }
}

mutations = {
  setProfessions: (state, payload) => {
    state.professions = payload
  },

  setSelectedProfession: (state, payload) => {
    state.selectedProfessions = payload
  }
}

actions = {
  async getProfessions(context) {
    try {
      const response = await this.$axios.get('/api/professions/')
      context.commit('setProfessions', response.data)
    } catch {
      alert('Error')
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
