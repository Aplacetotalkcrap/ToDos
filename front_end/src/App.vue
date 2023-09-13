<template>
  <router-view/>
  <TabBar></TabBar>
</template>

<script>
import TabBar from "@/components/tabBar/tabBar.vue";
export default {
  name: "App",
  components:{
    TabBar,
  }
}
</script>

<style>

</style>