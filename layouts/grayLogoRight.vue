<template>
  <div class="grayBackground">
    <TheHeader :header-data="headerData"/>
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
    headerData() {
      return this.$route.matched.map(r => {
        return r.components.default.options.headerData
      })[0]
    }
  }
}
</script>

<style scoped>
.content {
  padding: 0 2.5rem;
}

.grayBackground {
  background-color: #F1F2F8;
  min-height: 100vh;
}
</style>
