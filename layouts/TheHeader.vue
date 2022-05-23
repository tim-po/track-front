<template>
  <div class="d-flex justify-content-between header align-items-center">
    <div class="trajectories__link-back" @click="$router.go(-1)">
      <img alt="back" src="/backChevrone.svg"/>
      <span>{{ headerText }}</span>
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
.header {
  padding: 1rem 2.5rem;
}
</style>
