<template>
  <router-view/>
  <TabBar/>
</template>

<script>
import TabBar from "@/components/tabBar/TabBar.vue"
export default {
  name: 'App',
  components:{
    TabBar
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
