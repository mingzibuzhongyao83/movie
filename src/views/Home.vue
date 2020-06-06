<template>
  <div class="home">
    <div class="box">
      <!-- 头部城市定位 -->
      <div class="header-box">
        <div class="header clearfix">
          <div class="search fl">
            <!-- <div class="search-life fl"> -->
            <!-- <input type="text" placeholder="请输入城市搜索正在热映电影" v-model="value" />
              <div class="search-right fr" @click="search">
                <van-icon name="search" size="23" />
            </div>-->

            <!-- </div> -->
            <van-field
              readonly
              clickable
              label="当前城市:"
              :value="city"
              placeholder="选择城市"
              @click="comingsoon"
            />
            <van-popup v-model="showPicker" round position="bottom">
              <van-picker
                show-toolbar
                :columns="list"
                @cancel="showPicker = false"
                @confirm="onConfirm"
              />
            </van-popup>
          </div>
        </div>

        <div class="type">
          <van-tabs
            v-model="activeName"
            line-width="56"
            title-active-color="#1a1a1a"
            @click="toggleMovie"
          >
            <van-tab
              :title="item.title"
              v-for="(item,index) in tabdata"
              :key="index"
              :name="item.type"
            ></van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="movie">
        <!-- 电影 -->
        <div class="movie-box" v-for="(item,index) in movieData" :key="index">
          <div class="banner clearfix">
            <div class="banner-box" :style="'width:' + item.picNum * 130 + 'px' ">
              <van-image
                v-for="(i,s) in item.photos"
                :key="s"
                class="fl banner-img"
                width="120"
                height="100"
                :src="i.cover"
              />
            </div>
          </div>
          <div class="movie-top">
            <div class="movie-top-left clearfix">
              <div class="movie-img fl">
                <div class="movie-pic" @click="movieDetail(item.id)">
                  <img class="auto-img movie-pic-img" :src="item.images.small" alt />
                </div>
              </div>

              <div class="movie-info fl">
                <div class="movie-name">
                  <span>{{item.title}}</span>
                </div>
                <div class="tag-avatar clearfix">
                  <div>
                    <span>{{item.year + ' / '}}</span>
                    <span>{{item.countries + ' / '}}</span>
                    <span v-for="(a,b) in item.genres" :key="b">{{a + ' '}}</span>
                  </div>

                  <div>
                    <span v-for="(c,o) in item.directors" :key="o">{{c.name + ' '}}</span>
                  </div>
                  <!--  -->
                  <div>
                    <span v-for="(i,s) in item.casts" :key="s">{{i.name + ' '}}</span>
                  </div>
                </div>
                <div class="look">
                  <span>{{item.wish_count}}人想看</span>
                </div>
              </div>
              <div class="movie-top-right"></div>
            </div>
          </div>

          <div class="movie-bottom">
            <span class="movie-bottom-txt">{{item.summary}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utils } from "../utils/utils";

//导入辅助函数
import { mapState } from "vuex";

import addressList from "../data/addressList";

