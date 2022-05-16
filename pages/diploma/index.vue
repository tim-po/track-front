<template>
  <div class="diploma-page">
    <b-row no-gutters class="justify-content-between mb-0 align-items-center">
      <h6 class="mb-0">{{ trajectory.educational_plan }}</h6>
      <div>
        <button
          :class="{'course-button-active': number === currentCourse}"
          class="course-button ml-3"
          v-for="number in courses"
          :key="number"
          @click="currentCourse = number">
          {{ number }} Курс
        </button>
        <button class="course-button-diploma mr-2 ml-3">Диплом</button>
      </div>
    </b-row>
    <hr class="header-divider">
    <b-row class="mt-3">
      <b-col cols="7">
        <b-card class="diploma-card-left">
          <h6 class="mb-3">Сдам</h6>
          <b-row class="no-gutters">
            <b-card class="control-type-card mr-2">
              <h4>{{ controlTypes.controls ? controlTypes.controls['Экзамен'] : 0 }}</h4>
              <h6>Экзамен</h6>
            </b-card>
            <b-card class="control-type-card mr-2">
              <h4>{{ controlTypes.controls ? controlTypes.controls['Зачет'] : 0 }}</h4>
              <h6>Зачет</h6>
            </b-card>
            <b-card class="control-type-card mr-2">
              <h4>{{ controlTypes.controls ? controlTypes.controls['Курсовой проект'] : 0 }}</h4>
              <h6>Курсовая работа</h6>
            </b-card>
            <b-card class="control-type-card">
              <h4>{{ controlTypes.controls ? controlTypes.controls['Дифференцированный зачет'] : 0 }}</h4>
              <h6>Диф. зачет</h6>
            </b-card>
          </b-row>
        </b-card>
        <b-card class="diploma-card-left mt-4">
          <h6 class="mb-2">Изучу 52 дисциплины</h6>
          <b-card class="control-type-card">
            <h4>24</h4>
            <h6>Экзамен</h6>
          </b-card>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card></b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  layout: 'gray',
  name: "DiplomaPage",

  created() {
    if (Object.keys(this.trajectory).length === 0) {
      this.$store.dispatch('modules/trajectory/getTrajectory', { query: +this.$route.query.id, mode: 'set'})
    }
  },

  computed: {
    trajectory() {
      return this.$store.getters['modules/trajectory/trajectory']
    },

    controlTypes() {
      return this.$store.getters['modules/trajectory/controlTypes']
    },

    courses() {
      return this.$store.getters['modules/trajectory/courses']
    }
  }
}
</script>

<style scoped>
.course-button-diploma {
  border: 0;
  font-weight: 500;
  font-size: 14px;
  padding: 10px 12px;
  border-radius: 8px 8px 0px 0px;
  color: var(--color-5-dark);
  background-color: #EEE2FF;
}

.diploma-card-left {
  padding: 16px 24px 32px;
  border-radius: 16px;
  border: 0;
}

.course-button {
  background: transparent;
  border: 0;
  font-weight: 400;
  font-size: 14px;
  padding: 10px 12px;
  border-radius: 8px 8px 0px 0px;
}

.control-type-card {
  background: #78A3EC;
  border-radius: 16px;
  color: white;
  width: 160px;
}

.header-divider {
  padding: 0;
  margin: 0;
  background: white;
  height: 2px;
  border: 0;
}
</style>
