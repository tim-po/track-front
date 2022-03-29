let state = {}
let getters = {}
let mutations = {}
let actions = {}

state = () => ({
  professions: [],
  colors: {
    'Программирование': 'var(--color-7-light)',
    'Менеджмент': 'var(--color-10-light)',
    'Оптика': 'var(--color-6-light)',
    'Биотехнологии': 'var(--color-3-light)',
  }
})

getters = {
  profession: (state) => (id) => {
    return state.professions.find(el => el.id === id)
  },
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
    state.selectedProfession = payload
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
