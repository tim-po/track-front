<template>
  <div class="default-layout-container" :style="{'background-color': bgColor}">
    <TheHeader/>
    <div class="content">
      <Nuxt/>
    </div>
  </div>
</template>

<script>
import TheHeader from "./TheHeader";

export default {
  name: "default",

  components: {
    TheHeader
  },

  computed: {
    bgColor() {
      return this.$store.getters['modules/header/bgColor']
    }
  }
}
</script>

<style scoped>
.default-layout-container{
  transition: all 0.3s;
  min-height: 100vh;
}
.content {
  padding: 0 2.5rem;
}
</style>
