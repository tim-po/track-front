<template>
  <div>
    <p class="trajectories__link-back" @click="$router.go(-1)">&lt; Выбор ключевых слов</p>
    <b-card class="trajectories-card mb-3" v-for="trajectory in trajectories" :key="trajectory.id">
      <b-row class="justify-content-between align-items-center" no-gutters>
        <h5 class="trajectories-card__trajectory-header mb-0">
        {{ trajectory.educational_plan }}
        </h5>
        <div>
          <img src="/trajectories-progress.svg" alt="">
          <span class="ml-2">
            {{ Math.round(coverage(trajectory) * 100) }}% совпадений
          </span>
        </div>
      </b-row>
      <div class="mt-3 trajectories-card__courses-row">
        <b-card class="course-card mr-3" v-for="(course, index) in courses(trajectory)" :key="index">
          <div class="course-card__header">
            {{ index + 1}} курс
          </div>
          <div class="mt-2">
            Ты изучишь
          </div>
          <div class="mt-2">
            <span class="course-card__keyword-card mr-2 mb-2">
              Программмирование
            </span>
          </div>
          <div class="mt-3">
            Ты сдашь
          </div>
          <div class="my-2 d-flex">
            <div class="course-card__control-card mr-2 mb-2">
              <b style="font-size: 18px; font-weight: 600">
                {{ course.control_types['Экзамен'] ? course.control_types['Экзамен'] : 0 }}
              </b>
              <br>
              Экзамены
            </div>
            <div class="course-card__control-card mr-2 mb-2">
              <b style="font-size: 18px; font-weight: 600">
                {{ course.control_types['Дифференцированный зачет'] ? course.control_types['Дифференцированный зачет'] : 0 }}
              </b>
              <br>
              Диф.зачет
            </div>
            <div class="course-card__control-card mr-2 mb-2">
              <b style="font-size: 18px; font-weight: 600">
                {{ course.control_types['Зачет'] ? course.control_types['Зачет'] : 0 }}
              </b>
              <br>
              Зачеты
            </div>
            <div class="course-card__control-card mr-2 mb-2">
              <b style="font-size: 18px; font-weight: 600">
                {{ course.control_types['Курсовой проект'] ? course.control_types['Курсовой проект'] : 0 }}
              </b>
              <br>
              Курсовые
            </div>
          </div>
        </b-card>
      </div>
      <b-row class="mt-3 justify-content-between" no-gutters>
        <div>
          <button @click="trajectoryChosen(trajectory)" class="button-trajectory mr-2">
            Смотреть траекторию
          </button>
          <button class="button-abit">
            Читать больше на abit.itmo.ru
          </button>
        </div>
        <button class="button-abit">О программе</button>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  layout: 'gray',
  name: "Trajectories",

  created() {
    if (this.trajectories.length === 0) {
      let trajectoriesIds = JSON.parse(this.$route.query.ids)
      trajectoriesIds.forEach(id => this.$store.dispatch('modules/trajectory/getTrajectory', {query: +id, mode: 'push'}))
    }
  },

  methods: {
    trajectoryChosen(trajectory) {
      this.$store.dispatch('modules/trajectory/setTrajectory', { query: trajectory.id, mode: 'set'})
      this.$router.push({path: '/trajectory', query: {id: trajectory.id}})
    },

    coverage (trajectory) {
      let coverage = 0;
      let count = 0;

      trajectory.semesters.forEach(sem => {
        let disciplines = 0;

        for (const key in sem.control_types) {
          disciplines += sem.control_types[key];
        }

        coverage += sem.coverage * disciplines
        count += +disciplines
      })

      return coverage / count
    },

    courses (trajectory) {
      let result = []

      for (let i = 0; i < trajectory.semesters.length; i += 2) {
        let crs = {}
        let semestersCopy = [ ...trajectory.semesters]

        crs.control_types = { ...semestersCopy[i].control_types}

        for (const key in semestersCopy[i+1].control_types) {
          if (crs.control_types[key]) {
            crs.control_types[key] += semestersCopy[i+1].control_types[key]
          } else {
            crs.control_types[key] = semestersCopy[i+1].control_types[key]
          }
        }

        result.push(crs)
      }

      return result
    }
  },

  computed: {
    trajectories() {
      return this.$store.getters['modules/trajectory/trajectories']
    }
  }
}
</script>

<style scoped>
.trajectories-card {
  border-radius: 16px;
}

.trajectories__link-back {
  color: #6E6D79;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
}

.trajectories-card__trajectory-header {
  font-weight: 700;
  font-size: 20px;
}

.trajectories-card__courses-row {
  display: flex;
  overflow-x: scroll;
}

.course-card {
  border: 0;
  background-color: var(--color-1);
  color: white;
  min-width: 420px;
  border-radius: 16px;
}

.course-card__header {
  font-weight: 700;
  font-size: 18px;
}

.course-card__keyword-card {
  background: white;
  color: #1F1F22;
  font-weight: 500;
  font-size: 12px;
  padding: 8px 12px;
  border-radius: 8px;
}

.course-card__control-card {
  background: white;
  color: #1F1F22;
  font-weight: 500;
  font-size: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  width: 100px;
}

.button-trajectory {
  border: 0;
  background: 0;
  color: var(--color-5-dark);
  transition: 0.3s;
  padding: 8px 12px;
  font-weight: 700;
  font-size: 14px;
  border-radius: 8px;
}

.button-trajectory:hover {
  background: var(--color-secondary);
  transition: 0.3s;
}

.button-abit {
  border: 0;
  background: 0;
}
</style>
