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
      <b-col cols="4">
        <b-card class="diploma-card">
          <h6 class="mb-2">Высшее образование</h6>
          <div class="small mb-1">Университет ИТМО, г. Санкт-Петербург</div>
          <div class="small">Бакалавриат</div>
        </b-card>
        <b-card class="diploma-card mt-4">
          <h6 class="mb-2">Освою ключевые навыки</h6>
          <div class="mt-3">
            <Keyword :deletable="false" :keyword="{ text: 'HTML' }" bg-color="'var(--color-secondary)'"/>
          </div>
        </b-card>
        <b-card class="diploma-card mt-4">
          <h6 class="mb-2">
            Это твоя траектория в университете ИТМО!
            <br>
            Поступай к нам чтобы изучать то, что нравится.
          </h6>
          <div class="d-flex my-3">
            <button class="main-button main-button-diploma mr-2">Поступай в ИТМО</button>
            <button class="secondary-button secondary-button-diploma">Поделиться</button>
          </div>
        </b-card>
      </b-col>
      <b-col cols="8">
        <b-card class="diploma-card">
          <h6 class="mb-2">Изучу 52 дисциплины</h6>
          <b-card class="control-type-card">
            <h4>24</h4>
            <h6>Экзамен</h6>
          </b-card>
        </b-card>
        <b-card class="diploma-card mt-4">
          <h6 class="mb-2">Сдам</h6>
          <b-card class="control-type-card">
            <h4>24</h4>
            <h6>Экзамен</h6>
          </b-card>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Keyword from "@/components/Keyword";

export default {
  layout: 'grayLogoRight',
  name: "DiplomaPage",

  components: {
    Keyword
  },

  headerData: {
    goBackText: 'К траектории'
  },

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
.diploma-page {
  max-width: 1500px;
  margin: 0 auto;
}

.course-button-diploma {
  border: 0;
  font-weight: 500;
  font-size: 14px;
  padding: 10px 12px;
  border-radius: 8px 8px 0px 0px;
  color: var(--color-5-dark);
  background-color: white;
}

.diploma-card {
  border-radius: 16px;
  padding: 0 4px 4px 4px;
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

.main-button-diploma {
  font-size: 14px;
  padding: 10px 12px;
}

.secondary-button-diploma {
  font-size: 14px;
  padding: 10px 12px;
}
</style>
