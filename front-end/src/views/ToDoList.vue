<template>
  <h2>待办事项</h2>
  <ol ref="ol">
    <li v-for="todo in todoList" :key="todo.id">{{ todo.event }}</li>
  </ol>

  <img src="../assets/img/edit.png" alt="" class="edit" @click="addTodo">

  <div class="addTodo" v-if="isEdit">
    <textarea></textarea>
    <button @click="showTodoList">取消</button>
    <button>确定</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ToDoList",
  data() {
    return {
      colors: ["#FF0000", "#FF4500", "#FF8C00", "#FFD700", "#008000",
        "#ADFF2F", "#00FF7F", "#00FA9A", "#00CED1", "#4682B4",
        "#1E90FF", "#4169E1", "#8A2BE2", "#9400D3", "#FF00FF",
        "#FF69B4", "#FF1493", "#DC143C", "#FFA07A", "#FFDAB9",
        "#F0E68C", "#FFE4B5", "#FFD700", "#FFC0CB", "#FFB6C1",
        "#FF69B4", "#FF1493", "#DB7093",
        "#CD5C5C", "#F08080", "#E9967A", "#FFA07A", "#FF7F50",
        "#FF6347", "#FF4500", "#FF8C00", "#FFA500", "#FFD700",
        "#ADFF2F", "#32CD32", "#008000", "#006400", "#00FF00",
        "#90EE90", "#98FB98", "#00FA9A", "#00CED1", "#20B2AA",
        "#5F9EA0", "#4682B4", "#B0E0E6", "#1E90FF", "#6495ED",
        "#4169E1", "#7B68EE", "#6A5ACD", "#483D8B", "#8A2BE2",
        "#9400D3", "#9932CC", "#8B008B", "#800080", "#FF00FF",
        "#FF69B4", "#FF1493", "#DB7093", "#FFA07A", "#FFDAB9",
        "#FFE4B5", "#FFD700",
        "#FFE4B5", "#FFD700", "#FFC0CB", "#FFB6C1", "#FF69B4",
        "#FF1493", "#DB7093", "#CD5C5C", "#F08080", "#E9967A",
        "#FFA07A", "#FF7F50", "#FF6347", "#FF4500", "#FF8C00",
        "#FFA500", "#FFD700", "#ADFF2F", "#32CD32", "#008000",
        "#006400", "#00FF00", "#90EE90", "#98FB98", "#00FA9A",
        "#00CED1", "#20B2AA", "#5F9EA0", "#4682B4", "#B0E0E6",
        "#1E90FF", "#6495ED", "#4169E1", "#7B68EE", "#6A5ACD",
        "#483D8B", "#8A2BE2", "#9400D3", "#9932CC", "#8B008B",
        "#800080", "#FF00FF", "#FF69B4", "#FF1493", "#DB7093",
        "#FFA07A", "#FFDAB9", "#FFE4B5", "#FFD700", "#FFFFF0",
        "#F0E68C", "#FFFACD", "#FFE4B5", "#FFD700", "#FFC0CB",
        "#FFB6C1"],
      isEdit: false,
      todoList: []
    }
  },
  mounted() {
    this.setLis()
    this.getTodos()
  },
  updated() {
    this.setLis()
  },
  methods: {
    setLis() {
      for (let i = 0; i < this.$refs.ol.children.length; i++) {
        this.$refs.ol.children[i].innerHTML = `
    <span style="background-color: ${this.colors[i]};display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;color:#fff;
  line-height: 30px;">${i + 1} </span>
       ${this.$refs.ol.children[i].innerHTML}
       `
      }
    },
    addTodo() {
      this.isEdit = true
    },
    showTodoList() {
      this.isEdit = false
    },
    getTodos() {
      axios.get('/api/todo/queryToDo?userId=${this.$Store.state.userInfo.uid}')
          .then(
              r=>{
                this.todoList=[...r.data]
              }
          ).catch()
    }
  }
}
</script>

<style scoped>
ol>li:after {
  content: "X";
  float: right;
}
li{
  list-style: none;
}
.edit{
  width:50px;
  height: 50px;
  position: fixed;
  right: 30px;
  bottom:130px;
}
.addTodo{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top:0;
  left:0;
  z-index: 3;
  background-color: #666666cc;
}
textarea{
  width: 100vw;
  height: 50vh;
}
</style>