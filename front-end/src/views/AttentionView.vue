<template>
  <div class="container">
    {{ realTime }}
    <!--    {{ hours }}:{{ minutes }}:{{seconds}}-->
    <br>
    <img src="../assets/img/cha.png" alt="" @click="toHome">

  </div>
</template>

<script>
export default {
  name: "AttentionView",
  data() {
    return {
      time: new Date(),
      timepiece: null
    }
  },
  computed: {
    realTime() {
      return this.time.toLocaleTimeString()
    },
    /*    hours() {
          return this.time.getHours()
        },
        minutes() {
          return this.time.getMinutes()<10?`0${this.time.getMinutes()}`:this.time.getMinutes()
        },
            seconds(){
              if (this.time.getSeconds() <10) {
                return '0' + this.time.getSeconds()
              }
              return this.time.getSeconds()
            },*/
  },
  methods: {
    toHome() {
      this.$router.push('/home')
    },
  },
  mounted() {
    this.timepiece = setInterval(() => {
      this.time = new Date()
    }, 1000)
  },
  unmounted() {
    clearInterval(this.timepiece)
  },
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: #fff;
  text-align: center;
  font-size: 45vw;
  /*页面旋转90度*/
  writing-mode: vertical-rl;
  text-orientation: mixed;
  position: fixed;
  z-index: 3;
}

img {
  width: 100px;
  margin-right: -100px;
}
</style>