<template>
  <div>
    <TheHeader />
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import TheHeader from "./TheHeader";

export default {
  name: "logo",

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
