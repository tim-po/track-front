<template>
  <div class="keywords">
    <h4 class="mb-3">Выбирай свою траекторию обучения</h4>
    <b-row>
      <b-col cols="4">
        <b-card class="keywords__card">
          <h5>{{ profession ? profession.name : '' }}</h5>
          <p>
            {{ profession ? profession.description : '' }}
          </p>
        </b-card>
      </b-col>
      <b-col cols="8">
        <h5 class="mb-3">Тебе надо знать</h5>
        <b-row class="keywords__required" no-gutters>
          <span
            class="keywords__keyword mr-1 mb-2"
            v-for="keyword in keywords"
            :key="keyword.text">
            {{ keyword.text }}
            <button class="bg-transparent border-0 pr-0 py-0" @click="deleteKeyword(keyword)">x</button>
          </span>
        </b-row>
        <b-row no-gutters class="justify-content-end">
          <p v-b-modal:modal2 class="keywords__more-button mb-3">Смотреть все</p>
        </b-row>
        <h5 class="mb-3">Добавь то что хочешь изучить</h5>
        <b-card class="text-center keywords__info" v-if="addedKeywords.length === 0">
          При подборе наиболее оптимальных образовательных программ для тебя <br> мы также учитываем твои предпочтения.
          Добавляй навыки, которые хочешь <br> преобрести плюсом к необходимым для твоей профессии.
        </b-card>
        <b-row class="keywords__added" no-gutters>
          <span
            class="keywords__modal-keywords mr-1 mb-2"
            v-for="keyword in addedKeywords"
            :key="keyword.text">
            {{ keyword.text }}
            <button class="bg-transparent border-0 pr-0" @click="deleteAddedKeyword(keyword)">x</button>
          </span>
        </b-row>
        <b-row no-gutters class="justify-content-end">
          <button v-b-modal.modal1 class="keywords__add mt-3">
            Добавить +
          </button>
        </b-row>
      </b-col>
    </b-row>

    <b-modal content-class="add-keywords-modal" size="xl" hide-footer hide-header id="modal1">
      <b-col class="profession__modal">
        <h5 class="modalHeader">Ключевые слова</h5>
        <b-input
          placeholder="Введи ключевое слово"
          v-model="searchQuery"
          @keyup="searchKeywords(searchQuery)">
        </b-input>
        <div class="keywords__subtext">Например: язык программирования C#</div>
        <b-row class="mt-3 keywords-modal_add-keywords" no-gutters>
          <span
            class="keywords__modal-keywords keywords__modal-keywords_selected"
            v-for="keyword in keywordsToAdd"
            :key="keyword.text">
            {{ keyword.text }}
          </span>
          <span
            class="keywords__modal-keywords"
            v-for="keyword in queryKeywords"
            :key="keyword.text"
            @click="selectKeyword(keyword)"
          >
            {{ keyword.text }}
          </span>
        </b-row>
      </b-col>
      <button @click="addKeywords" class="profession__button keywords__modal-button">
        Добавить
      </button>
    </b-modal>

    <b-modal content-class="add-keywords-modal" size="xl" hide-footer hide-header id="modal2">
      <b-col class="profession__modal">
        <h5 class="modalHeader">{{ profession ? profession.name : '' }}</h5>
        <b-input placeholder="Введи ключевое слово"></b-input>
        <b-row class="mt-3" no-gutters>
          <span
            class="keywords__keyword mr-2 mb-2"
            v-for="keyword in keywords"
            :key="keyword.text">
            {{ keyword.text }}
            <button class="bg-transparent border-0 pr-0" @click="deleteKeyword(keyword)">x</button>
          </span>
        </b-row>
      </b-col>
    </b-modal>

    <button class="button-primary" @click="sendKeywords">Далее</button>
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
      keywordsToAdd: [],
      searchQuery: '',
    }
  },

  async created() {
    if (this.$store.getters['modules/professions/professions'].length === 0) {
      await this.$store.dispatch('modules/professions/getProfessions')
    }
    this.$store.commit("modules/keywords/setKeywords", this.profession.related_keywords)
  },

  computed: {
    profession() {
      return this.$store.getters['modules/professions/profession'](+this.$route.query.id)
    },

    keywords() {
      return this.$store.getters['modules/keywords/keywords']
    },

    queryKeywords() {
      return this.$store.getters['modules/keywords/queryKeywords']
    },

    addedKeywords() {
      return this.$store.getters['modules/keywords/addedKeywords']
    },

    trajectoryId() {
      return this.$store.getters['modules/keywords/trajectoryId']
    }
  },

  methods: {
    deleteKeyword(keyword) {
      this.$store.commit('modules/keywords/deleteKeyword', keyword)
    },

    deleteAddedKeyword(keyword) {
      this.$store.commit('modules/keywords/deleteAddedKeyword', keyword)
    },

    searchKeywords(query) {
      this.$store.dispatch('modules/keywords/debounceKeywords', query)
    },

    addKeywords() {
      this.$store.commit('modules/keywords/addKeywords', this.keywordsToAdd)
      this.keywordsToAdd = []
    },

    selectKeyword(keyword) {
      this.keywordsToAdd.push(keyword)
      this.$store.commit('modules/keywords/deleteQueryKeyword', keyword)
    },

    async sendKeywords() {
      await this.$store.dispatch('modules/keywords/sendKeywords')
      this.$router.push({path: '/trajectory', query: {id: this.trajectoryId}})
    }
  }
}
</script>

<style>
.keywords__modal-keywords {
  background: var(--color-secondary);
  border-radius: 8px;
  padding: 8px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 12px;
}

.keywords__modal-keywords_selected {
  border: 1px solid var(--color-5-dark)
}

.keywords__modal-button {
  position: absolute;
  bottom: 37px;
  right: 48px;
}

.keywords__subtext {
  color: #6E6D7980;
  font-size: 12px;
}

.add-keywords-modal {
  padding: 10px;
  border-radius: 16px;
}

.add-keywords-modal .modal-body {
  padding: 0;
  border-radius: 16px;
  min-height: 600px;
}

.keywords__required {
  max-height: 210px;
  overflow: hidden;
}

.keywords__added {
  max-height: 170px;
  overflow: scroll;
}

.keywords__add {
  background: transparent;
  border-radius: 8px;
  border: 1px solid var(--color-5-dark);
  color: var(--color-5-dark);
  padding: 8px 12px;
}

.keywords__card {
  border-radius: 16px;
}

.keywords__more-button {
  color: #6E6D79;
  font-size: 0.75rem;
  cursor: pointer
}

.keywords__accept {
  cursor: pointer;
  color: var(--color-5-dark);
}

.keywords__info {
  border: 1px solid #D2D2D4;
  border-radius: 16px;
}

.keywords__keyword {
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 8px;
  padding: 8px 12px;
  background: var(--color-7-light);
}

.button-primary {
  color: white;
  border: 0;
  background: var(--color-5-dark);
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
  color: var(--color-5-dark);
  transition: 0.3s;
  padding: 8px 12px;
}

.button-secondary:hover {
  background: var(--color-secondary);
  transition: 0.3s;
}

.keywords-modal_add-keywords {
  max-height: 376px;
  overflow: scroll;
}


.button-secondary:active {
  background: var(--color-secondary);
  color: var(--color-5-dark);
  transition: 0.3s;
}
</style>
