<template>
  <div class="diploma-container">
    <div v-if="diploma !== null" class="left-tiles">
      <b-card class="diploma-card">
        <h6 class="tile-header">Высшее образование</h6>
        <div class="text-small mb-1">
          Университет ИТМО, г. Санкт-Петербург
        </div>
        <div class="text-small bachelor">Бакалавриат</div>
      </b-card>
      <b-card class="diploma-card mt-4">
        <h6 class="tile-header">Освою ключевые навыки</h6>
        <div>
          <b-row no-gutters>
            <Keyword
              v-for="keyword in diploma.main_keywords"
              :key="keyword"
              :deletable="false"
              :keyword="{ text: keyword }"
              bg-color="#EBEBFF"
            />
          </b-row>
        </div>
      </b-card>
      <b-card class="diploma-card mt-4">
        <h6 class="mb-2">
          Это твоя траектория в университете ИТМО!
          <br />
          Поступай к нам чтобы изучать то, что нравится.
        </h6>
        <div class="d-flex my-3">
          <button class="main-button main-button-diploma mr-2">
            Поступай в ИТМО
          </button>
          <button class="secondary-button secondary-button-diploma">
            Поделиться
          </button>
        </div>
      </b-card>
    </div>
    <div v-if="diploma !== null" class="right-tiles">
      <b-card class="diploma-card">
        <h6 class="tile-header">Изучу 52 дисциплины</h6>
        <div class="tiles-flex">
          <div
            v-for="(item, key) in diploma.classes_count"
            :key="key"
            :style="'background:' + colors[key]"
            class="classes-type-card"
          >
            <h2>{{ item }}</h2>
            <div class="text-small">{{ key }}</div>
          </div>
        </div>
      </b-card>
      <b-card class="diploma-card mt-4">
        <h6 class="tile-header">Сдам</h6>
        <div class="tiles-flex">
          <div
            v-for="(item, key) in diploma.control_types_count"
            :key="key"
            class="control-type-card flex-grow-1"
          >
            <h4>{{ item }}</h4>
            <div class="text-small">{{ key }}</div>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import Keyword from "@/components/Keyword";

export default {
  name: "Diploma",

  data: () => {
    return {
      currentCourse: 4,
    };
  },

  components: {
    Keyword,
  },

  created() {
    this.$store.commit('modules/header/setBgGray')
  },

  computed: {
    diploma() {
      return this.$store.getters["modules/trajectory/diploma"];
    },
    colors() {
      return this.$store.getters["modules/trajectory/colors"];
    },
  },
};
</script>

<style scoped>
.right-tiles{
  display: flex;
  flex-direction: column;
  width: 300px;
  flex-grow: 5;
}

.left-tiles{
  display: flex;
  flex-direction: column;
  width: 20%;
  max-width: 600px;
  min-width: 300px;
  flex-grow: 3;

}

.tiles-flex{
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.tile-header{
  margin-bottom: 12px;
  font-weight: 600;
}

.diploma-container {
  padding-top: 24px;
  max-width: 1500px;
  margin: 0 auto;
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
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
  background: #78a3ec;
  border-radius: 16px;
  color: white;
  min-width: 160px;
  height: 104px;
  padding: 20px;
}

.classes-type-card {
  border-radius: 16px;
  color: white;
  min-width: 196px;
  height: 134px;
  padding: 20px;
  background: #78a3ec;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
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
  line-height: 16px;
}

.bachelor {
  position: relative;
  padding-left: 24px;
}
.bachelor::before {
  position: absolute;
  left: 0px;
  top: 1px;
  content: url("../../static/star.svg");
  width: 16px;
  height: 16px;
}
</style>
