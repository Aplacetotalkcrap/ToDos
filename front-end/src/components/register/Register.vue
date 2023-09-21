<template>
  <div class="register" @click="isRegister">
    <form class="register_form" @submit.prevent="register" @click.stop>
      <label for="account">
        用户名：
        <input type="text" id="account" placeholder="请输入用户名" v-model.trim="user.username">
      </label>
      <label for="password">
        密码：
        <input type="password" id="password" placeholder="请输入密码" v-model.trim="user.password">
      </label>
      <label for="verPassword">
        验证密码：
        <input type="password" id="verPassword" placeholder="请再次输入密码" v-model.trim="user.verPassword">
      </label>
      <label for="email">
        邮箱：
        <input type="email" id="email" placeholder="请输入邮箱" v-model.lazy.trim="user.email">
      </label>
      <label for="phone">
        电话号码：
        <input type="text" id="phone" placeholder="请输入电话号码" v-model.lazy.trim.number="user.phone">
        <!--        修饰符  lazy == onchange, trim 去空格, number 只输出数字-->
      </label>
      <p class="tips" v-if="isTips">{{ tipsVal }}</p>
      <input class="btn" type="submit" value="注册">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'js-md5'

export default {
  name: "Register",
  data() {
    return {
      user: {
        username: '',
        password: '',
        verPassword: '',
        email: '',
        phone: '',
      },
      tipsList: ["两次密码输入不一致，请重新输入", "电话号码格式错误", "此号码已被注册", "邮箱格式不正确", "你个傻缺输错了"],
      tipsVal: "",
      isTips: false
    }
  },
  watch: {
    'user.phone'(newVal, oldVal) {
      this.verPhone()
    },
    'user.email'(newVal, oldVal) {
      this.verEmail()
    }
  },

  methods: {
    verPhone() {
      const isPhone = /^(1[3-9][0-9])\d{8}$/.test(this.user.phone)
      if (isPhone) {
        this.isTips = false;
        this.checkDuplicatePhoneNumber()
        return
      }
      this.isTips = true;
      this.tipsVal = this.tipsList[1]
    },
    verEmail() {
      const isEmail = /^[/^[a-zA-Z0-9._%+-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/.test(this.user.email)
      if (isEmail) {
        this.isTips = false;
        return
      }
      this.isTips = true;
      this.tipsVal = this.tipsList[3]
    },
    checkDuplicatePhoneNumber() {
      axios.post("/api/user/phoneOccupy",
          {
            "phone": this.user.phone
          })
          .then(r => {
            console.log(r)
            if (r.data.code !== 200) {
              this.isTips = true;
              this.tipsVal = this.tipsList[2]
              return
            }
            this.isTips = false;
          })
    },
    register(e) {
      if (this.isTips) return alert(this.tipsList[4])
      if (!this.user.password && this.user.password !== this.user.verPassword) {
        this.isTips = true;
        this.tipsVal = this.tipsList[0]
        return
      }
      this.isTips = false;

      // console.log(md5(this.user.password))
      axios.post('/api/user/register',
          {
            "username": this.user.username,
            "password": md5(this.user.password),
            "phone": this.user.phone,
            "email": this.user.email,
          }).then(r => {
        console.log(r)
        if (r.data.code === 200) {
          this.isRegister();
        }
      }).catch()
      /*     if (this.user.password === this.user.verPassword){

           }else {
             this.isTips = true
           }
           */
    }
    ,
    isRegister() {
      this.$emit('isRegister')
    }
  }
}
</script>

<style scoped>
.register {
  width: 100vw;
  height: 100vh;
  background: #666666cc;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  color: black;
}

.register_form {
  width: 90%;
  margin: 150px auto;
  height: 400px;
  padding: 15px 0 0 0;
  background:  linear-gradient(135deg,lightblue,white);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 40px;
}
label{
  width: 90%;
  text-align: right;
}
input{
  border: none;
  border-bottom:1px solid ;
  background-color: transparent;
  outline:medium;
  width: 60%;
}
.tips {
  color: red;
}
.btn{
  color: red;
  font-size: 20px;
  border:none;
  margin-bottom: 10px;
}
</style>