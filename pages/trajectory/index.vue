<template>
  <div class="trajectory-page">
    <b-row no-gutters class="justify-content-between mb-0 align-items-center">
      <h5 class="mb-0">{{ trajectory.educational_plan }}</h5>
      <div class="courses-row">
        <CourseSelector :bgColor="courseNumberFromQuery === 5 ? '#FFFFFF': '#F3F3F8'" :leftOffset="selectorLeftOffset"/>
        <button
          :class="{
            'course-button-active': number === +$route.query.course,
          }"
          class="course-button"
          v-for="number in courses"
          :key="number"
          @click="
            courseNumberFromQuery =
              number &&
              $router.replace({
                path: '/trajectory',
                query: { id: trajectory.id, course: number },
              })
              &&
              $store.commit('modules/header/setBgWhite');
          "
        >
          {{ number }} Курс
        </button>
        <button
          class="course-button-diploma"
          @click="$router.replace({ path: '/trajectory', query: { id: trajectory.id, course: '5' }})"
        >
          Диплом
        </button>
      </div>
    </b-row>
    <hr class="header-divider" :style="courseNumberFromQuery === 5 ? {'background-color': '#FFFFFF'}: {'background-color': 'var(--gray-100)'}" />
    <b-row v-if="course && courseNumberFromQuery !== 5">
      <b-col cols="4">
        <h6 class="mt-3">Статистика</h6>
        <div
          class="trajectory-card"
        >
          <div class="stats-circles">
            <div
              class="circle"
              v-for="klass in layoutData.children"
              :key="klass.data.name"
              @mouseenter="(e) => {setFocusedCircle(klass)}"
              @mouseleave="(e) => {
                if(focusedCircle === klass){
                   focusedCircle = undefined
                }
              }"
              :style="{
                'background': `${isFocusedOnCircleOf(klass) ? colors[klass.data.name]: '#F3F3F4'}`,
                'left': `${getTransitionOf(klass).x}px`,
                'top': `${getTransitionOf(klass).y}px`,
                'width': `${klass.r *2}px`,
                'height': `${klass.r *2}px`,
              }"
              :class="(isFocusedOnCircleOf(klass)) ? 'focused': ''"
            >
              <div class="circle-value">
                {{ klass.data.amount }}
              </div>
              <div class="circle-text">
                {{
                  (klass.data.name.length < klass.r / 3.2 || (!focusedCircleLoading && isFocusedOnCircleOf(klass)))
                    ? klass.data.name
                    : `${klass.data.name.substring(0, klass.r / 4)}...`
                }}
              </div>
            </div>
          </div>
        </div>
        <b-row class="mt-2 justify-content-between" no-gutters>
          <ControlTypeTile
            control-type="Экзамены"
            :count="
              course.control_type_count['Экзамен']
                ? course.control_type_count['Экзамен']
                : 0
            "
            additional-classnames="trajectory-card-border"
          />
          <ControlTypeTile
            control-type="Зачеты"
            :count="
              course.control_type_count['Зачет']
                ? course.control_type_count['Зачет']
                : 0
            "
            additional-classnames="trajectory-card-border"
          />
          <ControlTypeTile
            control-type="Диф.зачет"
            :count="
              course.control_type_count['Дифференцированный зачет']
                ? course.control_type_count['Дифференцированный зачет']
                : 0
            "
            additional-classnames="trajectory-card-border"
          />
          <ControlTypeTile
            control-type="Курсовые"
            :count="
              course.control_type_count['Курсовая работа']
                ? course.control_type_count['Курсовая работа']
                : 0
            "
            additional-classnames="trajectory-card-border"
          />
        </b-row>
        <h6 class="mt-4">Дисциплины</h6>
        <div class="col trajectory-card mt-1">
          <b-row class="justify-content-between mb-24" no-gutters
            >Обязательные
            <span>{{
              course.necessity_count.necessary
                ? course.necessity_count.necessary
                : 0
            }}</span></b-row
          >
          <b-row class="justify-content-between" no-gutters
            >По выбору
            <span>{{
              course.necessity_count.chosen ? course.necessity_count.chosen : 0
            }}</span>
          </b-row>
        </div>
      </b-col>
      <b-col cols="8">
        <b-row class="pl-5">
          <b-col>
            <p class="trajectory-small-header mt-3">Осенний семестр</p>
          </b-col>
          <b-col>
            <p class="trajectory-small-header mt-3">Весенний семестр</p>
          </b-col>
        </b-row>
        <div
          class="class-card"
          v-for="sphere in course.classes"
          :key="sphere.name"
          :style="'background:' + colors[sphere.name]"
        >
          <p class="class-header">
            {{ sphere.name }}
          </p>
          <b-row>
            <b-col
              v-for="index in [
                'first_semesters_disciplines',
                'second_semesters_disciplines',
              ]"
              :key="index"
            >
              <div
                v-b-modal:modal-discipline
                class="modal-card-button"
                v-for="discipline in sphere[index]"
                :key="discipline.id"
              >
                <div @click="getModal(discipline.id)" class="discipline-card">
                  <b-row no-gutters class="justify-content-between">
                    <div
                      :class="{
                        'discipline-card-type':
                          discipline.necessity === 'necessary',
                        'discipline-card-type-optional':
                          discipline.necessity === 'chosen',
                      }"
                    >
                      {{
                        discipline.necessity === "necessary"
                          ? "Обязательная"
                          : "По выбору"
                      }}
                    </div>
                    <div class="discipline-card-control">
                      {{
                        discipline.control === "Дифференцированный зачет"
                          ? "Диф. зачет"
                          : discipline.control
                      }}
                    </div>
                  </b-row>
                  <div
                    :class="{
                      'discipline-card-name':
                        discipline.necessity === 'necessary',
                      'discipline-card-name-optional':
                        discipline.necessity === 'chosen',
                    }"
                  >
                    {{ discipline.name }}
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>

    <Diploma v-if="courseNumberFromQuery === 5" />

    <b-modal
      v-if="discipline !== null"
      id="modal-discipline"
      content-class="discipline-modal"
      size="xl"
      centered
      hide-footer
      hide-header
    >
      <button type="button" class="close"  @click="$bvModal.hide('modal-discipline')">
      </button>
      <div
        class="discipline-image row no-gutters"
        :style="'background:' + colors[discipline.class.name]"
      >
        <b-col class="justify-content-center d-flex flex-column">
          <p
            :class="{
              'modal-col-header-deactive': !discipline.prev_disciplines,
            }"
            class="text-center modal-col-header"
          >
            Сначала изучить
          </p>
          <div
            v-for="disc in discipline.prev_disciplines"
            class="discipline-card-modal mb-2 mx-auto"
          >
            {{ disc.name }}
          </div>
        </b-col>
        <b-col
          class="discipline-modal-column justify-content-center d-flex flex-column"
        >
          <p class="text-center modal-col-header">{{ courseNumberFromQuery }} курс</p>
          <div class="discipline-card-modal mx-auto">
            {{ discipline.name }}
            <button class = "discipline-card-modal__open-btn" @click="(e) => e.target.parentNode.classList.toggle('visible')"/>
            <div class="discipline-card-additionally mx-auto">
              <div class="discipline-card-additionally__item"
                   v-for="discAdd in discipline.replacement_options">
                {{discAdd.name}}
              </div>
            </div>
          </div>

        </b-col>
        <b-col class="justify-content-center d-flex flex-column">
          <p
            :class="{
              'modal-col-header-deactive': !discipline.next_disciplines,
            }"
            class="text-center modal-col-header"
          >
            Где пригодится
          </p>
          <div
            v-for="disc in discipline.next_disciplines"
            class="discipline-card-modal mb-2 mx-auto"
          >
            {{ disc.name }}
          </div>
        </b-col>
      </div>

      <div class="discipline-modal-content">
        <b-row
          class="justify-content-between align-items-center mb-4"
          no-gutters
        >
          <h5 class="mb-0" style="max-width: 700px">{{ discipline.name }}</h5>
          <div>
            <span
              class="discipline-detail"
              :class="{
                'discipline-detail-green': !discipline.necessity,
                'discipline-detail-pink': discipline.necessity,
              }"
            >
              {{
                discipline.necessity
                  ? "Обязательный предмет"
                  : "Предмет по выбору"
              }}
            </span>
            <span class="ml-3 discipline-detail discipline-detail-yellow">{{
              discipline.control
            }}</span>
          </div>
        </b-row>
        <p class="modal-keywords-header">
          Полученные знания и навыки -
          <span
            class="modal-keywords-coverage"
            :style="'color:' + colors[discipline.class.name]"
          >
            Пересечение с ключевыми словами
            {{ Math.round(discipline.keywords_coverage * 100) }}%
          </span>
        </p>
        <b-row no-gutters>
          <div
            class="modal-keyword mr-2 mb-2"
            :style="
              'background:' + colors[discipline.class.name] + '!important'
            "
            v-for="keyword in discipline.keywords_aligned_with_user"
          >
            {{ keyword}}
          </div>
          <div v-for="keyword in discipline.keywords">
            <div
              :style="
              'background:' + colors[discipline.class.name]+'20' + '!important'
            "
              v-show="keyword !== ''"
              v-if="
                !keywordInArray(keyword, discipline.keywords_aligned_with_user)
              "
              class="mr-2 mb-2 modal-keyword"
            >
              {{ keyword }}
            </div>
          </div>
        </b-row>
        <p
          v-if="discipline.prerequisites.length > 0"
          class="modal-keywords-header"
        >
          Пригодится при изучении
        </p>
        <b-row no-gutters>
          <div
            class="modal-keyword mr-2 mb-2"
            v-for="keyword in discipline.prerequisites"
          >
            {{ keyword}}
          </div>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { hierarchy, pack } from "d3-hierarchy";
