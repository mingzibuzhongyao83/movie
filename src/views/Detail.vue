<template>
  <div class="detail">
    <!-- 导航栏 -->
    <div class="nav-box">
      <van-nav-bar :title="detailData.title" left-arrow @click-left="go" />
    </div>

    <!-- 电影内容 -->
    <div class="movie-box">
      <div class="movie-title"></div>
      <!-- 头部 -->
      <div class="movie-header clearfix">
        <!-- 图片 -->
        <div class="movie-img fl">
          <div class="movie-pic">
            <img
              v-if="detailData.images"
              class="auto-img movie-pic-img"
              :src="detailData.images.small"
              alt
            />
          </div>
        </div>
        <!-- 信息 -->
        <div class="movie-info fl clearfix">
          <div class="movie-name">
            <span>{{detailData.title}}</span>
          </div>
          <div class="tag-avatar clearfix">
            <div>
              <span v-for="(item,index) in detailData.genres" :key="index">{{item + ' '}}</span>
            </div>

            <div>
              <span v-for="(item,index) in detailData.casts" :key="index">{{item.name + ' '}}</span>
            </div>
            <!--  -->
            <div>
              <span>{{detailData.mainland_pubdate}} 大陆上映</span>
            </div>
          </div>
          <div class="was-look is-look">
            <div class="clearfix">
              <div class="like-box fl" :class="{active:islike}" @click="like(detailData.id)"></div>
              <div class="fl" :style="'padding-left:5px'">
                <span>想看</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 多少人想看 -->
      <div class="movie-people clearfix">
        <span class="fl" :style="'padding-right:70px'">实时口碑</span>
        <span class="fl">{{(detailData.wish_count/10000).toFixed(2)}}万人想看</span>
      </div>
      <!-- 简介 -->
      <div class="movie-summary">
        <div class="summary-top clearfix">
          <span class="fl">简介</span>
          <span class="fr" @click="Open">
            展开
            <van-icon class="down" name="arrow-down" size="14" />
          </span>
        </div>

        <div class="summary-txt">
          <span
            class="summary-txt-content"
            :style="isOpen ? '-webkit-line-clamp:'+ '' +' ' : '-webkit-line-clamp: 3'"
          >{{detailData.summary}}</span>
        </div>
      </div>

      <!-- 导演演员 -->
      <div class="director-cast">
        <div class="director-cast-title">
          <span>演职人员</span>
        </div>
        <div class="allInfo-box">
          <div
            class="info-box clearfix"
            :style="'width:' + (( detailData.directorNum + detailData.castsNum  ) * 93.04 - 13) + 'px'"
          >
            <!-- 导演 -->
            <div class="director-box clearfix fl">
              <div
                class="director-info fl"
                v-for="(item,index) in detailData.directors"
                :key="index"
              >
                <div class="director-image">
                  <img class="auto-img director-img" :src="item.avatars.small" alt />
                </div>
                <div class="director-name">{{item.name}}</div>
                <div class="director-name">导演</div>
              </div>
            </div>
            <!-- 演员 -->
            <div class="director-box clearfix fl">
              <div class="casts-info fl" v-for="(item,index) in detailData.casts" :key="index">
                <div class="director-image">
                  <img
                    v-if="item.avatars"
                    class="auto-img director-img"
                    :src="item.avatars.small"
                    alt
                  />
                  <img v-else class="auto-img director-img" src="../assets/images/null-pic.jpg" alt />
                </div>
                <div class="director-name">{{item.name}}</div>
                <div class="director-name">{{item.name_en}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 剧照 -->
      <div class="stage">
        <div class="stage-name">剧照</div>
        <div class="stage-box">
          <div
            class="stage-img-box"
            :style="'width:' + ((detailData.photosNum * 130) - 10) + 'px' "
          >
            <van-image
              v-for="(item,index) in detailData.photos"
              :key="index"
              class="fl"
              width="120"
              height="100"
              :src="item.cover"
            />
          </div>
        </div>
      </div>

      <!-- 影评 -->
      <div class="review-box">
        <div class="review">
          <span>影评</span>
        </div>
        <div class="review-info-box">
          <!-- 评论信息 -->
          <div class="review-info" v-for="(item,index) in detailData.popular_reviews" :key="index">
            <div class="review-top clearfix">
              <div class="user-img fl">
                <img class="auto-img img" :src="item.author.avatar" alt />
              </div>
              <div class="user-name fl">
                <span>{{item.author.name}}</span>
              </div>
            </div>
            <div class="review-bottom">
              <div class="review-title">"{{item.title}}"</div>
              <div class="review-value">
                <span>{{item.summary}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="all-review">
          <span @click="lookReview(detailData.id)">查看全部评论</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      isOpen: false,

      //是否收藏
      islike: false,

      likeData: []
    };
  },
  computed: {
    ...mapState("detailModule", ["detailData"])
  },
  created() {
    let id = this.$route.params.id;
    
    //置空
    this.$store.commit("detailModule/emptyData");
    let likeData = JSON.parse(localStorage.getItem("likeData"));

    if (likeData != null) {
      this.likeData = likeData;
      likeData.forEach(v => {
        
        if (v.id == id) {
          
          this.islike = true;
        }
      });
    }
    
    //加载提示
    this.$toast.loading({
      forbidClick: true,
      duration: 0,
      message: "加载中..."
    });

    //获取商品详情信息
    this.axios({
      method: "GET",
      url: "/test",
      params: {
        type: "/subject/" + id + "?",

        apikey: this.apikey
      }
    })
      .then(result => {
        //关闭加载提示
        this.$toast.clear();

        //设置是否想看的条件
        result.data.isWanna = false;
        result.data.photosNum = result.data.photos.length;
        result.data.directorNum = result.data.directors.length;
        result.data.castsNum = result.data.casts.length;
        result.data.popular_reviews = result.data.popular_reviews.slice(0, 5);
       

        this.$store.commit("detailModule/changeData", {
          key: "detailData",
          value: result.data
        });

        
      })
      .catch(err => {
        //关闭加载提示
        this.$toast.clear();

        
      });
  },

  methods: {
    getData(data, id) {
      this.islike = true;
      let o = {};
      this.axios({
        method: "GET",
        url: "/test",
        params: {
          type: "/subject/" + id + "?",

          apikey: this.apikey
        }
      })
        .then(res => {
          

          o = res.data;

          data.unshift(o);
          localStorage.setItem("likeData", JSON.stringify(data));
        })
        .catch(err => {});
    },
    //点击收藏
    like(id) {
      
      let likeData = JSON.parse(localStorage.getItem("likeData"));

      

      //如果没有且为空时
      if (likeData == null || likeData.length == 0) {
        this.likeData = [];
        

        this.getData(this.likeData, id);
        return;
      }

      if (likeData.length != 0 && this.islike == true) {
        
        likeData.forEach((v, i) => {
          
          if (v.id == id) {
            
            this.islike = false;
            likeData.splice(i, 1);
            
            localStorage.setItem("likeData", JSON.stringify(likeData));
          }
        });
        return;
      }

      if (likeData.length != 0 && this.islike == false) {
        

        this.getData(likeData, id);
        return;
      }
    },
    //展开收起
    Open() {
      this.isOpen = !this.isOpen;
    },

    //查看全部影评
    lookReview(id) {
      this.$router.push({ name: "Reviews", params: { id } });
    },

    //返回上一级
    go() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  /deep/.van-image__img {
    border-radius: 5px;
  }
  /deep/.van-image {
    padding-right: 10px;
  }
  /deep/.van-image:last-child {
    padding-right: 0;
  }
  .nav-box {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 0;
    z-index: 2;
  }
  .was-look {
    width: 100%;
  }
  .like-box {
    width: 20px;
    height: 20px;
    background: url("../assets/images/like.png") no-repeat center center;
    background-size: cover;
    margin-top: 3px;
    margin-left: 25px;
    &.active {
      background-image: url("../assets/images/like-active.png");
    }
  }

  .movie-box {
    margin-top: 46px;
    height: 100%;
    background-color: #295667;
    padding: 10px 15px 20px;
    .movie-title {
      font-size: 15px;
      color: #fff;
      padding-bottom: 15px;
      font-family: "Courier New", Courier, monospace;
      span {
        overflow: hidden;

        text-overflow: ellipsis;

        display: -webkit-box;

        -webkit-box-orient: vertical;

        -webkit-line-clamp: 1;
      }
    }
    .movie-header {
      padding-bottom: 15px;
    }
    .movie-img {
      width: 70px;
      //   height: 98px;
      padding-right: 10px;
      .movie-pic {
        width: 70px;
        // height: 98px;

        .movie-pic-img {
          border-radius: 3px;
        }
      }
    }
    .movie-info {
      width: calc(100% - 80px);
      .movie-name {
        height: 20px;
        padding: 0px 0 2px;
        font-size: 15px;
        color: #fff;
        span {
          overflow: hidden;

          text-overflow: ellipsis;

          display: -webkit-box;

          -webkit-box-orient: vertical;

          -webkit-line-clamp: 1;
        }
      }
      .tag-avatar {
        height: 43px;
        font-size: 11px;
        color: #8aa1ab;
        padding-bottom: 10px;
        div {
          overflow: hidden;

          text-overflow: ellipsis;

          display: -webkit-box;

          -webkit-box-orient: vertical;

          -webkit-line-clamp: 1;
        }
      }
      .is-look {
        width: 100px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        background-color: #75919a;
        border-radius: 3px;
        color: #e3e7f1;
      }
    }
    .movie-people {
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #ebfcff;
      background-color: #224452;
      border-radius: 5px;
      padding: 0 30px;
    }
    .summary-top {
      height: 20px;
      padding: 10px 0;
      font-size: 14px;
      text-align: center;
      line-height: 20px;
    }
    .summary-txt-content {
      overflow: hidden;
      color: #8d8d8d;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      line-height: 20px;
    }
    .director-cast-title {
      padding: 10px 0;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #fff;
    }
    .director-info {
      width: 80px;
      padding-right: 13px;
    }
    .casts-info {
      width: 80px;
      padding-right: 13px;
    }
    .casts-info:last-child {
      padding-right: 0;
    }
    .director-image {
      width: 80px;
      height: 125px;
    }
    .director-img {
      border-radius: 2px;
    }
    .director-name {
      height: 20px;
      line-height: 20px;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    .allInfo-box {
      // overflow: hidden;
      overflow-x: scroll;
    }
    .info-box {
      white-space: nowrap;
      overflow-y: auto;
    }
    .stage-box {
      height: 100px;
      overflow: hidden;
      overflow-x: scroll;
      padding-bottom: 10px;
    }

    .stage {
      padding-bottom: 10px;
    }

    .stage-img-box {
      white-space: nowrap;
      overflow-y: auto;
    }

    .stage-name {
      padding: 10px 0;
      color: #fff;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
    }
  }
  .review-box {
    background-color: #224452;
    // height: 30px;

    font-size: 15px;
    border-radius: 10px;
  }
  .review-info-box {
    padding: 0 8px;
  }
  .review-info {
    margin-top: 10px;
    background-color: #78747433;
    border-radius: 5px;
    padding: 5px;
  }
  .review {
    padding: 10px 8px;
    color: #fff;
  }
  .review-top {
    height: 30px;
  }
  .user-img {
    height: 30px;
    width: 30px;
  }
  .img {
    border-radius: 50%;
  }
  .user-name {
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    color: #fff;
    font-size: 14px;
  }
  .review-title {
    font-size: 15px;
    font-weight: 600;
    font-style: italic;
    padding: 5px 0;
  }

  .show {
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 13px;
    /deep/.van-icon {
      top: 3px;
    }
  }
  .review-value {
    span {
      overflow: hidden;
      color: #8d8d8d;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      line-height: 20px;
      font-size: 13px;
    }
  }
  .all-review {
    padding: 10px 8px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
  }
}
</style>