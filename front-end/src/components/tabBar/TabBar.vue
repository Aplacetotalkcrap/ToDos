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
  name: "TabBar"
}
</script>

<style scoped>
ul{
  list-style: none;
  margin: 0;
  padding: 9px 0 0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 68px;
  background-color: white;
  border: 1px solid #000;
  display: flex;
  justify-content: space-around;
}
li{
  width:50px;
  height: 50px;
}
li img{
  width: 100%;
  height: 100%;
}

</style>