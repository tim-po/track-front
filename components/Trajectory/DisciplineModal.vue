<template>
  <div>
    <button type="button" class="close"  @click="$bvModal.hide('modal-discipline')">
    </button>
    <div
      class="discipline-image row no-gutters"
      :style="'background:' + colors[discipline.class]"
    >
      <b-col class="justify-content-center d-flex flex-column">
        <p
          :class="{
                'modal-col-header-deactive': !discipline.prev_disciplines,
              }"
          class="text-center modal-col-header"
        >
          Сначала изучить
        </p>
        <div
          v-for="disc in discipline.prev_disciplines"
          class="discipline-card-modal mb-2 mx-auto"
        >
          {{ disc.name }}
        </div>
      </b-col>
      <b-col
        class="discipline-modal-column justify-content-center d-flex flex-column"
      >
        <p class="text-center modal-col-header">{{ courseNumberFromQuery }} курс</p>
        <div class="discipline-card-modal mx-auto">
          {{ discipline.name }}
        </div>
      </b-col>
      <b-col class="justify-content-center d-flex flex-column">
        <p
          :class="{
                'modal-col-header-deactive': !discipline.next_disciplines,
              }"
          class="text-center modal-col-header"
        >
          Где пригодится
        </p>
        <div
          v-for="disc in discipline.next_disciplines"
          class="discipline-card-modal mb-2 mx-auto"
        >
          {{ disc.name }}
        </div>
      </b-col>
    </div>

    <div class="discipline-modal-content">
      <b-row
        class="justify-content-between align-items-center mb-4"
        no-gutters
      >
        <h5 class="disc-modal-header mb-0" style="max-width: 700px">{{ discipline.name }}</h5>
        <div>
              <span
                class="discipline-detail"
                :class="{
                  'discipline-detail-green': !discipline.necessity,
                  'discipline-detail-pink': discipline.necessity,
                }"
              >
                {{
                  discipline.necessity
                    ? "Обязательный предмет"
                    : "Предмет по выбору"
                }}
              </span>
          <span class="ml-3 discipline-detail discipline-detail-yellow">{{
              discipline.control
            }}</span>
        </div>
      </b-row>
      <p class="modal-keywords-header">
        Полученные знания и навыки -
        <span
          class="modal-keywords-coverage"
          :style="'color:' + colors[discipline.class]"
        >
              Пересечение с ключевыми словами
              {{ Math.round(discipline.keywords_coverage * 100) }}%
            </span>
      </p>
      <b-row no-gutters>
        <div
          class="modal-keyword mr-2 mb-2"
          :style="
                'background:' + colors[discipline.class] + '!important'
              "
          v-for="keyword in discipline.keywords_aligned_with_user"
        >
          {{ keyword}}
        </div>
        <div v-for="keyword in discipline.keywords">
          <div
            :style="
                'background:' + colors[discipline.class]+'20' + '!important'
              "
            v-show="keyword !== ''"
            v-if="
                  !keywordInArray(keyword, discipline.keywords_aligned_with_user)
                "
            class="mr-2 mb-2 modal-keyword"
          >
            {{ keyword }}
          </div>
        </div>
      </b-row>
      <p
        v-if="discipline.prerequisites.length > 0"
        class="modal-keywords-header"
      >
        Пригодится при изученииее
      </p>
      <b-row no-gutters>
        <div
          class="modal-keyword mr-2 mb-2"
          v-for="keyword in discipline.prerequisites"
        >
          {{ keyword}}
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisciplineModal",

  computed: {
    courseNumberFromQuery() {
      return +this.$route.query.course
    },
    colors() {
      return this.$store.getters["modules/trajectory/colors"];
    },
    discipline() {
      return this.$store.getters["modules/trajectory/discipline"];
    },
  },

  methods: {
    keywordInArray(keyword, array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].text === keyword.text) {
          return true;
        }
      }

      return false;
    },
  },
}
</script>

<style scoped>

.discipline-modal-column {
  border-left: 1px solid rgba(255, 255, 255, 0.46);
  border-right: 1px solid rgba(255, 255, 255, 0.46);
}
.close {
  right: 18px;
  top:18px;
  position: absolute;
  width: 24px;
  height: 24px;
  background: url("../../static/closeBtn.svg") center;
  opacity: 1;
  cursor: pointer;
  z-index: 1600;
}
.modal-col-header {
  position: absolute;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  top: 44px;
  left: 0;
  right: 0;
}

.modal-col-header-deactive {
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  /*opacity: 0.3;*/
  top: 44px;
  left: 0;
  right: 0;
}

.discipline-detail {
  font-weight: 500;
  font-size: 12px;
  border-radius: 4px;
  padding: 6px 8px;
}

.discipline-detail-yellow {
  background-color: var(--color-10-light);
}

.discipline-detail-green {
  background-color: var(--color-3-verylight);
}

.discipline-detail-pink {
  background-color: var(--color-4-light);
}

.modal-keywords-header {
  font-weight: 500;
  font-size: 14px;
}

.modal-keywords-coverage {
  font-weight: 600;
  font-size: 14px;
}

.modal-keyword {
  padding: 10px 12px;
  background: var(--gray-100);
  border-radius: 10px;
  font-weight: 500;
  font-size: 12px;
}

.discipline-card-modal {
  padding: 18px 20px;
  background: #ffffff;
  border-radius: 8px;
  max-width: 240px;
}

.disc-modal-header{
  font-weight: bold;
}

.discipline-image {
  border-radius: 19px 19px 0px 0px;
  height: 340px;
}

.discipline-modal-content {
  padding: 32px 36px 36px 36px;
}

</style>
