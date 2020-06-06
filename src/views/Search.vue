<template>
  <div class="search">
    <div class="search-box">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="onfocus"
      >
        <template #action>
          <div @click="onSearch(value)">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="movie-box">
      <div class="hot-box" v-if="isclick == true">
        <div class="hot-box-top clearfix">
          <div class="hot-title fl">搜索历史</div>
          <div class="detele fr" @click="clear">
            <van-icon class="v-icon" name="delete" color="#000000" size="20" />
          </div>
        </div>

        <div class="hot-content clearfix">
          <div
            class="hot-txt fl"
            v-for="(item,index) in historyData"
            :key="index"
            @click="clickSearch(item)"
          >{{item}}</div>
        </div>
      </div>

      <div class="movie" v-if="isclick == false">
        <div class="big-box" v-for="(item,index) in movieData" :key="index">
          <div class="top clearfix">
            <div class="img fl">
              <img class="auto-img" :src="item.pic" alt />
            </div>
            <div class="left fl">
              <div class="title">
                <span>{{item.title}}</span>
              </div>
              <div class="sort">
                <span>{{item.sort}}</span>
              </div>
              <div class="lang">
                <span>{{item.lang}}</span>
              </div>
              <div class="note">
                <span>{{item.note}}</span>
              </div>

              <div class="move">
                <span>暂无更多信息</span>
              </div>
            </div>
            <div class="right fr">
              <span>暂无评分</span>
            </div>
          </div>
          <div class="bottom">
            <span>{{item.des}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      value: "",
      listData: [],
      isclick: true,
      loading: false
    };
  },
  computed: {
    ...mapState("searchModule", [
      "historyData",
      "movieData",
      "Data",
      "finished",
      "start",
      "count"
    ])
  },

  created() {
    this.$store.commit("searchModule/changeData", {
      key: "movieData",
      value: []
    });

    let historyData = JSON.parse(localStorage.getItem("historyData"));

    if (historyData != null) {
      this.listData = historyData;
    }

    this.$store.commit("searchModule/changeData", {
      key: "historyData",
      value: historyData
    });
  },
  methods: {
    //根据内容获取电影内容
    search(textVaule) {
      this.axios({
        method: "GET",
        url: "/search",
        params: {
          type:'/?action=search&',
          wd: textVaule
        }
      })
        .then(res => {
          
          let data = res.data.data.slice(0, 10);
          let regx = /<[^>]*>|<\/[^>]*>|&nbsp;/g;
          if (res.data.code == "202") {
            this.$toast.clear();
            //加载提示
            this.$toast({
              forbidClick: true,
              duration: 2000,
              message: "超出了能力范围..."
            });
            return;
          } else {
            data.forEach(v => {
              
              this.axios({
                method: "GET",
                url: "/search",
                params: {
                  type:'/?action=play&',
                  id: v.id
                }
              })
                .then(res => {
                  
                  let des = res.data.data.des;
                  if (des == "") {
                    v.des = "暂无简介";
                  } else {
                    v.des = des.replace(regx, "");
                  }
                })
                .catch(err => {
                  
                });
            });

            setTimeout(() => {
              this.$store.commit("searchModule/changeData", {
                key: "movieData",
                value: data
              });
            }, 3000);
            this.$toast.clear();

            
          }
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },

    //按回车键获取搜索内容
    onSearch(value) {
    
      if (value == "") {
        //加载提示
        this.$toast({
          forbidClick: true,
          duration: 2000,
          message: "请输入内容"
        });
        return;
      }
      this.isclick = false;
      // 
      this.$store.commit("searchModule/changeData", {
        key: "movieData",
        value: []
      });

      //记录搜索记录
      if (localStorage.getItem("historyData") == null) {
        this.listData.unshift(value);
        localStorage.setItem("historyData", JSON.stringify(this.listData));
      } else {
        if (this.listData.indexOf(value) != -1) {
          this.listData.splice(this.listData.indexOf(value), 1);
          this.listData.unshift(value);
        } else {
          this.listData.unshift(value);
        }

        if (this.listData.length > 10) {
          this.listData.pop();
        }

        localStorage.setItem("historyData", JSON.stringify(this.listData));
      }

      let hData = JSON.parse(localStorage.getItem("historyData"));

      this.$store.commit("searchModule/changeData", {
        key: "historyData",
        value: hData
      });
      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "数据加载中..."
      });

      //根据内容搜索
      this.search(value);
    },

    //清除记录
    clear() {
      localStorage.removeItem("historyData");
      this.$store.commit("searchModule/changeData", {
        key: "historyData",
        value: []
      });
    },

    //获取焦点时
    onfocus() {
       this.value = "";
      
      this.isclick = true;

      this.$store.commit("searchModule/changeData", {
        key: "movieData",
        value: []
      });
    },

    //点击搜索记录搜索电影
    clickSearch(item) {
      this.value = item;
      this.isclick = false;
      
      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "数据加载中..."
      });

      this.search(item);
      if (this.listData.indexOf(item) != -1) {
        this.listData.splice(this.listData.indexOf(item), 1);
        this.listData.unshift(item);
      }
      localStorage.setItem("historyData", JSON.stringify(this.listData));
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  .movie-box {
    margin-top: 54px;
    margin-bottom: 50px;
  }
  .search-box {
    border-bottom: 1px #ddd solid;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .hot-box-top {
    padding: 10px;
  }
  .hot-title {
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    font-weight: 600;
  }

  .hot-content {
    height: 100%;
    padding: 0 10px 10px;
  }
  .hot-txt {
    padding: 5px;
    height: 15px;
    float: left;
    // background-color: #ddd;
    line-height: 15px;
    border: 1px #000 solid;
    border-radius: 30px;
    margin-right: 10px;
    margin-bottom: 5px;
  }
  .detele {
    margin-top: 2px;
  }
  .movie {
    padding: 10px;
    // height: 100px;
    // background-color: #ddd;
  }
  .img {
    width: 85px;
  }
  .title {
    font-size: 15px;
    font-weight: 600;
  }
  .left {
    padding: 10px;
    width: 180px;
    div {
      padding-bottom: 3.4px;
    }
  }
  .right {
    padding: 10px 0;
    width: 70px;
    font-weight: 600;
  }
  .big-box {
    padding: 10px 0;
    border-bottom: 1px #ddd solid;
  }
  .bottom {
    padding: 10px;
    span {
      overflow: hidden;
      color: #8d8d8d;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
}
</style>