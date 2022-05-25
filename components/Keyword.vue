<template>
  <span
    class="keywords__modal-keywords"
    :class="deleted ? 'deleted' : ''"
    :key="keyword.text"
    :style="{ background: bgColor }"
  >
    {{ keyword.text }}
    <button
      class="border-0 pr-0 py-0 del-btn"
      v-if="deletable"
      @click="deleteSelf"
    >
      <!-- x -->
    </button>
  </span>
</template>

<script>
export default {
  name: "Keyword",

  props: ["deletable", "keyword", "deleted", "bgColor"],

  methods: {
    deleteSelf() {
      this.deleted = true;
      setTimeout(() => {
        this.$emit("deleteSelf", this.keyword);
      }, 300);
    },
  },
};
</script>

<style scoped>
.keywords__modal-keywords {
  transition: all 0.3s;
  border-radius: 8px;
  padding: 8px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 12px;
  transform: scale(1);
  opacity: 1;
  line-height: 15px;
}

.keywords__modal-keywords.deleted {
  transform: scale(0);
  opacity: 0;
}

.del-btn {
  width: 8.5px;
  height: 8.5px;
  background: url("../static/deleteBtn.svg") center;
  margin-left: 8.81px;
}
</style>
