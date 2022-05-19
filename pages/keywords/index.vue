<template>
    <div class="keywords">
      <div class="keywords-customisation-flex">
        <div class="profession-container" :class="isEditing ? 'editing': ''">
          <h5 class="mb-3 font-weight-bold">Твоя профессия</h5>
          <div class="keywords__card" :class="isEditing ? 'editing': ''">
            <div class="profession-data" :class="isEditing ? 'editing': ''">
              <h5 class="profession-name">{{ profession ? profession.name : '' }}</h5>
              <p class="mb-0">
                {{ profession ? profession.description : '' }}
              </p>
            </div>
            <img class="profession-image" :class="isEditing ? 'editing': ''" :src="profession ? profession.icon: ''"
                 alt="Profession Image">
          </div>
          <h5 class="mb-4 mt-5 font-weight-bold">Надо изучить</h5>
          <b-row class="keywords__required" no-gutters>
            <Keyword v-for="keyword in keywords" :key="keyword.text"
                     :deletable="isEditing" :keyword="keyword" bg-color="'var(--color-secondary)'"
                     @deleteSelf="deleteKeyword(keyword)"/>
          </b-row>
        </div>
        <div class="editor" :class="isEditing ? 'extended': ''">
          <div class="editor-inner-container">
            <h4 class="mb-3 font-weight-bold">Добавь то что хочешь изучить</h4>
            <b-input
              class="keywords-input shadow-none"
              placeholder="Введи ключевое слово"
              v-model="searchQuery"
              @focus="searching()"
              @keyup="searchKeywords(searchQuery)">
            </b-input>
            <div class="add-keywords-search" :class="searchQuery !== '' ? 'extended': ''">
              <b-row class="keywords-modal_add-keywords" no-gutters>
                <span
                  class="keywords__modal-keywords keywords__modal-keywords_selected"
                  v-for="keyword in keywordsToAdd"
                  :key="keyword.text"
                  @click="selectKeyword(keyword)"
                  v-if="!keywordInArray(keyword, queryKeywords)"
                >
                  {{ keyword.text }}
                </span>
                <span
                  class="keywords__modal-keywords "
                  v-for="keyword in queryKeywords"
                  :key="keyword.text"
                  @click="selectKeyword(keyword)"
                  :class="{'keywords__modal-keywords_selected': keywordInArray(keyword, keywordsToAdd)}"
                  v-show="!keywordInArray(keyword, addedKeywords)"
                >
                  {{ keyword.text }}
                </span>
              </b-row>
              <button @click="addKeywords" class="button-secondary in-modal">
                Добавить
              </button>
            </div>
            <div class="keywords__subtext">Например: язык программирования C#</div>

            <div v-if="addedKeywords ? addedKeywords.length === 0 : true" class="text-center mt-4">
              <img src="/lupa.svg" alt="" />
              <div class="mt-3">Ищи и добавляй навыки, которые хочешь получить в ИТМО</div>
            </div>

            <b-row class="keywords__added" no-gutters>
              <Keyword v-for="keyword in addedKeywords" :key="keyword" :deletable="true" :keyword="keyword"
                       :bg-color="'var(--color-secondary)'" @deleteSelf="deleteAddedKeyword(keyword)"/>
            </b-row>
          </div>
        </div>
      </div>

      <div class="bottom-buttons" :class="isEditing ? 'editing': ''">
        <button class="button-secondary" @click="startEditing">
          {{
            isEditing ?
              'Очистить выбор' :
              'Изменить ключевые слова'
          }}
        </button>
        <button class="button-primary" @click="sendKeywords">Мне все нравится</button>
      </div>
    </div>
</template>

<script>
import Keyword from "@/components/Keyword";

export default {
  name: "KeywordsPage",

  headerData: {
    goBackText: 'Все профессии'
  },

  components: {
    Keyword
  },

  data() {
    return {
      keywordsToAdd: [],
      searchQuery: '',
      isEditing: false,
      isSearching: false,
    }
  },

  async created() {
    await this.$store.dispatch('modules/professions/getProfession', {id: +this.$route.query.id})
    this.$store.commit('modules/keywords/setKeywords', this.profession.related_keywords)

  },

  computed: {
    keywords() {
      return this.$store.getters['modules/keywords/keywords']
    },

    queryKeywords() {
      return this.$store.getters['modules/keywords/queryKeywords']
    },

    addedKeywords() {
      return this.$store.getters['modules/keywords/addedKeywords']
    },

    trajectoryIds() {
      return this.$store.getters['modules/keywords/trajectoryIds']
    },

    color() {
      return this.$store.getters['modules/professions/color'](this.profession.category)
    },

    profession() {
      return this.$store.getters['modules/professions/selectedProfession']
    },
  },

  methods: {
    searching() {
      this.isSearching = true
    },

    notSearching() {
      this.isSearching = false
    },

    deleteKeyword(keyword) {
      this.$store.commit('modules/keywords/deleteKeyword', keyword)
    },

    startEditing(){
      this.isEditing = true
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
      this.notSearching()
      this.searchQuery = ''
    },

    selectKeyword(keyword) {
      if (this.keywordsToAdd.includes(keyword)) {
        this.keywordsToAdd.splice(this.keywordsToAdd.indexOf(keyword), 1)
      } else {
        this.keywordsToAdd.push(keyword)
      }
    },

    async sendKeywords() {
      await this.$store.dispatch('modules/keywords/sendKeywords')
      this.$router.push({path: '/trajectories', query: {ids: JSON.stringify(this.trajectoryIds) }})
    },

    keywordInArray (keyword, array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].text === keyword.text) {
          return true
        }
      }

      return false
    }
  }
}
</script>

