<template>
  <div style="background-color: #F1F2F8;">
    <TheHeader />
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import TheHeader from "./TheHeader";

export default {
  name: "gray",

  components: {
    TheHeader
  }
}
</script>

<style scoped>
.content {
  padding: 0 2.5rem;
}
</style>
