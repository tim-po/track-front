let state = {}
let getters = {}
let mutations = {}
let actions = {}

state = () => ({
  trajectory: {},
  trajectories: [],
  discipline: null,
  colors: {
    "программирование и информационные технологии": "#7BA3E7",
    "soft-skills": "#F49987",
    "естественные науки": "#9480EF",
    "электроника и робототехника": "#6290D0",
    "математика": "#8A73ED",
    "физика": "#52B3D3",
    "экономика и менеджмент": "#F18AA7",
    "гуманитарные науки": "#F18069",
    "физкультура": "#E185CD",
    "введение в профессиональную деятельность": "#CF7DDC",
    "практика": "#989CF8",
    "другое": "#7F4BD2"
  }
})

getters = {
  trajectories: (state) => state.trajectories,
  trajectory: (state) => state.trajectory,
  discipline: (state) => state.discipline,

  course: (state) => (number) => {
    if (Object.keys(state.trajectory).length > 0) {
      return state.trajectory.courses.find(el => el.course === number)
    }
  },

  courses: (state) => {
    let courses = []

    if (Object.keys(state.trajectory).length > 0) {
      state.trajectory.courses.forEach(el => {
        courses.push(el.course)
      })
    }

    return courses
  },

  colors: (state) => {
    return state.colors
  }
}

mutations = {
  setTrajectory: (state, payload) => {
    state.trajectory = payload
  },

  setTrajectories: (state, payload) => {
    state.trajectories = payload
  },

  pushTrajectories: (state, payload) => {
    state.trajectories.push(payload)
  },

  setDiscipline: (state, payload) => {
    state.discipline = payload
  }
}

actions = {
  async getTrajectory(context, {query, mode}) {
    try {
      const response = await this.$axios.get(`/api/trajectories/${query}/`)
      if (mode === 'push') {
        context.commit('pushTrajectories', response.data)
      } else {
        context.commit('setTrajectory', response.data)
      }
    } catch {
      alert('Error in trajectory request')
    }
  },

  async getTrajectories(context, {query}) {
    try {
      const response = await this.$axios.get(`/api/trajectories/?ids=${query[0]},${query[1]},${query[2]}`)
      context.commit('setTrajectories', response.data)
    } catch {
      alert('Error in trajectory request')
    }
  },

  async getDiscipline(context, query) {
    try {
      const response = await this.$axios.get(`/api/trajectory_disciplines/${query}/`)
      context.commit('setDiscipline', response.data)
    } catch {
      alert('Error in discipline request')
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