<style>
.profession-name{
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 24px;
}

.profession-data{
  margin-right: 60px;
}

.profession-data.editing{
  transition: all 0.5s;
  margin-right: 0;
}

.profession-image{
  height: 200px;
  max-width: 200px;
}

.profession-image.editing{
  max-width: 0;
  height: 0;
}

.keywords-customisation-flex{
  position: relative;
  width: 100%;
  max-height: calc(100vh - 85px);
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.keywords-input:focus {
  border: 1px solid rgba(210, 210, 212, 0.8)
}

.keywords-input {
  border-radius: 8px;
  border: 1px solid rgba(210, 210, 212, 0.8)
}

.keywords__modal-keywords {
  background: var(--color-secondary);
  border-radius: 8px;
  padding: 8px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 12px;
}

.keywords__modal-keywords:last-child{
  margin-right: 130px;
}

.keywords__modal-keywords_selected {
  border: 1px solid var(--color-5-dark);
  padding: 7px 11px;
}

.keywords__subtext {
  color: #6E6D7980;
  font-size: 12px;
  margin-top: 6px;
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
  /*max-height: 210px;*/
  overflow: hidden;
  overflow-y: auto;
}

.keywords__added {
  max-height: 600px;
  overflow-Y: auto;
  margin-top: 24px;
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
  padding: 40px;
  border: 1px solid #E7E8EE;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.keywords__card.editing {
  border-radius: 16px;
  padding: 24px;
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

.bottom-buttons {
  position: absolute;
  bottom: 3rem;
  right: calc((100% - 900px)/2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 900px;
  margin-top: 22px;
}

.bottom-buttons.editing{
  transition: all 0.5s;
  display: flex;
  width: 100%;
  max-width: 315px;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 3rem;
  right: 40px;
}

.button-primary {
  transition: all 0.5s, background 0.3s;
  color: white;
  border: 0;
  background: var(--color-5-dark);
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: 700;
}

.button-secondary {
  transition: all 0.5s, background 0.3s;

  border-radius: 8px;
  font-weight: 700;
  border: 1px solid var(--color-5-dark);
  background: white;
  color: var(--color-5-dark);
  padding: 8px 12px;
}

.button-secondary.in-modal{
  position: absolute;
  bottom: 24px;
  right: 16px;
}

.button-secondary:hover {
  background: var(--color-secondary);
  transition: 0.3s;
}

.keywords-modal_add-keywords {
  max-height: 100%;
  overflow-Y: auto;
}

.add-keywords-search{
  transition: all 0.5s, border 0.2s;
  display: flex;
  flex-direction: column;
  max-height: 0px;
  min-height: 0px;
  overflow: hidden;
  margin-top: 8px;
  border-radius: 16px;
  box-shadow: 0px 26px 11px rgba(100, 53, 165, 0.0), 0px 15px 9px rgba(100, 53, 165, 0.0), 0px 7px 7px rgba(100, 53, 165, 0.0), 0px 0px 4px rgba(100, 53, 165, 0.0), 0px 0px 0px rgba(100, 53, 165, 0.0);
  margin-bottom: 20px;
  border: 1px solid rgba(231, 232, 238, 0);
  background: white;
  padding: 0px;
  z-index: 10;
  position: absolute;
  width: 100%;
}

.add-keywords-search.extended {
  padding: 16px;
  min-height: 100px;
  max-height: 600px;
  box-shadow: 0px 26px 11px rgba(100, 53, 165, 0.01), 0px 15px 9px rgba(100, 53, 165, 0.03), 0px 7px 7px rgba(100, 53, 165, 0.05), 0px 0px 4px rgba(100, 53, 165, 0.06), 0px 0px 0px rgba(100, 53, 165, 0.06);
  border: 1px solid #E7E8EE;
}

.profession-container{
  max-width: 900px;
  width: 100%;
  min-width: 400px;
  display: flex;
  flex-direction: column;
}

.profession-container.editing {
  max-width: 550px;
  margin-right: 24px;
}

.button-secondary:active {
  background: var(--color-secondary);
  color: var(--color-5-dark);
  transition: 0.3s;
}

.editor{
  transition: all 0.5s;
  width: 0;
  overflow: hidden;
  padding-right: 0px;
  padding-left: 0px;
  display: flex;
  flex-direction: column;
}

.editor.extended{
  width: 100%;
  padding-right: 8px;
  padding-left: 8px;
}

.editor-inner-container{
  position: relative;
  min-width: 400px;
}
</style>
