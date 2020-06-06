import Vue from 'vue'
import Vuex from 'vuex'

//导入
import {
  homeModule
} from './Home/store'


import {
  detailModule
} from './Detail/store'

import {
  reviewsModule
} from './Reviews/store'

import {
  listModule
} from './List/store'

import {
  listmovieModule
} from './ListMovie/store'

import {
  searchModule
} from './Search/store'

import {
  likeModule
} from './Like/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //菜单页面是否已经加载过
    menuIsloaded: false,

    //榜单是否加载过
    listloaded: false,

    //榜单内容
    listMovieloaded:false,

    //用户信息
    userInfo: {
      phone: '',
      password: ''
    },

    id:'',

    //记录是否登录
    // isLogin: false
  },

  mutations: {
    changeData(state, data) {
      state[data.key] = data.value;
    }
  },

  modules: {
    homeModule,
    detailModule,
    reviewsModule,
    listModule,
    listmovieModule,
    searchModule,
    likeModule
  }

})
