<template>
  <div class="addTodo">
    <textarea v-model="addTodContent"></textarea><br>
    <button class="button" @click="showTodoList">取消</button>
    <button class="button" @click="submitTodo">确定</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddTodo",
  data() {
    return {
      addTodContent: ""
    }
  },
  methods: {
    showTodoList() {
      this.$emit("showTodoList")
    },
    submitTodo() {
      axios.post('/api/todo/saveToDo',
          {
            event: this.addTodContent,
            token: this.$store.state.userInfo.token || this.getCookie('token')
          })
          .then(
              r => {
                console.log(r.data)
                if(r.data.code === 200){
                  this.$emit("addSuccess")
                }else{
                  alert('添加失败')
                }
              }
          ).catch()
    },
    getCookie(name){
      const cookies = document.cookie.split(';')
      for(const cookie of cookies){
        const[cookieName, cookieValue] = cookie.split('=')
        if(cookieName ===name){
          return decodeURIComponent(cookieValue)
        }
      }
      return null
    },
  }
}
</script>

<style scoped>
.addTodo {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #666666cc;
}

textarea {
  width:70vw;
  height: 20vh;
  position: relative;
  top: 250px;
  left: 45px;
}
button{
  position: relative;
  top: 250px;
  left: 45px;
}
</style>