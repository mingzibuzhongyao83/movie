<template>
  <div class="listmovie">
    <div class="nav-box">
      <van-nav-bar title="榜单" left-arrow @click-left="go" />
      <div class="logo-box clearfix">
        <div class="logo fl">
          <img class="auto-img" src="../assets/images/list.jpg" alt />
        </div>
        <div class="title fl">
          <div class="logo-title" v-if="listName=='new_movies'">新片电影榜</div>
          <div class="logo-title" v-if="listName=='weekly'">一周电影榜</div>
          <div class="logo-title" v-if="listName=='us_box'">欧美票房榜</div>
          <div class="logo-title" v-if="listName=='top250'">历史电影top100</div>
          <div class="num">
            <span>{{sum}}个内容</span>
          </div>
        </div>
      </div>
    </div>

    <div class="list-box">
      <div class="top"></div>
      <div class="bottom">
        <van-list finished-text="已经到底了...." :finished="finished" v-model="loading" @load="loadData">
          <div class="movie-box" v-for="(item,index) in listmovieData" :key="index">
            <div class="movie-top">
              <div class="movie-top-left clearfix">
                <div class="movie-img fl">
                  <div class="movie-pic" @click="goDetail(item.id)">
                    <img class="auto-img movie-pic-img" :src="item.images.small" alt />
                  </div>
                  <div class="biao">
                    <div class="big">{{index+1}}</div>
                    <div class="small"></div>
                  </div>
                </div>

                <div class="movie-info fl">
                  <div class="movie-name">
                    <span>{{item.title}}</span>
                  </div>
                  <div class="tag-avatar clearfix">
                    <div>
                      <span>{{item.pubdates + ' '}}</span>
                      <!-- <span>{{item.countries + ' / '}}</span> -->
                    </div>
                    <div>
                      <span v-for="(item,index) in item.genres" :key="index">{{item + ' '}}</span>
                    </div>

                    <div>
                      <span>导演：</span>
                      <span v-for="(item,index) in item.directors" :key="index">{{item.name + ' '}}</span>
                    </div>
                    <!--  -->
                    <div>
                      <span>演员：</span>
                      <span v-for="(item,index) in item.casts" :key="index">{{item.name + ' '}}</span>
                    </div>
                  </div>
                  <div class="clearfix">
                    <!-- <div class="look fl">
                      <span>{{item.wish_count}}万人想看</span>
                    </div>-->
                    <div class="look fl">
                      <span>{{(item.collect_count/10000).toFixed(2)}}万人看过</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ListMovie",
  data() {
    return {
      listName: "",
      loading: false
    };
  },
  created() {
    let name = this.$route.params.name;
    this.listName = name;
  
    this.$store.commit("listmovieModule/emptyData");

    this.getMovieData(this.listName);

  
  },

  computed: {
    ...mapState("listmovieModule", [
      "movieData",
      "sum",
      "listmovieData",
      "finished",
      "count",
      "start"
    ]),

    
  },

  methods: {
    //获取榜单数据

    getMovieData(name) {
      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "加载中..."
      });
      let params = { apikey: this.apikey ,type:'/'+ name + '?'};
      if (name == "top250") {
        (params.start = 0), (params.count = 50);
      }

      this.axios({
        method: "GET",
        url: "/test",
        params
      })
        .then(res => {
          
          let data = [];
          if (name == "new_movies" || name == "top250") {
            data = res.data.subjects;
          } else if (name == "weekly" || name == "us_box") {
            data = res.data.subjects;
            let arr = [];
            data.forEach(v => {
              arr.push(v.subject);
            });
            data = arr;
            
          }

          this.$store.commit("listmovieModule/changeData", {
            key: "movieData",
            value: data
          });

          this.$store.commit("listmovieModule/changeData", {
            key: "sum",
            value: data.length
          });
          // 

          if (this.movieData != []) {
            this.$toast.clear();
          }
        })
        .catch(err => {
          
          this.$toast.clear();
        });
    },

    go() {
      this.$router.go(-1);
    },

    //加载电影
    loadData() {
      setTimeout(() => {
        this.loading = false;

        if (this.listmovieData.length >= this.movieData.length) {
          //没有数据加载
          this.$store.commit("listmovieModule/changeData", {
            key: "finished",
            value: true
          });

          return;
        }

        this.$store.commit("listmovieModule/loadreviewstData");

        
      }, 5000);
    },

    //跳转详情页
    goDetail(id) {
      this.$router.push({ name: "Detail", params: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
.listmovie {
  .logo-box {
    padding: 20px 10px;
    background-color: #e9e4e4;
    .logo {
      text-align: center;
      line-height: 60px;
      height: 60px;
      width: 60px;
      background-color: #a1a1a1;

      img {
        border-radius: 3px;
      }
    }
  }
  .title {
    padding-left: 20px;
  }
  .logo-title {
    font-size: 14px;
    font-weight: 600;
    padding-top: 5px;
  }
  .num {
    margin-top: 15px;
  }
  .nav-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 3;
  }
  .top {
  }
  .list-box {
    margin-top: 146px;

    .movie-box {
      // height: 200px;
      // background: #ddd;

      padding: 10px;
      border-bottom: 1px solid #e0e0e0;

      .movie-top {
        height: 120px;
        // background: #ffff;
        padding-bottom: 5px;
        .movie-top-left {
          padding: 10px 0 5px;
          border-right: 1px dashed #f9f9f9;
          .movie-img {
            width: 70px;

            padding-right: 10px;
            position: relative;
            .movie-pic {
              width: 70px;

              .movie-pic-img {
                border-radius: 3px;
              }
            }
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
          .movie-info {
            width: calc(100% - 80px);
            .movie-name {
              height: 20px;
              padding: 0px 0 2px;
              font-size: 15px;
              span {
                overflow: hidden;

                text-overflow: ellipsis;

                display: -webkit-box;

                -webkit-box-orient: vertical;

                -webkit-line-clamp: 1;
              }
            }
            .tag-avatar {
              font-size: 11px;
              color: #8d8d8d;
              padding-bottom: 6px;
              div {
                overflow: hidden;

                text-overflow: ellipsis;

                display: -webkit-box;

                -webkit-box-orient: vertical;

                -webkit-line-clamp: 1;
              }
            }
            .look {
              width: 100px;
              height: 25px;
              text-align: center;
              line-height: 25px;
              background-color: #eaeaea;
              border-radius: 3px;
              margin-right: 10px;
            }
          }
        }
      }
      .movie-bottom {
        height: 50px;
        padding: 7px;
        background-color: #eaeaea;
        border-radius: 3px;
        .movie-bottom-txt {
          overflow: hidden;
          color: #8d8d8d;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      }
    }
  }
}
</style>