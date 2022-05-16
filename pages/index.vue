<template>
  <div class="container landing pb-5">
    <section class="landing-card">
      <div class="d-flex">
        <div class="d-flex flex-column justify-content-between">
          <h1 class="main-title">
            Переведем твои желания на язык дисциплин
          </h1>
          <div class="mb-5">
            <Nuxt-link to="/professions">
              <button class="main-button mr-4">Поехали!</button>
            </Nuxt-link>
            <button class="secondary-button">Подробнее</button>
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
    <section class="info d-flex mt-3">
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
export default {
  name: "landingPage",

  layout: 'gray'
}
</script>

<style>
.landing {
  height: 100vh;
}

.landing-card {
  background: white;
  border-radius: 1.25rem;
  padding: 70px 51px 55px 4rem;
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
</style>
