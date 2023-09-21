<template>
  <div class="container">
    <h2>个人中心</h2>
    <div class="headSculpture"></div>
    <br>
    <p>11111</p>
    <ul>
      <ProfileItem
          v-for="item in routerList"
          :key="item.id"
          :path="item.path"
          :imageUrl="item.imageUrl"
      >
        {{ item.name }}
      </ProfileItem>
    </ul>
  </div>
</template>

<script>
import ProfileItem from "@/components/profile/ProfileItem.vue";


export default {
  name: "ProfileView",
  components: {
    ProfileItem
  },
  data() {
    return {
      routerList: [
        {id: "0",
          imageUrl: '../../public/static/supervise.png',
          name: "账户与安全", path: "/test",},
        {id: "1",
          imageUrl: '../../public/static/prompt.png',
          name: "项目信息", path: "test",},
        {id: "2",
          imageUrl: '../../public/static/setting.png',
          name: "基本设置", path: "test",},
        {id: "3",
         imageUrl: '../../public/static/phone.png',
          name: "联系我们", path: "test",},
        {id: "4",
          imageUrl: '../../public/static/changeBg.png',
          name: "更换背景", path: "test",}
      ]
    }
  }
}
</script>

<style scoped>
h2{
  font-size: 25px;
  background: #fff;
  padding-bottom: 25px;
}
h2,p{
  text-align: center;
}
.container{
  width: 100vw;
  height: 96vh;
  background:url("../../public/static/bg3.png")no-repeat;
  background-size: 100% 100%;
}
ul{
  padding:0 0 0 0;
}
p{
  margin:0 0 30px 0;
  font-weight: bold;
  font-size: 16px;
}
.headSculpture {
  width: 120px;
  height: 120px;
  margin: 0 auto;

  border-radius: 50%;
  /*background: url("../../public/static/dogHead.png") no-repeat;*/
  background-size: 100% 100%;
}

</style>