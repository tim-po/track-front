<template>
  <div class="course-card__control-card" :class="additionalClassnames">
    {{ controlType }}
    <br/>
    <b style="font-size: 18px; font-weight: 600">
      {{ count }}
    </b>
  </div>
</template>

<script>
export default {
  name: "ControlTypeTile",
  props: ['controlType', 'count', 'additionalClassnames'],
}
</script>

<style scoped>

.course-card__control-card {
  background: white;
  color: #1F1F22;
  font-weight: 500;
  font-size: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  min-width: 100px;
}

</style>
