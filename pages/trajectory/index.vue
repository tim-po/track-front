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
      <TrajectoryStats />
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
          <b-row class="semesters-row">
            <b-col
              class="semester-col"
              v-for="index in [
                'first_semesters_disciplines',
                'second_semesters_disciplines',
              ]"
              :key="index"
            >
              <div class="semester-separator"/>
              <div
                class="modal-card-button"
                v-for="discipline in getDisciplines(sphere, index)"
                :key="discipline.id"
              >
                <div @click="getModal(discipline.id)" class="discipline-card">
                  <b-row no-gutters class="justify-content-between">
                    <div
                      :class="{
                        'discipline-card-type':
                          discipline.necessity === 'necessary',
                        'discipline-card-type optional':
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
                      'discipline-card-name optional':
                        discipline.necessity === 'chosen',
                    }"
                  >
                    {{ discipline.name }}
                  </div>
                </div>
                <div v-if="getArrowDisciplineNames(sphere, index).includes(discipline.name) && index === 'first_semesters_disciplines'" class="discipline-arrow">
                  <img class="discipline-arrow-pointer" src="/discArrow.svg">
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
      :visible="modalVisible"
      content-class="discipline-modal"
      size="xl"
      centered
      hide-footer
      hide-header
      modal-class="discipline-model"
      @hidden="()=>{this.modalVisible = false}"
    >
      <DisciplineModal />
    </b-modal>
  </div>
</template>

<script>
import ControlTypeTile from "@/components/ControlTypeTile";
import CourseSelector from "@/components/Trajectory/CourseSelector";
import Diploma from "../../components/Trajectory/Diploma";
import TrajectoryStats from "../../components/Trajectory/TrajectoryStats";
import DisciplineModal from "../../components/Trajectory/DisciplineModal";

export default {
  // TODO: модалка: добавить выпадашку как в дизайне, по id из поля replacement_options

  name: "TrajectoryPage",

  components: {
    ControlTypeTile,
    CourseSelector,
    TrajectoryStats,
    DisciplineModal,
    Diploma,
  },

  data: () => {
    return {
      currentCourse: 1,
      focusedCircle: undefined,
      focusedCircleLoading: false,
      focusedCircleRadius: 90,
      modalVisible: false
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
    getArrowDisciplineNames(sphere){
      const disciplinesWithArrows = []
      sphere['first_semesters_disciplines'].forEach((discipline)=> {
        if(discipline.next_disciplines.length > 0){
          disciplinesWithArrows.push(discipline.name)
        }
      })
      return disciplinesWithArrows
    },
    getDisciplines(sphere, index) {
      const disciplines = [...sphere[index]].sort((dis1, dis2) => {
        const discsWithArrows = this.getArrowDisciplineNames(sphere)
        console.log(discsWithArrows)
        const dis1InclusionNumber = discsWithArrows.includes(dis1.name) ? 1: -1
        const dis2InclusionNumber = discsWithArrows.includes(dis2.name) ? 1: -1
        return ((dis2InclusionNumber - dis1InclusionNumber)*10 + (dis2.name > dis1.name ? 1: -1))
      })
      return disciplines
    },
    getModal(id) {
      this.$store.dispatch("modules/trajectory/getDiscipline", id).then(()=>{
        this.modalVisible = true
      });
    },
  },
};
</script>

<style>

.courses-row {
  position: relative;
  z-index: 2;
}

.modal-card-button {
  outline: none !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

svg {
  display: block;
  margin: 0 auto;
}

.trajectory-page {
  max-width: 1500px;
  margin: 0 auto;
  margin-top: 24px;
}

.semester-separator{
  position: absolute;
  height: 100%;
  width: 1px;
  top: 0;
  left: 12px;
  background: rgba(255, 255, 255, 0.2);
  z-index: -1;
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
  position: relative;
}

.semesters-row{
  margin-right: 40px;
  margin-left: 40px;
  height: 100%;
  width: calc(100% - 80px);
  position: relative;
}
.semester-col{
  padding-top: 56px;
  padding-bottom: 28px;
  padding-left: 0;
  padding-right: 0;
  z-index: 10;
}

.class-header {
  position: absolute;
  font-weight: 600;
  font-size: 14px;
  color: white;
  padding-bottom: 12px;
  margin-bottom: 0;
  left: 64px;
  top: 24px
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
  flex-shrink: 0;
}


.discipline-arrow{
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  width: 100%;
  height: 2px;
  left: 0;
  background: white;
  flex-shrink: 10;
}

.discipline-arrow-pointer{
  position: absolute;
}

.discipline-card-name {
  /*border-left: 2px solid var(--color-10-dark);*/
  padding-left: 12px;
  font-size: 14px;
  position: relative;
}

.discipline-card-name::before {
  position: absolute;
  left: 0px;
  content: "";
  width: 2px;
  height: 100%;
  border-radius: 1px;
  background: var(--color-10-dark);
  font-size: 4px;
}

.discipline-card-name.optional {
  /*border-left: 2px solid var(--color-3-dark);*/
  padding-left: 12px;
  font-size: 14px;
}

.discipline-card-name.optional::before{
  background: var(--color-3-dark);

}

.discipline-card-type {
  color: var(--color-10-dark);
  font-size: 11px;
  font-weight: 600;
  position: relative;
  padding-left: 4px;
  display: flex;
  align-items: center;
}
.discipline-card-type::before {
  position: absolute;
  left: 0px;
  content: "";
  width: 2px;
  height: 2px;
  border-radius: 1px;
  background: var(--color-10-dark);
  font-size: 4px;
}
.discipline-card-type.optional {
  color: var(--color-3-dark);
}
.discipline-card-type.optional::before {
  background: var(--color-3-dark);
}

.discipline-card-control {
  color: #6e6d79;
  font-size: 10px;
}

.discipline-modal {
  border-radius: 20px;
  border: none;
}

.discipline-modal .modal-body {
  padding: 0;
  border-radius: 20px;
}
</style>
