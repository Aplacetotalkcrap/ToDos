<template>
  <div class="container">
    <h1>登录页面</h1>
    <form @submit.prevent="login">
      手机号：<input type="text" placeholder="手机号" v-model.lazy.trim.number="user.phone">
      密码：<input type="password" placeholder="密码" v-model.trim="user.password">
      <button type="submit" @click="login">登录</button>
    </form>
    <button @click="register">注册</button>
    <Register v-if="isRegister" @isRegister="register"></Register>
    {{$store.state.userInfo}}
  </div>
</template>

<script>
import Register from "@/components/Register/Register.vue";
import axios from "axios";
import md5 from "js-md5";

export default {
  name: "loginView",
  data() {
    return {
      isRegister: false,
      user: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      // this.$router.push({path: "/home"})
      //验证电话号码和密码强密码验证
      const user = {...this.user}
      user.password = md5(user.password)
      this.$store.dispatch('login',user)
    },
    register() {
      this.isRegister = !this.isRegister
    }
  },
  components: {
    Register
  }
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: lightgreen;
  z-index: 2;
}
</style>