import ControlTypeTile from "@/components/ControlTypeTile";
import CourseSelector from "@/components/Trajectory/CourseSelector";
import Diploma from "../../components/Trajectory/Diploma";

export default {
  // TODO: + модалка: центрировать, + добавить крестик как в дизайне, + сделать цвет тегов как в дизайне (20% прозрачность), сделать заголовки как в дизайне, добавить выпадашку как в дизайне, по id из поля replacement_options

  name: "TrajectoryPage",

  components: {
    ControlTypeTile,
    CourseSelector,
    Diploma,
  },

  data: () => {
    return {
      currentCourse: 1,
      focusedCircle: undefined,
      focusedCircleLoading: false,
      focusedCircleRadius: 90
    };
  },

  headerData: {
    goBackText: "Все траектории",
  },

  created() {
    this.$store.commit("modules/header/setHeaderText", "Все траектории");
    this.$store.dispatch("modules/trajectory/getTrajectory", {
      query: +this.$route.query.id,
      mode: "set",
    });

    this.$store.dispatch("modules/trajectory/getDiscipline", 1);

    this.$store.dispatch("modules/trajectory/getDiploma", {
      query: this.$route.query.id,
    });
  },

  computed: {
    courseNumberFromQuery() {
      return +this.$route.query.course
    },
    selectorLeftOffset() {
      const courseNumber = +this.$route.query.course
      return (90 * (+this.$route.query.course-1)) + (courseNumber === 5 ? 24: 0)
    },

    transformedClassData() {
      return {
        name: "Top Level",
        children: this.amount.map((klass) => ({
          ...klass,
          size: klass.amount,
          parent: "Top Level",
        })),
      };
    },

    layoutData() {
      // Generate a D3 hierarchy
      const rootHierarchy = hierarchy(this.transformedClassData)
        .sum((d) => d.size)
        .sort((a, b) => {
          return b.value - a.value;
        });

      // Pack the circles inside the viewbox
      return pack().size([400, 400]).padding(8)(rootHierarchy);
    },

    amount() {
      let amount = [];

      if (this.course !== undefined) {
        for (const klass in this.course.classes_count) {
          amount.push({
            name: klass,
            amount: this.course.classes_count[klass],
          });
        }
      }

      return amount;
    },

    trajectory() {
      return this.$store.getters["modules/trajectory/trajectory"];
    },

    course() {
      return this.$store.getters["modules/trajectory/course"](
        +this.$route.query.course
      );
    },

    courses() {
      return this.$store.getters["modules/trajectory/courses"];
    },

    colors() {
      return this.$store.getters["modules/trajectory/colors"];
    },

    discipline() {
      return this.$store.getters["modules/trajectory/discipline"];
    },
  },

  methods: {
    getTransitionOf(klass){
      let xTrans = klass.x - klass.r
      let yTrans = klass.y -  klass.r

      if(this.focusedCircle === undefined){
        return {x: xTrans, y: yTrans}
      }

      let focusCircleXtrans = this.focusedCircle.x - this.focusedCircleRadius
      let focusCircleYtrans = this.focusedCircle.y - this.focusedCircleRadius

      if(this.focusedCircle.x - this.focusedCircleRadius < 0){
        focusCircleXtrans = 0
      }
      if(this.focusedCircle.y - this.focusedCircleRadius < 0){
        focusCircleYtrans = 0
      }

      if(this.focusedCircle.x + this.focusedCircleRadius > 400){
        focusCircleXtrans = 450 - (this.focusedCircleRadius * 2)
      }
      if(this.focusedCircle.y + this.focusedCircleRadius > 400){
        focusCircleYtrans = 400 - (this.focusedCircleRadius * 2)
      }

      if(this.isFocusedOnCircleOf(klass)){
        return {x: focusCircleXtrans, y: focusCircleYtrans}
      }

      let rDiff = (this.focusedCircleRadius - this.focusedCircle.r)
      let xDiff = klass.x - this.focusedCircle.x
      let yDiff = klass.y - this.focusedCircle.y

      xTrans += xDiff/2 * (rDiff / Math.abs(xDiff)) * Math.sqrt(400-xDiff)/20
      yTrans += yDiff/2 * (rDiff / Math.abs(yDiff)) * Math.sqrt(400-yDiff)/20

      return {x: xTrans, y: yTrans}
    },
    isFocusedOnCircleOf(klass){
      return this.focusedCircle && this.focusedCircle.data.name === klass.data.name
    },
    setFocusedCircle(klass) {
      if(this.focusedCircle === undefined) {
        this.focusedCircle = klass
        this.focusedCircleLoading = true
        setTimeout(() => {
          this.focusedCircleLoading = false
        }, 300)
      }
    },
    getModal(id) {
      this.$store.dispatch("modules/trajectory/getDiscipline", id);
    },

    keywordInArray(keyword, array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].text === keyword.text) {
          return true;
        }
      }

      return false;
    },
  },
};
</script>

