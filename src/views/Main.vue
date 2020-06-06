<template>
  <div class="main">
    <!-- 二级路由插座 -->
    <router-view></router-view>

    <!-- 底部导航 -->
    <van-tabbar v-model="tabbarName">
      <van-tabbar-item
        :name="item.name"
        :icon="item.icon"
        v-for="(item, index) in tabbarData"
        :key="index"
        @click.native="goPage(item)"
      >{{item.text}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      tabbarData: [
        { name: "Home", icon: "fire-o", text: "影院热映", routeName: "Home" },
        { name: "List", icon: "orders-o", text: "电影榜单", routeName: "List" },
        {
          name: "Search",
          icon: "search",
          text: "搜索电影",
          routeName: "Search"
        },
        { name: "My", icon: "contact", text: "个人中心", routeName: "My" }
      ],
      tabbarName: "Home"
    };
  },
  //返回底部高亮
  created() {
    // console.log('this.$router.history.current.name==>',this.$router.history.current.name)
    this.tabbarName = this.$router.history.current.name;
  },
 
  methods: {
    goPage(item) {
      this.$router.push({ name: item.routeName });
    }

   
  }
};
</script>

<style lang="less" scoped>
.main {

}
</style>