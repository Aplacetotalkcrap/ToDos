<template>
  <div class="container">
    <h1>WellCome</h1>
    <form>
      账号：
      <input type="text" placeholder="请输入电话号码" v-model.lazy.trim.number="user.phone">
      <!--        修饰符  lazy == onchange, trim 去空格, number 只输出数字-->
      <br><br>
      密码：
      <input type="password" placeholder="请输入密码" v-model.trim="user.password">
      <br><br>
      <button class="login" type="submit" @click.prevent="login">登录</button>
      <button class="registerBtn" @click.prevent="register">注册</button>
      <button class="forget" @click.prevent="forget">忘记密码</button>
    </form>
<!--        {{ $store.state.userInfo }}-->
    <Register v-if="isRegister" @isRegister="register"/>
  </div>
</template>

<script>
import Register from "@/components/register/Register.vue";
import axios from "axios";
import md5 from "js-md5"

export default {
  name: "LoginView",
  data() {
    return {
      isRegister: false,
      user: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      // this.$router.push({path:"/home"})
      //验证手机号和密码格式
      const user = {...this.user}
      user.password = md5(user.password)
      await this.$store.dispatch('login', user)
      if (this.$store.state.userInfo.token) {
        // console.log(111)
        this.$router.push("/home")
      }
    },
    register() {
      this.isRegister = !this.isRegister
    },
    forget() {

    },
  },
  components: {
    Register
  },
}
</script>

<style scoped>
h1 {
  margin: 100px 0;
  color: white;
}

.container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  text-align: center;
  background: url("../../public/static/bg2.png") no-repeat;
  background-size: 100% 100%;
  color: white;
  font-size: 20px;
}

.login {
  margin-right: 20px;
}

.registerBtn {
  margin-right: 20px;
}

.forget, .login, .registerBtn {
  background-color: transparent;
  border: none;
  font-size: 16px;
}

button:hover {
  color: blue;
}

input {
  border: none;
  border-bottom: 1px solid;
  background-color: transparent;
  outline: medium;
}

</style>