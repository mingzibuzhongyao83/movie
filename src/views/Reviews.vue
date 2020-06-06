<template>
  <div class="reviews">
    <!-- 导航栏 -->
    <div class="nav-box">
      <van-nav-bar title="影评" left-arrow @click-left="go" />
    </div>

    <!-- 影评 -->
    <div class="reviews-box">
      <!-- :finished="finished" v-model="loading" @load="loadData" -->
      <van-list finished-text="已经到底了...." :finished="finished" v-model="loading" @load="loadData">
        <div class="review" v-for="(item,index) in ReviewsData" :key="index">
          <div class="review-info">
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
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Reviews",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState("reviewsModule", [
      "allReviewsData",
      "ReviewsData",
      "finished",
      "count",
      "start"
    ])
  },
  created() {
      
    //清空数据
    this.$store.commit("reviewsModule/emptyData");

    let id = this.$route.params.id;
    
    this.getAllReviewsData(id);
  },
  methods: {
    //获取全部评论
    getAllReviewsData(id) {
      this.axios({
        method: "GET",
        url: "/test",
        params: {
          type:'/subject/' + id + '/reviews?',
          apikey: this.apikey,
          start: 0,
          count: 100
        }
      })
        .then(result => {
          
          this.$store.commit("reviewsModule/changeData", {
            key: "allReviewsData",
            value: result.data.reviews
          });
        })
        .catch(err => {
          
        });
    },

    //加载评论
    loadData() {
      setTimeout(() => {
        
        this.loading = false;
        
        if (this.ReviewsData.length >= this.allReviewsData.length) {
          //没有数据加载
          this.$store.commit("reviewsModule/changeData", {
            key: "finished",
            value: true
          });

          return;
        }
        
        this.$store.commit("reviewsModule/loadreviewstData");
          
      }, 5000);
      
    },
    //返回上一级
    go() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.reviews {
  .nav-box {
    position: fixed;
    top: 0;
    width: 100%;
  }
  .reviews-box {
    margin-top: 46px;
    padding: 10px;
    background-color: #ddd;
  }
  .review {
    // background-color: #224452;
    // height: 30px;

    font-size: 15px;
    border-radius: 10px;
  }
  .review-info-box {
    padding: 0 8px;
  }
  .review-info {
    // margin-top: 10px;
    background-color: #f6f7fb;
    border-radius: 5px;
    padding: 5px;
  }
  .review {
    padding: 10px 8px 10px;
    color: #444;
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
    color: #444;
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
    color: #444;
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
      // -webkit-line-clamp: 4;
      line-height: 20px;
      font-size: 13px;
    }
  }
}
</style>