<template>
  <div id="app">
    <!-- 路由入口 一级路由-->
    <router-view></router-view>
  </div>
</template>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  background: #fff;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.auto-img {
  width: 100%;
  display: block;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
input {
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
}
</style>
