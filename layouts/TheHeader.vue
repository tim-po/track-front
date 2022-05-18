<template>
  <div class="d-flex justify-content-between header align-items-center">
    <div class="trajectories__link-back" @click="$router.go(-1)">
      <img alt="back" src="/backChevrone.svg"/>
      <span>{{ headerData.goBackText }}</span>
    </div>
    <img src="/logo.svg" alt="logo"/>
  </div>
</template>

<script>
export default {
  name: "TheHeaderRight.vue",

  props: {
    headerData: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.header {
  padding: 1.5rem 2.5rem;
}
</style>
