<template>
  <div class="content">
  <div class="d-flex justify-content-between header align-items-center">
    <div class="trajectories__link-back" :class="backText ? 'shownOn': ''" @click="$router.go(-1)">
      <img class="backArrow" alt="back" src="/backChevrone.svg"/>
      <div class="cont">
      <div class="backText">{{ headerText }}</div>
      </div>
    </div>
    <img src="/logo.svg" alt="logo" class="logo" :class="logo ? 'active': 'OnActive'"/>
  </div>
  </div>
</template>

<script>

export default {
  name: "TheHeader",
  data() {
    return {
      check:false,
      checkText:false,
      logo: null,
      backText :false
    }
  },
  created() {
    if(this.logo===null) {
      if (this.isHeaderAnimated) {
        console.log(this.isHeaderAnimated)
        this.logo = true
        this.backText = true
      } else {
        this.logo = null
        this.backText = null
      }
    }
  },
  computed: {
    headerText() {
      return this.$store.getters['modules/header/headerText']
    },
    isHeaderAnimated() {
      return this.$store.getters['modules/header/isHeaderAnimated']
    }
  }

}
</script>

<style scoped>

.cont{
  display: inline-block;
}

.shownOn{
  overflow: hidden;
  white-space: nowrap;
  animation: typing 0.3s steps(20, end) forwards;
  width: 0;
}


.backText{
  white-space: nowrap;
  transition: all 0.2s;
  font-size: 16px;
  width: 0
}
.backText.shown {
  width: 100%
}

.backArrow{
  margin-right: 4px;
}
.header {
  padding: 24px 40px 20px 0;
  position: relative;
}
.logo{
  position: absolute;
  left: 0
}
.logo.OnActive{
  position: absolute;
  right: 0;
  left: inherit;
}
.logo.active{
  position: absolute;
  right: 0;
  left: inherit;
  animation-name: slidein;
  animation-duration: 1s;
  animation-delay: inherit;
}
@keyframes slidein {
  from {
    right: calc(100% - 130px);
  }
  to {
    right: 0;
  }}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
</style>
