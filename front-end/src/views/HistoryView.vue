<template>
  <div class="container">
    <!-- 待办事项标题 -->
    <h2>已完成事项</h2>
    <ol>
      <!-- 遍历渲染待办事项 -->
      <li v-for="(item,index) in historyEvent" :key="item.id">
        <span :style="{background:colors[index]}">{{ index + 1 }}</span>
        {{item.event}}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "HistoryView",
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
      // 待办事项列表数据
      todos: [],
    }
  },
  computed:{
    historyEvent(){
     return this.$store.state.todos.filter(i => i.complete ===1)
    }
  },
  mounted() {
    // 获取待办事项数据
    this.getTodos()
  },
  methods: {
    // 获取待办事项数据
    async getTodos() { //根据token查找对应的todos，不应该用userid 不安全
      await this.$store.dispatch('getTodos')
    },
  }
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 1062px;
  background: url("../../public/static/bg1.png");
  background-size: 100% 100%;
}
h2{
  text-align: center;
  margin: 0;
}

li {
  list-style: none;
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
</style>
