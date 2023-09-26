<template>
  <div class="container">
    {{ realTime }}
    <!--    {{ hours }}:{{ minutes }}:{{seconds}}-->
    <br>
    <img src="../assets/img/cha.png" alt="" @click="toHome">

  </div>
</template>

<script>
import axios from "axios";
import {getCookie} from "@/utils";

export default {
  name: "AttentionView",
  data() {
    return {
      time: new Date(),
      timepiece: null,
      keepTimer: null//keep timer计时
    }
  },
  computed: {
    realTime() {
      return this.time.toLocaleTimeString()
    },
  },
  methods: {
    toHome() {
      this.$router.push('/home')
    },
  },
  mounted() {
    this.clockTimer = setInterval(() => {
      this.time = new Date()
    }, 1000)
    this.keepTimer = setInterval(() => {
      axios.get(`/api/intent/setIntent?token=${this.$store.state.userInfo.token || getCookie('token')}`)
    }, 1000 * 60)
  },

  unmounted() {
    clearInterval(this.clockTimer)
    clearInterval(this.keepTimer)
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
  font-size: 40vw;
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