<style>

.courses-row {
  position: relative;
  z-index: 2;

  /*width: 435px*/
}

.modal-card-button {
  outline: none !important;
}

svg {
  display: block;
  margin: 0 auto;
}

.stats-circles{
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
}

.circle {
  position: absolute;
  transition: all 0.3s ease-in-out, z-index 0s;
  transform-origin: center;
  font-weight: 400;
  font-size: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #F3F3F4;
  z-index: 1;
}

.circle-value{
  background: none;
  font-size: 24px;
  font-weight: 700;
}

.circle-text{
  max-width: calc(100% - 8px);
  text-align: center;
}

.circle.focused {
  z-index: 2;
  /*left: calc(50% - 150px) !important;*/
  /*top: calc(50% - 150px) !important;*/
  /*transform: translate(calc(50% - 150px), calc(50% - 150px)) !important;*/
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  width: 180px !important;
  height: 180px !important;
  color: white;
}

.klass-text {
  transition: transform 0.2s ease-in-out;
  text-anchor: middle;
  font-weight: 400;
  font-size: 10px;
}

.trajectory-page {
  max-width: 1500px;
  margin: 0 auto;
  margin-top: 24px;
}

.discipline-modal-column {
  border-left: 1px solid white;
  border-right: 1px solid white;
}
.close {
  right: 18px;
  top:18px;
  position: absolute;
  width: 24px;
  height: 24px;
  background: url("../../static/closeBtn.svg") center;
  opacity: 1;
  cursor: pointer;
  z-index: 1600;
}
.modal-col-header {
  position: absolute;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  top: 44px;
  left: 0;
  right: 0;
}

