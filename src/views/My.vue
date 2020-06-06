<template>
  <div class="my">
    <div class="top">
      <div class="img-box">
        <img class="auto-img" src="../assets/images/default.png" alt />
        <div class="username">
          <span>游客1</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-cell
        v-for="(item,index) in myData"
        :key="index"
        :title="item.title"
        :icon="item.icon"
        is-link
        @click="go(item.name)"
      ></van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  data() {
    return {
      allhistory: [],
      allhistoryData: [],
      id: "",
      myData: [{ title: "收藏", name: "Like", icon: "like-o" }]
    };
  },

  created() {},
  methods: {
    go(name) {
      this.$router.push({ name: name });
    }
  }
};
</script>

<style lang="less" scoped>
.my {
  /deep/.van-cell {
    border-bottom: 1px #eee8e8 solid;
  }
  .top {
    height: 200px;
    border-bottom: 1px #ddd solid;
  }
  .img-box {
    height: 100px;
    width: 100px;
    margin: 0 auto;
    padding-top: 50px;
    img {
      border-radius: 50%;
    }
    .username {
      padding-top: 5px;
      height: 20px;
      text-align: center;
      line-height: 20px;
    }
  }
  .like {
    height: 40px;
    padding: 10px;
    line-height: 40px;
    font-size: 15px;
  }
  .bottom {
    padding: 0 10px;
  }
}
</style>