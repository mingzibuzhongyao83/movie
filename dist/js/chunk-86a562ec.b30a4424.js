(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-86a562ec"],{"0795":function(t,s,i){},5342:function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"listmovie"},[i("div",{staticClass:"nav-box"},[i("van-nav-bar",{attrs:{title:"榜单","left-arrow":""},on:{"click-left":t.go}}),i("div",{staticClass:"logo-box clearfix"},[t._m(0),i("div",{staticClass:"title fl"},["new_movies"==t.listName?i("div",{staticClass:"logo-title"},[t._v("新片电影榜")]):t._e(),"weekly"==t.listName?i("div",{staticClass:"logo-title"},[t._v("一周电影榜")]):t._e(),"us_box"==t.listName?i("div",{staticClass:"logo-title"},[t._v("欧美票房榜")]):t._e(),"top250"==t.listName?i("div",{staticClass:"logo-title"},[t._v("历史电影top100")]):t._e(),i("div",{staticClass:"num"},[i("span",[t._v(t._s(t.sum)+"个内容")])])])])],1),i("div",{staticClass:"list-box"},[i("div",{staticClass:"top"}),i("div",{staticClass:"bottom"},[i("van-list",{attrs:{"finished-text":"已经到底了....",finished:t.finished},on:{load:t.loadData},model:{value:t.loading,callback:function(s){t.loading=s},expression:"loading"}},t._l(t.listmovieData,(function(s,a){return i("div",{key:a,staticClass:"movie-box"},[i("div",{staticClass:"movie-top"},[i("div",{staticClass:"movie-top-left clearfix"},[i("div",{staticClass:"movie-img fl"},[i("div",{staticClass:"movie-pic",on:{click:function(i){return t.goDetail(s.id)}}},[i("img",{staticClass:"auto-img movie-pic-img",attrs:{src:s.images.small,alt:""}})]),i("div",{staticClass:"biao"},[i("div",{staticClass:"big"},[t._v(t._s(a+1))]),i("div",{staticClass:"small"})])]),i("div",{staticClass:"movie-info fl"},[i("div",{staticClass:"movie-name"},[i("span",[t._v(t._s(s.title))])]),i("div",{staticClass:"tag-avatar clearfix"},[i("div",[i("span",[t._v(t._s(s.pubdates+" "))])]),i("div",t._l(s.genres,(function(s,a){return i("span",{key:a},[t._v(t._s(s+" "))])})),0),i("div",[i("span",[t._v("导演：")]),t._l(s.directors,(function(s,a){return i("span",{key:a},[t._v(t._s(s.name+" "))])}))],2),i("div",[i("span",[t._v("演员：")]),t._l(s.casts,(function(s,a){return i("span",{key:a},[t._v(t._s(s.name+" "))])}))],2)]),i("div",{staticClass:"clearfix"},[i("div",{staticClass:"look fl"},[i("span",[t._v(t._s((s.collect_count/1e4).toFixed(2))+"万人看过")])])])])])])])})),0)],1)])])},e=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"logo fl"},[a("img",{staticClass:"auto-img",attrs:{src:i("58fc"),alt:""}})])}],l=i("2f62"),o={name:"ListMovie",data(){return{listName:"",loading:!1}},created(){let t=this.$route.params.name;this.listName=t,this.$store.commit("listmovieModule/emptyData"),this.getMovieData(this.listName)},computed:{...Object(l["b"])("listmovieModule",["movieData","sum","listmovieData","finished","count","start"])},methods:{getMovieData(t){this.$toast.loading({forbidClick:!0,duration:0,message:"加载中..."});let s={apikey:this.apikey,type:"/"+t+"?"};"top250"==t&&(s.start=0,s.count=50),this.axios({method:"GET",url:"/test",params:s}).then(s=>{let i=[];if("new_movies"==t||"top250"==t)i=s.data.subjects;else if("weekly"==t||"us_box"==t){i=s.data.subjects;let t=[];i.forEach(s=>{t.push(s.subject)}),i=t}this.$store.commit("listmovieModule/changeData",{key:"movieData",value:i}),this.$store.commit("listmovieModule/changeData",{key:"sum",value:i.length}),this.movieData!=[]&&this.$toast.clear()}).catch(t=>{this.$toast.clear()})},go(){this.$router.go(-1)},loadData(){setTimeout(()=>{this.loading=!1,this.listmovieData.length>=this.movieData.length?this.$store.commit("listmovieModule/changeData",{key:"finished",value:!0}):this.$store.commit("listmovieModule/loadreviewstData")},5e3)},goDetail(t){this.$router.push({name:"Detail",params:{id:t}})}}},c=o,n=(i("f0fa"),i("2877")),v=Object(n["a"])(c,a,e,!1,null,"1fc2c996",null);s["default"]=v.exports},"58fc":function(t,s,i){t.exports=i.p+"img/list.439a54ba.jpg"},f0fa:function(t,s,i){"use strict";var a=i("0795"),e=i.n(a);e.a}}]);
//# sourceMappingURL=chunk-86a562ec.b30a4424.js.map