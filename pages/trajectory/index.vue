<template>
  <div class="trajectory-page">
    <b-row no-gutters class="justify-content-between mb-0 align-items-center">
      <h6 class="mb-0">{{ trajectory.educational_plan }}</h6>
      <div>
        <button
          :class="{'course-button-active': number === currentCourse}"
          class="course-button ml-2"
          v-for="number in courses"
          :key="number"
          @click="currentCourse = number">
          {{ number }} Курс
        </button>
        <button class="course-button mr-2">Диплом</button>
      </div>
    </b-row>
    <hr class="header-divider">
    <b-row>
      <b-col cols="4">
        <p class="trajectory-small-header">Статистика</p>
        <div class="trajectory-card">
          <div v-for="(item, key) in amount" :key="key">
            {{ key !== 'count' ? key : '' }}
            <b-progress v-if="key !== 'count'" class="mt-2" :max="amount.count" :value="item"></b-progress>
          </div>
        </div>
        <b-row class="mt-1 justify-content-between" no-gutters>
          <div class="trajectory-card">
            <span class="control-number">{{ statistic.dif }}</span>
            <br>
            <span class="control-type">Диф. зачет</span>
          </div>
          <div class="trajectory-card">
            <span class="control-number">{{ statistic.coursework }}</span>
            <br>
            <span class="control-type">Курсовые работы</span>
          </div>
          <div class="trajectory-card">
            <span class="control-number">{{ statistic.exam }}</span>
            <br>
            <span class="control-type">Экзамен</span>
          </div>
          <div class="trajectory-card">
            <span class="control-number">{{ statistic.zachet }}</span>
            <br>
            <span class="control-type">Зачет</span>
          </div>
        </b-row>
        <p class="trajectory-small-header">Дисциплины</p>
        <div class="col trajectory-card mt-1">
          <b-row class="justify-content-between" no-gutters>Обязательные <span>{{ statistic.necessary }}</span></b-row>
          <b-row class="justify-content-between mt-2" no-gutters>Выборные <span>{{ statistic.selective }}</span></b-row>
        </div>
      </b-col>
      <b-col cols="8">
        <b-row class="pl-5">
          <b-col>
            <p class="trajectory-small-header">
              1 семестр
            </p>
          </b-col>
          <b-col>
            <p class="trajectory-small-header">
              2 семестр
            </p>
          </b-col>
        </b-row>
        <div class="class-card" v-for="el in classes" :key="el" :style="'background:' + colors[el]">
          <p class="class-header">
            {{ el }}
          </p>
          <b-row>
            <b-col v-for="index in 2" :key="index">
              <div v-b-modal:modal-discipline v-for="discipline in course[index-1].disciplines" :key="discipline.id">
                <div @click="getModal(discipline.id)" class="discipline-card" v-if="discipline.class.name === el">
                  <b-row no-gutters class="justify-content-between">
                    <div
                      :class="{'discipline-card-type': discipline.necessity, 'discipline-card-type-optional': !discipline.necessity}">
                      {{ discipline.necessity ? 'Обязательно' : 'Выборная' }}
                    </div>
                    <div class="discipline-card-control">
                      {{ discipline.control === 'Дифференцированный зачет' ? 'Диф. зачет' : discipline.control }}
                    </div>
                  </b-row>
                  <div
                    :class="{'discipline-card-name': discipline.necessity, 'discipline-card-name-optional': !discipline.necessity}">
                    {{ discipline.name }}
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>

    <b-modal v-if="discipline !== null" id="modal-discipline" content-class="discipline-modal" size="xl" hide-footer
             hide-header>
      <div class="discipline-image py-5 row no-gutters" :style="'background:' + colors[discipline.class.name]">
        <b-col>
          <div v-for="disc in discipline.prev_disciplines" class="discipline-card-modal mb-2 mx-auto">
            {{ disc.name }}
          </div>
        </b-col>
        <b-col>
          <div class="discipline-card-modal mx-auto">
            {{ discipline.name }}
          </div>
        </b-col>
        <b-col>
          <div v-for="disc in discipline.next_disciplines" class="discipline-card-modal mb-2 mx-auto">
            {{ disc.name }}
          </div>
        </b-col>
      </div>

      <div class="discipline-modal-content">
        <b-row class="justify-content-between align-items-center mb-4" no-gutters>
          <h5 class="mb-0" style="max-width: 700px">{{ discipline.name }}</h5>
          <div>
                <span class="discipline-detail"
                      :class="{'discipline-detail-green': !discipline.necessity, 'discipline-detail-pink': discipline.necessity}">
                  {{ discipline.necessity ? 'Обязательный предмет' : 'Предмет по выбору' }}
                </span>
            <span class="ml-3 discipline-detail discipline-detail-yellow">{{ discipline.control }}</span>
          </div>
        </b-row>
        <p class="modal-keywords-header">Полученные знания и навыки -
          <span class="modal-keywords-coverage" :style="'color:'+ colors[discipline.class.name]">
                Пересечение с ключевыми словами {{ Math.round(discipline.keywords_coverage * 100) }}%
              </span>
        </p>
        <b-row no-gutters>
          <div
            class="modal-keyword mr-2 mb-2"
            :style="'background:' + colors[discipline.class.name] + '!important'"
            v-for="keyword in discipline.keywords_aligned_with_user">
            {{ keyword.text }}
          </div>
          <div v-for="keyword in discipline.keywords">
            <div v-if="!discipline.keywords_aligned_with_user.includes(keyword)" class="mr-2 mb-2 modal-keyword">
              {{ keyword.text }}
            </div>
          </div>
        </b-row>
        <p v-if="discipline.prerequisites.length >0" class="modal-keywords-header">Пригодится при изученииее</p>
        <b-row no-gutters>
          <div
            class="modal-keyword mr-2 mb-2"
            v-for="keyword in discipline.prerequisites">
            {{ keyword.text }}
          </div>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'TrajectoryPage',

  data: () => {
    return {
      currentCourse: 1
    }
  },

  created() {
    this.$store.dispatch('modules/trajectory/getTrajectory', +this.$route.query.id)
  },

  computed: {
    amount() {
      return this.$store.getters['modules/trajectory/amount']
    },

    trajectory() {
      return this.$store.getters['modules/trajectory/trajectory']
    },

    course() {
      return this.$store.getters['modules/trajectory/course'](this.currentCourse)
    },

    courses() {
      return this.$store.getters['modules/trajectory/courses']
    },

    classes() {
      let classes = []

      if (this.course !== undefined) {
        this.course.forEach(semester => {
          semester.classes.forEach((el) => {
            if (!classes.includes(el.klass)) {
              classes.push(el.klass)
            }
          })
        })
      }

      return classes
    },

    colors() {
      return this.$store.getters['modules/trajectory/colors']
    },

    statistic() {
      return this.$store.getters['modules/trajectory/statistic']
    },

    discipline() {
      return this.$store.getters['modules/trajectory/discipline']
    }
  },

  methods: {
    getModal(id) {
      this.$store.dispatch('modules/trajectory/getDiscipline', id)
    }
  }
}
</script>

