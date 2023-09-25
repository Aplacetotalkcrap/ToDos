<template>
  <div class="container">
    <h2>待办事项</h2>
    <button v-if="isSubComplete" @click="subCompleted" class="button">确定完成</button>
    <ol>，
      <!--     遍历渲染待办事项-->
      <li
          v-for="(todo,index) in todolist"
          :key="todo.id"
          @click="isCompleted(index)"
      >
        <span :style="{background:colors[index]}">{{ index + 1 }}</span>
        <p v-if="todo.complete === 0">{{ todo.event }}</p>
        <p v-else class="lineThrough">{{ todo.event }}</p>
        <div class="close-button-container">
          <img src="../../public/static/close.png" alt="" v-if="isShowDelete">
        </div>
      </li>
    </ol>
    <!-- 添加待办事项按钮 -->
    <img src="../assets/img/edit.png" alt="" class="edit" @click="addTodo">

    <img src="../../public/static/delete.png" alt="" class="delete" @click="showDelete">
    <!-- 添加待办事项组件（仅在编辑状态下显示） -->
    <AddTodo v-if="isEdit" @showTodoList="showTodoList" @addSuccess="addSuccess"></AddTodo>
  </div>
</template>

<script>
// 导入添加待办事项组件
import AddTodo from "@/components/AddTodo/AddTodo.vue";
// 导入 Axios 用于发起 HTTP 请求
import axios from "axios";

export default {
  components: {
    AddTodo
  },
  name: "ToDoList",
  data() {
    return {
      // 待办事项颜色数组
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
      // 编辑状态标志
      isEdit: false,
      isShowDelete: false,
      todolist: []
    }
  },
  computed: {
    isSubComplete() {
      return Boolean(this.todolist.find(item => item.complete === 1))
    },
    /*   //响应式获取vuex里面的数据
       incomplete(){
         return this.$store.state.todos.filter(todo =>todo.complete === 0)
       }*/

  },
  mounted() {
    // 获取待办事项数据
    this.getTodos()
  },
  methods: {
    addTodo() {
      this.isEdit = true
    },
    // 退出编辑状态
    showTodoList() {
      this.isEdit = false
    },
    // 获取待办事项数据
    async getTodos() {
      /*      axios.get(`/api/todo/queryToDo?userId=${this.$store.state.userInfo.uid}`)
                .then(
                    r => {
                      this.todoList = [...r.data]
                    }
                ).catch()*/
      /*     if(this.$store.state.todos.length === 0){
             this.$store.dispatch('getTodos')
           }*/
      await this.$store.dispatch('getTodos')
      this.todolist = this.$store.state.todos.filter(todo => todo.complete === 0)
    },
    showDelete() {
      this.isShowDelete = !this.isShowDelete
    },
    // 添加待办事项成功，更新待办事项列表
    addSuccess() {
      this.showTodoList()
      this.getTodos()
    },
    isCompleted(index) {
      this.todolist[index].complete = this.todolist[index].complete === 0 ? 1 : 0
    },
    subCompleted() {
      const completedArr = this.todolist
          .filter(item => item.complete === 1)
          //声明一个数组用来接收数据，它的元素是从todo列表里过滤complete为1（代表已完成）的todo的id
          .map(item => item.id)
      axios.post('/api/todo/modifyToDo', {
        completedArr,
        // 用户令牌，检查 Vuex 存储和 Cookie
        token: this.$store.state.userInfo.token || this.getCookie('token')
      })
          .then(
              r => {
                console.log(r.data)
                if (r.data.code === 200) {
                  this.getTodos()
                }
              }
          ).catch()
    }
  }
}
</script>

<style scoped>
body {
  height: 100%;
}
.button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #FFB6C1;
  position: fixed;
  right: 30px;
  bottom: 270px;
  z-index: 2;
  border: white;
}

.close-button-container {
  display: inline-block;
  line-height: 30px;
  text-align: right;
  float: right;
}

.close-button-container img {
  width: 30px;
  height: 30px;
}

ol {
  margin: 0;
}

h2 {
  text-align: center;
  margin: 0;
}

.container {
  width: 100vw;
  height: 1062px;
  background: url("../../public/static/bg1.png");
  background-size: 100% 100%;
}

ol > li > span {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  margin-right: 10px;
}

ol > li > p {
  display: inline-block;

}

li {
  list-style: none;
  z-index: 3;
}

/* 编辑按钮样式 */
.edit {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 30px;
  bottom: 130px;
}

.delete {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 30px;
  bottom: 200px;
}

.lineThrough {
  text-decoration: line-through;
  color: #aaa;
}
</style>