.modal-col-header-deactive {
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  /*opacity: 0.3;*/
  top: 44px;
  left: 0;
  right: 0;
}

.course-button {
  background: transparent;
  border: 0;
  font-weight: 400;
  font-size: 14px;
  width: 90px;
  height: 42px;
  padding: 10px 12px;
}

.course-button-diploma {
  background: transparent;
  border: 0;
  font-weight: 500;
  font-size: 14px;
  padding: 10px 12px;
  width: 90px;
  height: 42px;
  margin-left: 20px;
  color: var(--color-5-dark);
}

.course-button-active {
  /*background: var(--gray-100);*/
  font-weight: 500;
}

.header-divider {
  transition: all 0.3s;
  padding: 0;
  margin: 0;
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

.trajectory-card-border {
  border: 1px solid var(--gray-100);
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
  position: relative;
  padding-left: 4px;
}
.discipline-card-type::before {
  position: absolute;
  left: 0px;
  top: 5px;
  content: "●";
  font-size: 4px;
}
.discipline-card-type-optional {
  color: var(--color-3-dark);
  font-size: 11px;
  font-weight: 600;
  position: relative;
  padding-left: 4px;
}
.discipline-card-type-optional::before {
  position: absolute;
  left: 0px;
  top: 5px;
  content: "●";
  font-size: 4px;
}

.discipline-card-control {
  color: #6e6d79;
  font-size: 10px;
}

.discipline-detail {
  font-weight: 500;
  font-size: 12px;
  border-radius: 4px;
  padding: 6px 8px;
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
  background: #ffffff;
  border-radius: 8px;
  max-width: 240px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 24px;
  grid-column-gap: 16px;
  align-items: center;
}
.discipline-card-additionally{
  position: absolute;
  top:calc(100% + 8px);
  left: 0;

  display: flex;
  flex-direction: column;
  font-weight: 400;
  width: 100%;
  padding: 0 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 26px 11px rgba(100, 53, 165, 0.01), 0px 15px 9px rgba(100, 53, 165, 0.03), 0px 7px 7px rgba(100, 53, 165, 0.05), 0px 0px 4px rgba(100, 53, 165, 0.06), 0px 0px 0px rgba(100, 53, 165, 0.06);
  font-size: 14px;

  transition: transform 0.15s linear, opacity 0.12s linear;
  opacity: 0;
  transform: translate(0,-20px);
}
.discipline-card-modal.visible .discipline-card-additionally{
  transition: transform 0.2s linear, opacity 0.1s linear;
  opacity: 1;
  transform: none;

}
.discipline-card-additionally__item{
  padding: 16px 0;
  border-bottom: 1px solid #E7E8EE;
}

.discipline-card-additionally__item:last-child{
  border-bottom:none;
}
.discipline-modal {
  border-radius: 20px;

}
.discipline-card-modal__open-btn{
  background: url("../../static/arrowBottom.svg");
  width: 24px;
  height: 24px;
  border: none;
}

.discipline-modal .modal-body {
  padding: 0;
  border-radius: 20px;
}

.discipline-image {
  border-radius: 19px 19px 0px 0px;
  height: 340px;
}

.discipline-modal-content {
  padding: 32px 36px 36px 36px;
}

.mb-24 {
  margin-bottom: 24px;
}
</style>
