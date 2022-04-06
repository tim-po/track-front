let state = {}
let getters = {}
let mutations = {}
let actions = {}

state = () => ({
  trajectory: {},
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

  amount: (state) => {
    let amount = []

    if (Object.keys(state.trajectory).length > 0) {
      state.trajectory.semesters.forEach(semester => {
        semester.disciplines.forEach(discipline => {

          if (amount.find(el => el.name === discipline.class.name) !== undefined) {
            for (const obj of amount) {
              if (obj.name === discipline.class.name) {
                obj.amount += 1;
                break;
              }
            }
          } else {
            amount.push({
              name: discipline.class.name,
              amount: 1,
            })
          }
        })
      })
    }

    return amount
  },

  statistic: (state) => {
    let necessary = 0
    let selective = 0
    let exam = 0
    let dif = 0
    let zachet = 0
    let coursework = 0

    if (Object.keys(state.trajectory).length > 0) {

      state.trajectory.semesters.forEach(semester => {
        semester.disciplines.forEach(discipline => {
          if (discipline.necessity) {
            necessary += 1
          } else {
            selective += 1
          }

          if (discipline.control === "Экзамен") {
            exam += 1
          } else if (discipline.control === "Зачет") {
            zachet += 1
          } else if (discipline.control === "Дифференцированный зачет") {
            dif += 1
          } else if (discipline.control === "Курсовой проект") {
            coursework += 1
          }
        })
      })

    }

    return {selective, necessary, dif, zachet, coursework, exam}
  }
}

mutations = {
  setTrajectory: (state, payload) => {
    state.trajectory = payload
  },

  setDiscipline: (state, payload) => {
    state.discipline = payload
  }
}

actions = {
  async getTrajectory(context, query) {
    try {
      const response = await this.$axios.get(`/api/trajectories/${query}/`)
      context.commit('setTrajectory', response.data)
    } catch {
      alert('Error in trajectory request')
    }
  },

  async getDiscipline(context, query) {
    try {
      const response = await this.$axios.get(`/api/trajectory_disciplines/${query}/`)
      context.commit('setDiscipline', response.data)
    } catch {
      alert('Error in trajectory request')
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
