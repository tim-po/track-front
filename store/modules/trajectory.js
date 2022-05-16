let state = {}
let getters = {}
let mutations = {}
let actions = {}

state = () => ({
  trajectory: {},
  trajectories: [],
  discipline: null,
  colors: {
    "программирование и информационные технологии": "var(--color-6)",
    "soft-skills": "var(--color-2)",
    "естественные науки": "var(--color-3)",
    "электроника и робототехника": "var(--color-11)",
    "математика": "var(--color-7)",
    "физика": "var(--color-8)",
    "экономика и менеджмент": "var(--color-12)",
    "гуманитарные науки": "var(--color-10)",
    "физкультура": "var(--color-13)",
    "введение в профессиональную деятельность": "var(--color-5)",
    "практика": "var(--color-4)",
    "другое": "#425471"
  }
})

getters = {
  trajectories: (state) => state.trajectories,
  trajectory: (state) => state.trajectory,
  discipline: (state) => state.discipline,

  course: (state) => (number) => {
    if (Object.keys(state.trajectory).length > 0) {
      return state.trajectory.semesters.filter(el => el.semester === number * 2 - 1 || el.semester === number * 2)
    }
  },

  courses: (state) => {
    let courses = []

    if (Object.keys(state.trajectory).length > 0) {
      state.trajectory.semesters.forEach(semester => {
          if (semester.semester % 2 !== 0) {
            courses.push(semester.semester / 2 + 0.5)
          }
        }
      )
    }
    return courses
  },

  colors: (state) => {
    return state.colors
  },

  controlTypes: (state) => {
    let count = 0
    let controls = {}

    if (Object.keys(state.trajectory).length > 0) {
      state.trajectory.semesters.forEach(semester => {
        console.log(semester)
        for (const key in semester.control_types) {
          if (controls[key]) {
            controls[key] += semester.control_types[key]
            count += semester.control_types[key]
          } else {
            controls[key] = semester.control_types[key]
          }
        }
        }
      )
    }

    return {count, controls}
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
