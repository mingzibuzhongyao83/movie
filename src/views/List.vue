<template>
  <div class="list">
    <div class="title">
      <span>电影榜单</span>
    </div>
    <div class="big-box">
      <div class="new-movie">
        <div class="new-title clearfix">
          <span class="bang fl">新片榜</span>
          <span class="look fr" @click="gonewMore()">全部 ></span>
        </div>
        <div class="new-movie-box">
          <div class="allmovie clearfix">
            <div class="movie-box fl" v-for="(item,index) in newMovieData" :key="index">
              <div class="movie-img" @click="goDetail(item.id)" :style="' background: url('+ item.images.small  +') no-repeat;'">
                <!-- <img class="auto-img img" v-if="item.images" :src="item.images.small" alt /> -->
                <div class="biao">
                  <div class="big">{{item.Num}}</div>
                  <div class="small"></div>
                </div>
              </div>

              <div class="movie-name">
                <span>{{item.title}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="new-movie">
        <div class="new-title clearfix">
          <span class="bang fl">口碑榜</span>
          <span class="look fr" @click="goweeklyMore">全部 ></span>
        </div>
        <div class="new-movie-box">
          <div class="allmovie clearfix">
            <div class="movie-box fl" v-for="(item,index) in weeklyMovieData" :key="index">
              <div class="movie-img" @click="goDetail(item.subject.id)" :style="' background: url('+ item.subject.images.small  +') no-repeat;'">
                <!-- <img class="auto-img img" :src="item.subject.images.small" alt /> -->
                <div class="biao">
                  <div class="big">{{item.Num}}</div>
                  <div class="small"></div>
                </div>
              </div>

              <div class="movie-name">
                <span>{{item.subject.title}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="new-movie">
       <div class="new-title clearfix">
          <span class="bang fl">北美票房榜</span>
          <span class="look fr"  @click="gousMore">全部 ></span>
        </div>
        <div class="new-movie-box">
          <div class="allmovie clearfix">
            <div class="movie-box fl" v-for="(item,index) in americaMovieData" :key="index">
              <div class="movie-img" @click="goDetail(item.subject.id)" :style="' background: url('+ item.subject.images.small  +') no-repeat;'">
                <!-- <img class="auto-img img" :src="item.subject.images.small" alt /> -->
                <div class="biao">
                  <div class="big">{{item.Num}}</div>
                  <div class="small"></div>
                </div>
              </div>

              <div class="movie-name">
                <span>{{item.subject.title}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="new-movie">
        <div class="new-title clearfix">
          <span class="bang fl">top100</span>
          <span class="look fr" @click="goTop">全部 ></span>
        </div>
        <div class="new-movie-box">
          <div class="allmovie clearfix">
            <div class="movie-box fl" v-for="(item,index) in topMovieData" :key="index">
              <div class="movie-img" @click="goDetail(item.id)" :style="' background: url('+ item.images.small  +') no-repeat;'">
                <!-- <img class="auto-img img" :src="item.images.small" alt /> -->
                <div class="biao">
                  <div class="big">{{item.Num}}</div>
                  <div class="small"></div>
                </div>
              </div>

              <div class="movie-name">
                <span>{{item.title}}</span>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "List",
  data() {
    return {
      newMovie: "new_movies",
      weeklyMovie: "weekly",
      usMovie: "us_box",
      topMovie: "top250"
    };
  },
  computed: {
    ...mapState("listModule", [
      "newMovieData",
      "weeklyMovieData",
      "americaMovieData",
      "topMovieData"
    ]),
    listloaded() {
      return this.$store.state.listloaded;
    }
  },
  created() {
    if (this.listloaded) {
      return;
    }
    this.$store.commit("listModule/emptyData");
    this.getNewmovieData("new_movies");
    this.getNewmovieData("weekly");
    this.getNewmovieData("us_box");
    this.getTopData();

    this.$store.commit("changeData", { key: "listloaded", value: true });
  },

  methods: {
    //获取新片榜
    getNewmovieData(name) {
      this.axios({
        method: "GET",
        url: "/test",
        params: {
          type:'/'+ name +'?',
          apikey: this.apikey
        }
      })
        .then(res => {
          
          let data = res.data.subjects.slice(0, 3);
          data.forEach((v, i) => {
            v.Num = i + 1;
          });
          
          if (name == "new_movies") {
            this.$store.commit("listModule/changeData", {
              key: "newMovieData",
              value: data
            });
          } else if (name == "weekly") {
            this.$store.commit("listModule/changeData", {
              key: "weeklyMovieData",
              value: data
            });
          } else {
            this.$store.commit("listModule/changeData", {
              key: "americaMovieData",
              value: data
            });
          }

          //关闭加载提示
          this.$toast.clear();
        })
        .catch(err => {
          
          //关闭加载提示
          this.$toast.clear();
        });
    },

    //获取top250
    getTopData() {
      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "数据加载中..."
      });
      this.axios({
        method: "GET",
        url: "/test",
        params: {
          type:'/top250?',
          apikey: this.apikey,
          start: 0,
          count: 3
        }
      })
        .then(res => {
          //关闭加载提示
          this.$toast.clear();
          
          let data = res.data.subjects;
          data.forEach((v, i) => {
            v.Num = i + 1;
          });
          this.$store.commit("listModule/changeData", {
            key: "topMovieData",
            value: data
          });

          
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
          
        });
    },

    //跳转详情
    goDetail(id) {
      this.$router.push({ name: "Detail", params: { id } });
    },

    //查看新片榜更多
    gonewMore() {
      this.$router.push({ name: "ListMovie", params: { name: "new_movies" } });
    },

    //查看口碑榜
    goweeklyMore() {
      this.$router.push({ name: "ListMovie", params: { name: "weekly" } });
    },

    //查看北美票房榜
    gousMore() {
      this.$router.push({ name: "ListMovie", params: { name: "us_box" } });
    },

    //查看电影250
    goTop() {
      this.$router.push({ name: "ListMovie", params: { name: "top250" } });
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  .look{
    text-align: right;
   
  }
  .title {
    padding: 10px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px #ddd solid;
    font-size: 14px;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ebecec;
    z-index: 6;
  }
  .big-box {
    margin-top: 51px;
    margin-bottom: 50px;
  }
  .new-movie {
    padding: 10px;
    border-bottom: 1px #ddd solid;
    .new-title {
      height: 30px;
      line-height: 30px;
      color: #444;
      font-size: 14px;
      padding-bottom: 10px;

      .bang {
        font-weight: 600;
      }
      .look {
        font-size: 12px;
      }
    }
    .new-movie-box {
     
      .allmovie {
      
        .movie-box {
          width: 108px;
          padding-right: 13.3px;
        }
        .movie-box:last-child{
          padding-right: 0px;
        }
        .movie-img {
          width: 110px;
          height: 165px;
          position: relative;
          background-size: cover !important;
            border-radius: 3px;
          // img {
          //   border-radius: 3px;
          //   // object-fit:cover;
          // }
          .biao {
            position: absolute;
            top: 0;
            left: 0;
            .big {
              width: 20px;
              height: 15px;
              background-color: #eeb422;
              line-height: 20px;
              text-align: center;
              color: #e4393c;
              font-weight: 600;
              border-top-left-radius: 3px;
            }
            .small {
              width: 0;
              height: 0;
              border-top: 10px solid #eeb422;
              border-right: 10px solid transparent;
              border-left: 10px solid transparent;
            }
          }
        }
        .movie-name {
          padding-top: 5px;
          height: 30px;
          line-height: 30px;
          font-size: 13px;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap; /*规定段落中的文本不进行换行 */
        }
      }
      .more {
        width: 80px;
        height: 125px;
        background-color: #dddd;
        border-radius: 3px;
        .box {
          text-align: center;
          line-height: 125px;
        }
      }
    }
  }
}
</style>