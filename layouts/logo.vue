<template>
  <div>
    <TheHeaderLeft />
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import TheHeaderLeft from "./TheHeaderLeft";

export default {
  name: "logo",

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
