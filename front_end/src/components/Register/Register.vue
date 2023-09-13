<template>
  <div class="register" @click="isRegister">
    <form @submit.prevent="register" @click.stop class="register_form">
      <label for="account">
        用户名：<input type="text" placeholder="用户名" id="account" v-model="user.userName">
      </label>
      <label for="password">
        密码：<input type="password" placeholder="密码" id="password" v-model="user.password">
      </label>
      <p class="tips" v-if="isTips">两次密码输入不一致</p>
      <label for="verPassword">
        验证密码：<input type="password" placeholder="在输入一次密码" id="verPassword" v-model="user.verPassword">
      </label>
      <label for="email">
        邮箱：<input type="text" placeholder="邮箱" id="email" v-model="user.email">
      </label>
      <label for="phone">
        手机号：<input type="text" placeholder="手机号" id="phone" v-model="user.phone">
      </label>
      <button type="submit" value="注册">注册</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Register",
  data() {
    return {
      user: {
        userName: "",
        password: "",
        verPassword: "",
        email: "",
        phone: ""
      },
      isTips: false
    }
  },
  methods: {
    register(e) {
      if (!this.user.password || this.user.password !== this.user.verPassword) return this.isTips = true
      axios.post("/api/user/register",
          {
            'username': this.user.userName,
            'password': this.user.password,
            'verPassword': this.user.verPassword,
            'email': this.user.email,
            'phone': this.user.phone
          }).then(r => {
        console.log(r)
        if (r.data.code === 200) {
          this.isRegister();
        }
      }).catch()
      // if (this.user.password && this.user.password === this.user.verPassword){
      //   axios.post("http://39.101.72.168:8000/api/user/register",
      //       {
      //
      //       })
      // }else{
      //   //提示
      //   this.isTips = true
      // }

    },
    isRegister(){
      this.$emit('isRegister')
    }
  }
}
</script>

<style scoped>
.register {
  width:100vw;
  height: 100vh;
  background: #666666cc;
  position: fixed;
  top: 0;
  left: 0;
}

.register_form {
  width: 90%;
  margin: 20px auto;
  background: aliceblue;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  border-radius: 30px
}

.tips {
  color: red;
  font-size: 20px;
}
</style>