<style>
.course-button {
  background: transparent;
  border: 0;
  font-weight: 400;
  font-size: 14px;
  padding: 10px 12px;
  border-radius: 8px 8px 0px 0px;
}

.course-button-active {
  background: var(--gray-100);
  font-weight: 500;
}

.header-divider {
  padding: 0;
  margin: 0;
  background: var(--gray-100);
  height: 2px;
  border: 0;
}

.trajectory-small-header {
  font-weight: 500;
  font-size: 12px;
  color: var(--gray-dark);
  margin: 12px 0;
}

.class-card {
  border-radius: 16px;
  margin-bottom: 20px;
  padding: 24px 40px;
}

.class-header {
  font-weight: 600;
  font-size: 14px;
  color: white;
  padding-bottom: 12px;
  margin-bottom: 0;
  padding-left: 14px;
}

.class-header::first-letter {
  text-transform: capitalize;
}

.discipline-card {
  background: white;
  margin-bottom: 12px;
  border-radius: 8px;
  padding: 12px;
  max-width: 240px;
  min-width: 190px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
}

.trajectory-card {
  border: 1px solid var(--gray-100);
  border-radius: 12px;
  padding: 14px;
  font-weight: 500;
  font-size: 14px;
}

.control-type {
  font-weight: 500;
  font-size: 12px;
}

.control-number {
  font-weight: 600;
  font-size: 18px;
}

.discipline-card-name {
  border-left: 2px solid var(--color-10-dark);
  padding-left: 12px;
  font-size: 14px;
}

.discipline-card-name-optional {
  border-left: 2px solid var(--color-3-dark);
  padding-left: 12px;
  font-size: 14px;
}

.discipline-card-type {
  color: var(--color-10-dark);
  font-size: 11px;
  font-weight: 600;
}

.discipline-card-type-optional {
  color: var(--color-3-dark);
  font-size: 11px;
  font-weight: 600;
}

.discipline-card-control {
  color: #6E6D79;
  font-size: 10px;
}

.discipline-detail {
  font-weight: 500;
  font-size: 12px;
  border-radius: 4px;
  padding: 4px 6px;
}

.discipline-detail-yellow {
  background-color: var(--color-10-light);
}

.discipline-detail-green {
  background-color: var(--color-3-verylight);
}

.discipline-detail-pink {
  background-color: var(--color-4-light);
}

.modal-keywords-header {
  font-weight: 500;
  font-size: 14px;
}

.modal-keywords-coverage {
  font-weight: 600;
  font-size: 14px;
}

.modal-keyword {
  padding: 10px 12px;
  background: var(--gray-100);
  border-radius: 10px;
  font-weight: 500;
  font-size: 12px;
}

.discipline-card-modal {
  padding: 18px 20px;
  background: #FFFFFF;
  border-radius: 8px;
  max-width: 240px;
}

.discipline-modal {
  border-radius: 20px;
}

.discipline-modal .modal-body {
  padding: 0;
  border-radius: 20px;
}

.discipline-image {
  border-radius: 19px 19px 0px 0px;
}

.discipline-modal-content {
  padding: 32px 36px 36px 36px;
}
</style>
