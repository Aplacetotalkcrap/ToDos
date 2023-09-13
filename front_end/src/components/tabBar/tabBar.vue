<template>
  <ul>
    <li>
      <router-link to="/home">
        <img src="../../assets/img/home.png" alt="">
      </router-link>
    </li>
    <li>
      <router-link to="/todo-list">
        <img src="../../assets/img/calendar.png" alt="">
      </router-link>
    </li>
    <li>
      <router-link to="/history">
        <img src="../../assets/img/history.png" alt="">
      </router-link>
    </li>
    <li>
      <router-link to="/profile">
        <img src="../../assets/img/user.png" alt="">
      </router-link>
    </li>
    <li>
      <router-link to="/statistics">
        <img src="../../assets/img/data-view.png" alt="">
      </router-link>
    </li>

  </ul>
</template>

<script>
export default {
  name: "tabBar"
}
</script>

<style scoped>
ul{
  margin: 0;
  padding: 9px 0 0;
  list-style: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 68px;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid black;
}
li{
  width: 50px;
  height: 50px;
}
li img{
  width: 100%;
  height: 100%;
}
</style>