<template>
  <b-col cols="4">
    <h6 class="mt-3">Статистика</h6>
    <div
      class="trajectory-card"
      :style="{'padding': 0}"
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
                'min-width': `${klass.r *2}px`,
                'min-height': `${klass.r *2}px`,
              }"
          :class="(isFocusedOnCircleOf(klass)) ? 'focused': ''"
        >
          <div class="circle-value">
            {{ klass.data.amount }}
          </div>
          <div class="circle-text">
            {{ getCircleTextOf(klass) }}
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
</template>

<script>
import ControlTypeTile from "../ControlTypeTile";
import {hierarchy, pack} from "d3-hierarchy";

export default {
  name: "TrajectoryStats",

  components: {
    ControlTypeTile,
  },

  data: () => {
    return {
      focusedCircle: undefined,
      focusedCircleLoading: false,
      focusedCircleRadius: 90
    };
  },

  computed: {
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

    course() {
      return this.$store.getters["modules/trajectory/course"](
        +this.$route.query.course
      );
    },

    colors() {
      return this.$store.getters["modules/trajectory/colors"];
    },
  },


  methods: {
    getCircleTextOf(klass){
      if(
        klass.data.name.length < klass.r / 3.2 ||
        (!this.focusedCircleLoading && this.isFocusedOnCircleOf(klass)) ||
        klass.r > this.focusedCircleRadius
      ){
        return klass.data.name
      }
      return `${klass.data.name.substring(0, klass.r / 4.2)}...`
    },
    getTransitionOf(klass){
      let xTrans = klass.x - klass.r
      let yTrans = klass.y -  klass.r

      if(this.focusedCircle === undefined || this.focusedCircle.r > this.focusedCircleRadius){
        return {x: xTrans, y: yTrans}
      }

      let focusCircleXtrans = this.focusedCircle.x - this.focusedCircleRadius
      let focusCircleYtrans = this.focusedCircle.y - this.focusedCircleRadius

      if(this.focusedCircle.x - this.focusedCircleRadius < 0){
        focusCircleXtrans = 4
      }
      if(this.focusedCircle.y - this.focusedCircleRadius < 0){
        focusCircleYtrans = 4
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
  }
}
</script>

<style scoped>
.stats-circles{
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
}

.circle {
  position: absolute;
  transition: all 0.25s ease-in-out, z-index 0.25s 0s;
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
  transition: all 0.25s ease-in-out, z-index 0s;
  z-index: 2;
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
</style>
