<template>
  <div class="container">
    <h1>WellCome</h1>
    <form @submit.prevent="login">
      手机号：<input type="text" placeholder="手机号" v-model.lazy.trim.number="user.phone"><br>
      密&ensp;&ensp;码：<input type="password" placeholder="密码" v-model.trim="user.password"><br>
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
  background: #f5f5f5;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container h1 {
  text-align: center;
  margin-top: 100px;
  font-size: 24px;
}

.container form {
  width: 300px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
}

.container input[type="text"],
.container input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #333333;
  background-color: #ffffff;
}

.container button[type="submit"],
.container button {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background-color: lightblue;
  color: #ffffff;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.container button[type="submit"]:hover,
.container button:hover {
  background-color: #0080ff;
}

.container button[type="submit"] {
  margin-bottom: 10px;
}

.container button[type="submit"]:focus,
.container button:focus {
  outline: none;
  background-color: #0080ff;
}

</style>
