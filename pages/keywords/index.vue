<template>
  <div class="keywords">
    <b-row>
      <b-col cols="4">
        <b-card id="keywords-card">
          <h5>Профессия</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur deserunt, dolor earum eligendi esse,
            illum, ipsum magni nam nobis porro quaerat quasi tempore unde! Ad dignissimos molestias neque quis
            repellat?
          </p>
          <b-row no-gutters>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
            <span class="keywords__keyword mr-1 mb-2">English</span>
          </b-row>
          <p class="mb-0 mt-2 keywords__more-button">Все ключевые слова ></p>
        </b-card>

        <b-popover target="keywords-card" :show.sync="pop2" placement="rightbottom" disabled>
          Смотри уже подобранные ключевые слова для твоей профессии. Ты также можешь удалять их, так мы точнее подберем
          траекторию для тебя.
          <b-row class="justify-content-end mt-2" no-gutters>
            <span @click="pop2 = false" class="keywords__accept">
              Понятно
            </span>
          </b-row>
        </b-popover>
      </b-col>
      <b-col cols="8">
        <h5>Добавь ключевые слова</h5>
        <b-input id="search-bar" placeholder="Введите ключевое слово"></b-input>

        <b-popover target="search-bar" :show.sync="pop1" placement="bottom" disabled>
          Ты можешь добавлять навыки, которые хочешь освоить во время обучения в ИТМО. Для этого ищи ключевые слова в
          строке поиска и добавляй их.
          <b-row class="justify-content-end mt-2" no-gutters>
            <span @click="pop1 = false; pop2 = true" class="keywords__accept">
              Понятно
            </span>
          </b-row>
        </b-popover>
      </b-col>
    </b-row>

    <button class="button-primary">Далее</button>
    <button class="button-secondary">
      <NuxtLink to="/" style="text-decoration: none; color: inherit;">Назад</NuxtLink>
    </button>
  </div>
</template>

<script>
export default {
  name: "KeywordsPage",

  data() {
    return {
      pop1: true,
      pop2: false
    }
  },
}
</script>

<style scoped>
.keywords__more-button {
  color: #6E6D79;
  font-size: 0.75rem;
  cursor: pointer
}

.keywords__accept {
  cursor: pointer;
  color: #8533FF;
}

.keywords__keyword {
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 8px;
  padding: 0.2rem 0.5rem;
  background: #C1D5F6;
}

.button-primary {
  color: white;
  border: 0;
  background: #8533FF;
  border-radius: 8px;
  padding: 8px 12px;
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  font-weight: 700;
}

.button-secondary {
  border-radius: 8px;
  position: absolute;
  bottom: 3rem;
  font-weight: 700;
  left: 3rem;
  border: 0;
  background: 0;
  color: #8533FF;
  transition: 0.3s;
  padding: 8px 12px;
}

.button-secondary:hover {
  background: #F3F3FE;
  transition: 0.3s;
}

.button-secondary:active {
  background: #F3F3FE;
  color: #7328E2;
  transition: 0.3s;
}
</style>
