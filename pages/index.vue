<template>
  <div class="container landing pb-5">
    <section class="landing-card">
      <div class="landing-card-flex">
        <div class="d-flex flex-column justify-content-between">
          <h1 class="main-title">
            Переведем твои желания на язык дисциплин
          </h1>
          <div class="mb-5">
            <Nuxt-link to="/professions">
              <button class="main-button mr-4">Поехали!</button>
            </Nuxt-link>
            <button @click="scrollToBottom" class="secondary-button">Подробнее</button>
          </div>
        </div>
        <div class="d-flex flex-column justify-content-center">
          <img src="/landing-background.svg" alt="">
        </div>
      </div>
      <span class="header-subtext">
        ITMO.TRACK – Персональные образовательные траектории
      </span>
    </section>
    <section class="info landing-card-flex mt-3" id = 'scrollToAbout'>
      <div class="hello-card flex-grow-0 mr-3">
        <div class="text-center">
          <img src="/Wave.svg" alt="">
        </div>
        <p class="hello-text mt-2">
          Привет ты попал в проект образовательные траектории!
          Здесь мы поможем тебе  увидеть свое будущее в ИМТО.
        </p>
      </div>
      <div class="info-card flex-grow-1">
        <div class="info-title">Как мы поймем что тебе лучше всего?</div>
        <div class="d-flex align-items-start mt-3">
          <img src="/A.svg" alt="">
          <p class="ml-4 info-text">
            Ты выберешь уже готовый набор <b>ключевых слов*</b>, сформированный под запросы поопулярных профессий или пройдешь тест с выбором близких тебе навыков
            и личных качеств
          </p>
        </div>
        <div class="d-flex align-items-start mt-3">
          <img src="/B.svg" alt="">
          <p class="ml-4 info-text">
            Ты можешь изменять набор:  убирать или добавлять важные навыки и знания
          </p>
        </div>
        <div class="mt-4 info-subtext">
          * Набор ключевых слов – список навыков, умений и т.п.
        </div>
      </div>
    </section>
    <div class="final-card mt-3 d-flex justify-content-between">
      <div>
        <div class="final-card-title">
          Последним шагом мы построим для тебя образовательную траекторию в ИТМО
        </div>
        <div class="info-subtext mt-2">
          Образовательная траектория – твоя будущая учебная программа
        </div>
      </div>
      <img src="/stars.svg" alt="">
    </div>
  </div>
</template>

<script>
import {scroller} from 'vue-scrollto/src/scrollTo'

export default {
  // + TODO: implement scroll using https://github.com/rigor789/vue-scrollto
  name: "landingPage",

  layout: 'gray',

  methods: {
    scrollToBottom(){
      const implementScroll = scroller()
      implementScroll('#scrollToAbout')
    }
  }
}
</script>

<style>
.landing {
  min-height: 100vh;
}

.landing-card {
  background: white;
  border-radius: 1.25rem;
  padding: 70px 51px 55px 4rem;
}
.landing-card-flex{
  display: flex;
}
.main-title {
  font-weight: 800;
  font-size: 64px;
}

.main-button {
  transition: 0.3s;
  align-self: center;
  background: var(--color-5-dark);
  color: white;
  font-weight: 500;
  font-size: 20px;
  border: 0;
  border-radius: 8px;
  padding: 20px 44px;
}

.main-button:hover {
  background: #AE78FE;
  color: white;
}

.main-button:active {
  background: #7328E2;
  color: white;
}

.secondary-button {
  color: var(--color-5-dark);
  border-radius: 8px;
  padding: 20px 34px;
  background: white;
  border: 1px solid var(--color-5-dark);
  transition: 0.3s;
  font-weight: 500;
  font-size: 20px;
}

.secondary-button:hover {
  background: #F3F3FE;
  color: #AE78FE;
}

.secondary-button:active {
  background: #F3F3FE;
  color: #7328E2;
}

.header-subtext {
  color: var(--text-secondary);
}

.hello-card {
  border-radius: 20px;
  background: var(--color-5-dark);
  padding: 2rem 2.4rem 3rem 2.4rem;
}

.hello-text {
  font-weight: 500;
  font-size: 20px;
  color: white;
}

.info-card {
  border-radius: 20px;
  background: white;
  padding: 2.5rem;
}

.info-title {
  font-weight: 500;
  font-size: 24px;
}

.info-subtext {
  font-weight: 500;
  font-size: 20px;
  color: var(--text-secondary);
}

.info-text {
  font-weight: 500;
  font-size: 20px;
}

.final-card {
  border-radius: 20px;
  background: white;
  padding: 2rem;
}

.final-card-title {
  font-weight: 500;
  font-size: 22px;
}
@media screen and (max-width: 988px){
  #scrollToAbout .hello-card{
    margin-right: inherit!important;
  }
  .landing-card-flex{
    display: inherit;
  }
}
@media screen and (max-width: 768px){
  .landing-card{
    padding: 2.5rem;
  }
  .main-title{
    font-size: 2.5rem;
  }
  .main-button{
    padding: 20px 24px;
  }
  .secondary-button{
    padding: 20px 24px;
  }
}

@media screen and (max-width: 575px){
  .main-title{
    font-size: 2.1rem;
  }
  .secondary-button{
    padding: 15px 10px;
    font-size: 20px;
  }
  .main-button{
    font-size: 20px;
    padding: 15px 10px;
  }
}
@media screen and (max-width: 461px){
  .main-button{
    font-size: 17px;
  }
  .secondary-button{
    font-size: 17px;
  }
}
@media screen and (max-width: 375px){
  .main-title{
    font-size: 1.8rem;
  }
  .info-text{
    font-size: 16px;
  }
  .main-button{
    font-size: 13px;
  }
  .secondary-button{
    font-size: 13px;
  }
}
@media screen and (max-width: 331px){
  .main-button{
    margin-right: inherit!important;
  }
}

@media screen and (max-width: 320px){
  .header-subtext{
    font-size: 12px;
  }
  .main-title{
    font-size: 22px;
  }
  .hello-text{
    font-size: 14px;
  }
  .main-button{
    font-size: 12px;
    margin-right: inherit!important;
  }
  .secondary-button{
    font-size: 12px;
  }
  .info-title{
    font-size: 18px;
  }
  .info-text{
    margin-left: 0.5rem!important;
    font-size: 13px;
  }
  .final-card-title{
    font-size: 18px;
  }
  .info-subtext{
    font-size: 15px;
  }
}
</style>
