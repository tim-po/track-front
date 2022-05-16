<template>
  <div class="professionCard">
    <div class="card-data">
      <h4 class="professionCard__title">{{ profession.name }}</h4>
      <div class="professionCard__keywords">
        <div v-for="keyword in profession.visible_keywords" :key="keyword.id"
             class="professionCard__keyword" :style="'background:' + color">
          {{ keyword.text }}
        </div>
      </div>
      <div class="professionCard__category">{{ profession.category }}</div>
    </div>
    <img :src="profession.icon" alt="Profession Image">
  </div>
</template>

<script>
export default {
  name: "ProfessionCard",

  props: ['profession'],

  computed: {
    color() {
      return this.$store.getters['modules/professions/color'](this.profession.category)
    }
  }
}
</script>

<style>

.card-data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 260px;
}

.professionCard {
  transition: all 0.3s;
  padding: 24px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #D2D2D4;
  border-radius: 16px;
  transform: scale(1);
  box-sizing: border-box;
  max-width: 540px;
  min-width: 440px;
  flex-shrink: 0;

  box-shadow: 0 0 0 rgba(181, 181, 197, 0.25);
}

.professionCard:hover {
  transform: scale(1.018);
  box-shadow: 0px 2px 10px rgba(181, 181, 197, 0.25);
}

.professionCard__title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
}

.professionCard__category {
  color: #6E6D79;
  position: relative;
}

.professionCard__keywords {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
  max-height: 72px;
  overflow: hidden;
}

.professionCard__keyword {
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  padding: 8px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  height: 32px
}
</style>
