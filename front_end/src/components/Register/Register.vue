<template>
  <div class="register" @click="isRegister">
    <form @submit.prevent="register" @click.stop class="register_form">
      <label for="account">
        姓&emsp;&emsp;名：<input type="text" placeholder="用户名" id="account" v-model="user.userName">
      </label>
      <label for="email">
        邮&emsp;&emsp;箱：<input type="text" placeholder="邮箱" id="email" v-model.lazy="user.email">
      </label>
      <label for="phone">
        手&emsp;&emsp;机：<input type="text" placeholder="手机号" id="phone" v-model.lazy.trim.number="user.phone">
      </label>
      <label for="password">
        密&emsp;&emsp;码：<input type="password" placeholder="密码" id="password" v-model.trim="user.password">
      </label>
      <label for="verPassword">
        验证密码：<input type="password" placeholder="再输入一次密码" id="verPassword" v-model.trim="user.verPassword">
      </label>
      <p class="tips" v-if="isTips">{{ tipsVal }}</p>
      <button type="submit" value="注册">注册</button>
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
        userName: "",
        password: "",
        verPassword: "",
        email: "",
        phone: ""
      },
      isTips: false,
      tipsList: ["两次密码输入不一致，请重新输入", "手机号码格式错误，请重新输入", "邮箱格式错误，请重新输入", "此手机号码已注册", "表单中含有错误，请检查"],
      tipsVal: "",
    }
  },
  methods: {
    register(e) {
      if (this.isTips) return alert(this.tipsList[4]);
      if (!this.user.password || this.user.password !== this.user.verPassword) {
        this.isTips = true
        this.tipsVal = this.tipsList[0]
        return
      } else {
        this.isTips = false
        this.tipsVal = ""
      }
      axios.post("/api/user/register",
          {
            'username': this.user.userName,
            'password': md5(this.user.password),
            'email': this.user.email,
            'phone': this.user.phone
          }).then(r => {
        console.log(r)
        if (r.data.code === 200) {
          this.isRegister();
        }
      }).catch()
      /* // if (this.user.password && this.user.password === this.user.verPassword){
       //   axios.post("http://39.101.72.168:8000/api/user/register",
       //       {
       //
       //       })
       // }else{
       //   //提示
       //   this.isTips = true
       // }*/
    },
    isRegister() {
      this.$emit('isRegister')
    },
    verPhone() {
      const isPhone = /^(13[0-9]|14[5-9]|15[0-35-9]|16[6]|17[0-8]|18[0-9]|19[8-9]|147|166|192|198|17[0-1]|162)\d{8}$/.test(this.user.phone)
      if (isPhone) {
        this.isTips = false
        this.checkDuplicatePhoneNumber()
        return
      }
      this.isTips = true
      this.tipsVal = this.tipsList[1]
    },
    verEmail() {
      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.user.email)
      if (isEmail) {
        this.isTips = false
        return
      }
      this.isTips = true
      this.tipsVal = this.tipsList[2]
    },
    checkDuplicatePhoneNumber() {
      axios.post(" /api/user/phoneOccupy",
          {
            'phone': this.user.phone
          })
          .then(r => {
            console.log(r)
            if (r.data.code !== 200) {
              this.isTips = true
              this.tipsVal = this.tipsList[3]
              return
            }
            this.isTips = false
          }).catch()
    }

  },
  watch: {
    'user.phone'(newVal, oldVal) {
      this.verPhone()
    },
    'user.email'(newVal, oldVal) {
      this.verEmail()
    }
  }
}
</script>

<style scoped>
.register {
  width: 100vw;
  height: 100vh;
  background: lightblue;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register_form {
  width: 90%;
  max-width: 400px;
  margin: 20px auto;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register_form label {
  font-size: 18px;
  color:#333333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-indent: 10px;
  text-align: left;
}

.register_form input {
  width: 100%;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  margin-left: 10px;
}

.register_form button[type="submit"] {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background-color: #333333;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

.tips {
  color: #999999;
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
}
</style>






