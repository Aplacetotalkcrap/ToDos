<template>
  <div class="container">
    <h1>登录页面</h1>
    <button @click="login">登录</button>
    <button @click="register">注册</button>
    <Register v-if="isRegister" @isRegister="register"></Register>
  </div>
</template>

<script>
import Register from "@/components/Register/Register.vue";
export default {
  name: "loginView",
  data() {
    return {
      isRegister:false
    };
  },
  methods:{
    login(){
      this.$router.push({path:"/home"})
    },
    register(){
      this.isRegister=!this.isRegister
    }
  },
  components:{
    Register
  }
}
</script>

<style scoped>
.container{
  width: 100vw;height: 100vh;
  position: absolute;top: 0;left: 0;
  background: lightgreen;z-index: 2;
}
</style>