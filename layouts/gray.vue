<template>
  <div style="background-color: #F1F2F8; min-height: 100vh;">
    <TheHeaderLeft />
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import TheHeaderLeft from "./TheHeaderLeft";

export default {
  name: "gray",

  components: {
    TheHeaderLeft
  }
}
</script>

<style scoped>
.content {
  padding: 0 2.5rem;
}
</style>