export default {
  name: "Home",
  data() {
    return {
      activeName: "isHit",
      value: "",
      isSearch: true,
      adressvalue: "",
      showPicker: false,
      list: addressList
    };
  },

  created() {
    
    if (this.isactive == "isComing") {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
    let phone = this.$route.params;
    
    localStorage.setItem("id", JSON.stringify(phone));

    this.$store.commit("changeData", { key: "id", value: phone });

    
    if (this.menuIsloaded) {
      this.activeName = this.isactive;
      return;
    }

    let data = {
      key: "HDIBZ-WPK6P-6E4DC-LBR2F-MVADH-3LF6W" //这个key就是你申请的密钥
    };
    let url = "https://apis.map.qq.com/ws/location/v1/ip"; //这个就是地理位置信息的接口
    data.output = "jsonp";
    this.$jsonp(url, data)
      .then(res => {
        // 
        if (res.status == 0) {
          let city = res.result.ad_info.city.substr(
            0,
            res.result.ad_info.city.length - 1
          );
          this.$store.commit("homeModule/changeData", {
            key: "city",
            value: city
          });
        }
        //关闭加载提示
        // this.$toast.clear();

        let params = {
          type: "/in_theaters?",
          apikey: this.apikey,
          city: this.city
        };

        this.go(params);
      })
      .catch(error => {
        
        //关闭加载提示
        // this.$toast.clear();
      });

    this.$store.commit("changeData", { key: "menuIsloaded", value: true });
  },
  computed: {
    ...mapState("homeModule", ["tabdata", "city", "movieData", "isactive"]),
    menuIsloaded() {
      return this.$store.state.menuIsloaded;
    },
    id() {
      return this.$store.state.id;
    }
  },

  methods: {
    comingsoon() {
      

      if (!this.isSearch) {
        this.$toast({
          forbidClick: true,
          duration: 2000,
          message: "暂不支持"
        });

        return;
      }

      this.showPicker = true;
    },

    onConfirm(value) {
      if (!this.isSearch) {
        return;
      }
      let cityValue = value.substr(0, value.length - 1);
      
      this.$store.commit("homeModule/changeData", {
        key: "city",
        value: cityValue
      });

      this.go({ type: "/in_theaters?", city: this.city, apikey: this.apikey });

      this.showPicker = false;
    },
    go(params) {
      this.$store.commit("homeModule/changeData", {
        key: "movieData",
        value: []
      });
      // this.movieData = ;
      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "数据加载中..."
      });
      this.axios({
        method: "GET",
        url: "/test",
        // params
        params
      })
        .then(res => {
          

          // return;
          let data = res.data.subjects;

          // 

          let arr = [];

          data.forEach((v, i) => {
            let o = {};
            this.axios({
              method: "GET",
              url: "/test",
              params: {
                type: "/subject/" + v.id + "?",

                apikey: this.apikey
              }
            })
              .then(res => {
                (v.countries = res.data.countries),
                  (v.wish_count = res.data.wish_count),
                  (v.summary = res.data.summary),
                  (v.photos = res.data.photos),
                  (v.images = res.data.images),
                  (v.title = res.data.title),
                  (v.year = res.data.year),
                  (v.directors = res.data.directors),
                  (v.genres = res.data.genres),
                  (v.casts = res.data.casts),
                  (v.id = res.data.id),
                  (v.picNum = res.data.photos.length);
              })
              .catch(err => {
                
              });
          });
          arr = arr.concat(data);
          this.$store.commit("homeModule/changeData", {
            key: "movieData",
            value: arr
          });
          // this.movieData = arr;
          
          //关闭加载提示
          this.$toast.clear();
        })
        .catch(err => {
          
          //关闭加载提示
          this.$toast.clear();
        });
    },

    //搜索城市
    search() {
      if (this.value == "") {
        //加载提示
        this.$toast({
          forbidClick: true,
          duration: 3,
          message: "请输入内容"
        });
        return;
      }
      let city = this.value;
      if (this.isSearch) {
        this.go({
          type: "/in_theaters?",
          apikey: this.apikey,
          city: this.city
        });
        this.value = "";
      }
    },

    //切换电影数据
    toggleMovie(name) {
      
      this.$store.commit("homeModule/changeData", {
        key: "isactive",
        value: name
      });
      
      let params = {
        apikey: this.apikey
      };
      if (name == "isComing") {
        this.isSearch = false;
        (params.type = "/coming_soon?"), (params.count = 50);
        this.go(params);
      } else {
        this.isSearch = true;
        params.type = "/in_theaters?";
        params.city = this.city;
        this.go(params);
      }
    },

    //查看电影详情
    movieDetail(id) {
      this.$router.push({ name: "Detail", params: { id } });
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  /deep/.van-field__label {
    font-weight: 600;
  }
  /deep/.van-image__img {
    border-radius: 5px;
  }
  /deep/.van-image {
    padding-right: 10px;
  }
  /deep/.van-image:last-child {
    padding-right: 0;
  }
  /deep/.van-tab {
    font-weight: 600;
  }
  /deep/.van-tabs__line {
    background-color: #1a1a1a;
  }
  /deep/.van-tab--active {
    color: #1a1a1a;
  }
  /deep/.van-swipe__track {
    height: 200px;
  }
  .header {
    height: 41px;
    padding: 5px;
    border-bottom: 1px #eeeeee solid;
    background-color: #fff;
  }
  .type {
    border-bottom: 1px #eeeeee solid;
  }
  .header-box {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
  }

  .search {
    width: 100%;
  }

  .movie {
    margin-top: 100px;
    margin-bottom: 70px;
  }
  .movie-box {
    // height: 200px;
    // background: #ddd;

    padding: 10px;
    border-bottom: 1px solid #e0e0e0;

    .banner {
      height: 100px;
      overflow: hidden;
      overflow-x: scroll;
      padding-bottom: 10px;
    }

    .banner-box {
      white-space: nowrap;
      overflow-y: auto;
    }
    .movie-top {
      height: 120px;
      // background: #ffff;
      .movie-top-left {
        width: 270px;
        padding: 10px 0;
        border-right: 1px dashed #f9f9f9;
        .movie-img {
          width: 70px;

          padding-right: 10px;
          .movie-pic {
            width: 70px;

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
          }
        }
      }
      .movie-top-right {
        width: calc(100% - 271px);
      }
    }
    .movie-bottom {
      height: 50px;

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
</style>
