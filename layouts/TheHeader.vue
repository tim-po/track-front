<template>
  <div class="d-flex justify-content-between header align-items-center">
    <div class="trajectories__link-back" @click="$router.go(-1)">
      <img class="backArrow" alt="back" src="/backChevrone.svg"/>
      <div class="cont">
      <div :class="backText ? 'showOn': 'showOff'" class="backText">{{ headerText }}</div>
      </div>
    </div>
    <img src="/logo.svg" alt="logo" class="logo" :class="logo ? 'active': 'onActive'"/>
  </div>
</template>

<script>
export default {

  name: "TheHeader",
  data() {
    return {
      logo: false,
      backText :false
    }
  },
  mounted(){
    // setTimeout(() => this.logo = true, 3000)
    setTimeout(() => this.logo = true, 1000)
    console.log(this.logo)
    // if (this.logo=== true ){
      setTimeout(() => this.backText = true, 1001)
    // }

  },

  computed: {
    headerText() {
      return this.$store.getters['modules/header/headerText']
    }
  }

}
</script>

<style scoped>
.showOff{
  display: none;
}
.cont{
  display: inline-block;
}
.showOn{
  overflow: hidden;
  white-space: nowrap;
  animation: typing 0.3s steps(20, end) forwards;
  width: 0;
}
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
.backText{
  font-size: 16px;
}
.backArrow{
  margin-right: 4px;
}
.header {
  padding: 24px 40px 0 40px;
  position: relative;
}
.onActive{
  position: absolute;
  /*right:calc(60% - 200px) ;*/
}
.active{
position: absolute;
  right: 0;
  animation-name: slidein;
  animation-duration: 1s;
  /*animation-delay: 2s;*/
  /*transition: left 4s ease-in-out;*/
}
@keyframes slidein {
  from {
    right: calc(100% - 130px);
  }
  to {
    right: 0;
  }}
</style>
