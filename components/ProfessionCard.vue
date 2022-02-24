<template>
  <b-card class="professionCard">
    <b-row no-gutters>
      <b-col cols="8">
        <h4 class="professionCard__title">{{ profession.name }}</h4>
        <b-row no-gutters>
            <span v-for="keyword in profession.visible_keywords" :key="keyword"
                  class="professionCard__keyword mr-1 mb-2" :style="'background:' + color">
              {{ keyword }}
            </span>
        </b-row>
      </b-col>
      <b-col cols="4" class="text-center" :style="'background-image: url(\'' + profession.icon_link + '\')'">
        <img :src="profession.icon_link" alt="Profession Image">
      </b-col>
    </b-row>
    <p class="mb-0 professionCard__category">{{ profession.category }}</p>
  </b-card>
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
.professionCard .card-body {
  padding: 1.25rem 0.9rem;
}

.professionCard__title {
  font-size: 1.25rem;
  font-weight: 700;
}

.professionCard__category {
  color: #6E6D79;
  position: absolute;
  bottom: 1rem;
}

.professionCard__keyword {
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 8px;
  padding: 0.2rem 0.5rem;
}
</style>
