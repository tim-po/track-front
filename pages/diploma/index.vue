<template>
  <div class="diploma-page">
    <b-row no-gutters class="justify-content-between mb-0 align-items-center">
      <h5 class="mb-0">{{ diploma ? diploma.educational_plan : '' }}</h5>
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
    <b-row v-if="diploma" class="mt-3">
      <b-col cols="4">
        <b-card class="diploma-card">
          <h6 class="mb-2">Высшее образование</h6>
          <div class="text-small mb-1">Университет ИТМО, г. Санкт-Петербург</div>
          <div class="text-small">Бакалавриат</div>
        </b-card>
        <b-card class="diploma-card mt-4">
          <h6 class="mb-2">Освою ключевые навыки</h6>
          <div class="mt-3">
            <b-row no-gutters>
              <Keyword v-for="keyword in diploma.main_keywords" :key="keyword" :deletable="false" :keyword="{ text: keyword }" bg-color="#EBEBFF"/>
            </b-row>
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
          <h6 class="mb-3">Изучу 52 дисциплины</h6>
          <div class="d-flex flex-wrap">
            <b-card v-for="(item, key) in diploma.classes_count" :key="key" :style="'background:' + colors[key]" class="classes-type-card mb-3 mr-3">
              <h2>{{ item }}</h2>
              <span class="text-small">{{ key }}</span>
            </b-card>
          </div>
        </b-card>
        <b-card class="diploma-card mt-4">
          <h6 class="mb-3">Сдам</h6>
          <div class="d-flex flex-fill justify-content-between">
            <b-card v-for="(item, key) in diploma.control_types_count" :key="key" class="control-type-card mr-3 flex-grow-1">
              <h4>{{ item }}</h4>
              <h6>{{ key }}</h6>
            </b-card>
          </div>
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

  data: () => {
    return {
      currentCourse: 4
    }
  },

  components: {
    Keyword
  },

  created() {
    this.$store.commit('modules/header/setHeaderText', 'К траектории')
    this.$store.dispatch('modules/trajectory/getDiploma', { query: this.$route.query.id})
    this.$store.dispatch('modules/trajectory/getTrajectory', { query: this.$route.query.id})
  },

  computed: {
    diploma() {
      return this.$store.getters['modules/trajectory/diploma']
    },

    courses() {
      return this.$store.getters['modules/trajectory/courses']
    },

    colors() {
      return this.$store.getters['modules/trajectory/colors']
    },
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

.classes-type-card {
  min-height: 150px;
  border-radius: 16px;
  color: white;
  width: 196px;
  background: #78A3EC;
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

.text-small {
  font-size: 12px;
}
</style>
