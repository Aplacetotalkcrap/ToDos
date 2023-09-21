<template>
  <li>
    <img :src="imageUrl" alt="">
    <router-link :to="path">
      <slot></slot>
      <!--    匿名插槽-->
    </router-link>
  </li>
</template>

<script>
export default {
  name: "ProfileItem",
  props: ['path', 'imageUrl'],
}
</script>

<style scoped>
li {
  font-size: 25px;
  height: 60px;
  margin-top: 10px;
  list-style: none;
  padding-left: 50px;
  display: flex;
  align-items:center;
}

li a {
  text-decoration: none;
  color: #515151;
}
li img{
  width: 40px;
  height: 40px;
  margin-right: 20px;
}
li a:after {
  content: ">";
  display: inline-block;
  position: absolute;
  right: 30px;
}
</style>