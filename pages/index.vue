<template>
  <div>
    <b-col class="p-0">
      <h3 class="profession__title">У нас ты можешь стать лучше</h3>
      <div class="profession__container">
        <ProfessionCard
          v-for="profession in professions"
          :key="professions.id"
          :profession="profession"
          @click="professionChosen(profession)"/>
      </div>
      <b-col class="text-center mt-2">
        <button v-b-modal.modal1 class="profession__button">
          Не знаю, что мне подходит
        </button>
      </b-col>
    </b-col>

    <b-modal content-class="main-modal" hide-footer hide-header id="modal1">
      <img class="modal-image" src="/modal-header.jpg">
      <b-col class="profession__modal">
        <h5>Узнай, что подходит тебе лучше всего</h5>
        <p>Не решил, кем хочешь быть? Пройди тест и узнай, какие профессии подходят именно тебе. Просто текст, вообще
          надо подумать, нужен ли он здесь</p>
        <b-row no-gutters class="justify-content-end">
          <button class="profession__secondary-button mr-2">
            Остаться
          </button>
          <button class="profession__button">
            <NuxtLink to="/keywords" style="text-decoration: none; color: inherit;">
              Начать
            </NuxtLink>
          </button>
        </b-row>
      </b-col>
    </b-modal>
  </div>
</template>

<script>
import ProfessionCard from '../components/ProfessionCard'

export default {
  name: 'IndexPage',

  components: {
    ProfessionCard
  },

  created() {
    this.$store.dispatch('modules/professions/getProfessions')
  },

  computed: {
    professions() {
      return this.$store.getters['modules/professions/professions']
    }
  },

  methods: {
    professionChosen(profession) {
      this.$store.commit('modules/professions/setSelectedProfession', profession)
    }
  }
}
</script>

<style lang="scss">
.profession__container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 11.7rem;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1rem;
  padding: 0.5rem 0;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.profession__title {
  font-weight: 700;
  font-size: 1.5rem;
}

.profession__button {
  background: #8533FF;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  border: 0;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  transition: 0.3s;
}

.profession__button:hover {
  background: #AE78FE;
  color: white;
  transition: 0.3s;
}

.profession__button:active {
  background: #7328E2;
  color: white;
  transition: 0.3s;
}


.main-modal {
  border-radius: 1rem;
  padding: 0;
}

.main-modal .modal-body {
  border-radius: 1rem;
  padding: 0;
}

.profession__modal {
  padding: 1.5rem;
}

.modal-image {
  width: 100%;
  border-radius: 1rem 1rem 0 0;
}

.profession__secondary-button {
  color: #8533FF;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  background: white;
  border: 0;
  transition: 0.3s;
}

.profession__secondary-button:hover {
  background: #F3F3FE;
  color: #AE78FE;
  transition: 0.3s;
}

.profession__secondary-button:active {
  background: #F3F3FE;
  color: #7328E2;
  transition: 0.3s;
}
</style>
