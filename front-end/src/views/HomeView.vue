<template>
  <div class="home">
    <div class="clock">
      <div class="shi" :style="{transform:`rotate(${getHoursAngle}deg)`}"></div>
      <div class="fen" :style="{transform:`rotate(${getMinutesAngle}deg)`}"></div>
      <!--      <div class="clock-second"></div>-->
      <div class="input-container">
        <input type="button" @click="toAttention" value="专注模式">
        <img src="../../public/static/timeLogo.png" alt="图标">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      time: new Date(),
      clockTimer: null
    }
  },
  methods:{
    toAttention(){
      this.$router.push('/attention')
    }
  },
  computed: {
    getMinutesAngle() {
      return (this.time.getMinutes() + this.time.getSeconds() / 60) * 6
    },
    getHoursAngle() {
      return (this.time.getHours() + this.time.getMinutes() / 60 + this.time.getSeconds() / 60 / 60) * 30
    }
  },
  mounted() {
    setInterval(() => {
      this.time = new Date()
    }, 1000)
  },
  unmounted() {
    clearInterval(this.clockTimer)
  },
}
</script>

<style scoped>
.home {
  width: 100vw;
  height: 91vh;
  /*min-height: calc(100vh - 77px);*/
  background: url("../../public/static/bg6.png") no-repeat;
  background-size: 100% 100%;
}

.clock {
  width: 100%;
  height: 50%;
  background: url("../../public/static/dial.png") center no-repeat;
  background-size: 80% 65%;
  position: relative;
}

.input-container {
  position: relative;
  width: 200px;
  height: 50px;
  margin: 0 auto;
  top: 370px;
}

.input-container input {
  width: 200px;
  height: 50px;
  padding-right: 40px; /* 调整输入框左侧的内边距以给图标留出空间 */
  font-size: 24px;
  background-color: #7e8cff;
  border-radius: 5px;
  border: 1px solid #4d4d4d;
}

.input-container img {
  position: absolute;
  right: 14px;
  top: 6px;
  width: 40px;
  height: 40px;
}

.shi {
  width: 4px;
  height: 45px;
  background-color: #fff;
  position: absolute;
  top: 145px;
  left: 189px;
  border-radius: 2px;
}

.fen {
  width: 3px;
  height: 90px;
  background-color: white;
  position: absolute;
  top: 100px;
  left: 190px;
  border-radius: 1.5px;
}

.shi, .fen {
  transform-origin:center bottom;
}
</style>