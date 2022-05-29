<template>
  <div class="course-selector" :style="{'left': leftOffset + 'px'}">
    <svg width="90" height="42" viewBox="0 0 90 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M78 0H12C7.58172 0 4 3.58172 4 8V37C4 39.2091 2.20914 41 0 41V42H4H86H90V41C87.7909 41 86 39.2091 86 37V8C86 3.58172 82.4183 0 78 0Z" :fill="bgColor"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: "CourseSelector",
  props: ["bgColor", "leftOffset"],
}
</script>

<style scoped>
.course-selector{
  transition: all 0.3s;
  position: absolute;
  bottom: -1px;
  z-index: -1;
}

</style>
