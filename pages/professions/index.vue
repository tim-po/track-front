<template>
  <div class="professionsPageContainer">
    <div class="professionsContainer">
      <div class="d-flex justify-content-between card-header-width align-items-center">
        <h3 class="profession__title">Выбирай подходящее направление</h3>
<!--        <button v-b-modal.modal1 class="profession__button mb-4">-->
<!--          Не знаю, что мне подходит-->
<!--        </button>-->
      </div>
      <div class="profession__container">
        <button
          class="professionCardButton"
          v-for="profession in professions"
          :key="profession.id"
          v-on:click="professionChosen(profession)"
        >
          <ProfessionCard
            :profession="profession"
          />
        </button>
      </div>
    </div>

    <b-modal content-class="main-modal" hide-footer hide-header id="modal1">
      <img class="modal-image" src="/modal-header.jpg">
      <b-col class="profession__modal">
        <h5 class="modalHeader">Узнай, что подходит тебе лучше всего</h5>
        <p class="modalText">Не решил, кем хочешь быть? Пройди тест и узнай, какие профессии подходят именно тебе.
          Просто текст, вообще
          надо подумать, нужен ли он здесь</p>
        <b-row no-gutters class="justify-content-end">
          <button @click="$bvModal.hide('modal1')" class="profession__secondary-button mr-2">
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
import ProfessionCard from '../../components/ProfessionCard'

export default {
  // + TODO:  При перезагрузке страницы прыгают размеры карточек и расстояния между заголовком и кнопкой надо пофиксить стили
  // + TODO:  У карточек профессий не приклеенно к низу название направления нужно сделать минимальную высоту у блока со словами
  name: 'IndexPage',

  layout: 'logo',

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
      this.$store.commit('modules/header/setHeaderAnimated')
      this.$store.commit('modules/keywords/setKeywords', profession.related_keywords)
      this.$router.push({path: 'keywords', query: {id: profession.id}})
    }
  }
}
</script>

<style lang="scss">
.professionCardButton {
  background: none;
  border: none;
  outline: none;
  padding: 0 0;
  height: max-content;
  max-width: 540px;
  min-width: 420px;
  flex-shrink: 0;
}

.profession__container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  //grid-auto-rows: 11.7rem;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  justify-items: center;
  width: 100%;

  margin-bottom: 24px;

  @media (max-width: 1430px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.profession__title {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 16px;
}

.modalHeader {
  font-weight: 700;
  margin-bottom: 16px;
}
.card-header-width{
  width: calc(100vw - 80px);
}
.modalText {
  margin-bottom: 24px;
}

.professionsPageContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.professionsContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 1920px;
}

.profession__button {
  transition: 0.3s;
  align-self: center;
  background: var(--color-5-dark);
  color: white;
  font-size: 14px;
  font-weight: 700;
  border: 0;
  border-radius: 8px;
  padding: 8px 12px;
}

.profession__button:hover {
  background: #AE78FE;
  color: white;
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
  color: var(--color-5-dark);
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

@media screen and (max-width: 433px){
  .professionCardButton{
    min-width: 420px;
  }
  .content{
    padding: 0 10px!important;
  }
  .header{
    padding: 1.5rem 10px!important;
  }
  .card-header-width{
    width: inherit;
  }
}
@media screen and (max-width: 410px){
  .professionCardButton{
    min-width: 320px;
  }
}
</style>
