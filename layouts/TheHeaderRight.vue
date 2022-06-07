<template>
  <div class="d-flex justify-content-between header align-items-center">
    <div class="trajectories__link-back" @click="$router.go(-1)">
      <img class="back-arrow" alt="back" src="/backChevrone.svg"/>
      <span class="back-text">{{ headerText }}</span>
    </div>
    <img src="/logo.svg" alt="logo"/>
  </div>
</template>

<script>
export default {
  name: "TheHeader",

  computed: {
    headerText() {
      return this.$store.getters['modules/header/headerText']
    }
  }
}
</script>

<style scoped>
.back-text{
  font-size: 16px;
}
.back-arrow{
  margin-right: 4px;
}
.header {
  padding: 24px 40px 0 40px;
}
</style>
