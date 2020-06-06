import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible';

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import VueJsonp from 'vue-jsonp'
import {
  Form,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Image as VanImage,
  Toast,
  NavBar,
  List,
  Sidebar,
  SidebarItem,
  Search,
  Popup,
  Picker
} from 'vant';

Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(Icon)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Swipe)
  .use(SwipeItem)
  .use(Grid)
  .use(GridItem)
  .use(VanImage)
  .use(Toast)
  .use(NavBar)
  .use(List)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Search)
  .use( Form)
  .use(Field)
  .use(Button)
  .use(Popup)
  .use(Picker)

Vue.use(VueCookies)

Vue.use(VueJsonp)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// //设置基础请求路径
axios.defaults.baseURL = 'http://123.56.1.51:10001'

//配置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

//为vue原型添加一个属性
Vue.prototype.apikey = '0b2bdeda43b5688921839c8ecb20399b'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
