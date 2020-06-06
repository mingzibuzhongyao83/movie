<template>
  <div class="like">
    <div class="nav-box">
      <van-nav-bar title="想看" left-arrow @click-left="go" />
    </div>

    <div class="like-box">
      <div class="movie-top" v-for="(item,index) in likeData" :key="index">
        <div class="movie-top-left clearfix">
          <div class="movie-img fl">
            <div class="movie-pic" @click="godetail(item.id)">
              <img class="auto-img movie-pic-img" :src="item.images.small" alt />
            </div>
          </div>

          <div class="movie-info fl">
            <div class="movie-name">
              <span>{{item.title}}</span>
            </div>
            <div class="tag-avatar clearfix">
              <div>
                <span>{{item.year}}</span>
                <!-- <span>{{item.countries + ' / '}}</span> -->
              </div>
              <div>
                <span v-for="(item,index) in item.genres" :key="index">{{item + ' '}}</span>
              </div>

              <div>
                <span>导演：</span>
                <span v-for="(item,index) in item.directors" :key="index">{{item.name}}</span>
              </div>
              <!--  -->
              <div>
                <span>演员：</span>
                <span v-for="(item,index) in item.casts" :key="index">{{item.name}}</span>
              </div>
            </div>
            <div class="clearfix">
              <!-- <div class="look fl">
                      <span>{{item.wish_count}}万人想看</span>
              </div>-->
              <div class="look fl">
                <span>{{item.wish_count}}人想看</span>
              </div>
              <div class="fr" @click="deleteData(item.id)">
                <van-icon class="v-icon" name="delete" color="#000000" size="22" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text" v-if="likeData==[]||likeData==null">
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  nameL: "Like",
  data() {
    return {
      loading: false
    };
  },
  created() {
    let likeData = JSON.parse(localStorage.getItem("likeData"));

    this.$store.commit("likeModule/changeData", {
      key: "likeData",
      value: likeData
    });

    this.$store.commit("likeModule/changeData", {
      key: "alllikeData",
      value: likeData
    });
  },
  computed: {
    ...mapState("likeModule", [
      "likeData",
      "alllikeData",
      "start",
      "count",
      "finished"
    ])
  },
  methods: {
    go() {
      this.$router.go(-1);
    },
    deleteData(id) {
      let Data = JSON.parse(localStorage.getItem("likeData"));

      Data.forEach((v, i) => {
        if (v.id == id) {
          Data.splice(i, 1);
        }
      });

      localStorage.setItem("likeData", JSON.stringify(Data));
      this.$store.commit("likeModule/changeData", {
        key: "alllikeData",
        value: Data
      });
      this.$store.commit("likeModule/changeData", {
        key: "likeData",
        value: Data
      });
    },
    //加载电影
    // loadData() {
    //   setTimeout(() => {
    //     this.loading = false;

    //     if (this.likeData.length >= this.alllikeData.length) {
    //       //没有数据加载
    //       this.$store.commit("likeModule/changeData", {
    //         key: "finished",
    //         value: true
    //       });

    //       return;
    //     }

    //     this.$store.commit("likeModule/loadreviewstData");
    //
    //   }, 2000);
    // },

    //跳转详情页
    godetail(id) {
      this.$router.push({ name: "Detail", params: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
.like {
  .nav-box {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    border-bottom: 1px #ddd solid;
  }
  .text {
    margin-top: 46px;
    padding: 10px;
    height: 30px;
    text-align: center;
    font-size: 15px;
    color: #8f8f99;
    line-height: 30px;
  }
  .like-box {
    margin-top: 46px;
  }
  .movie-top {
    // background: #ffff;
    padding: 10px;
    border-bottom: 1px #ddd solid;
    .movie-top-left {
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
}
</style>