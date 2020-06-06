export const routes = [{
    path: '/main',
    name: 'Main',
    component: r => require(['../views/Main.vue'], r),
    //二级路由
    children: [{
        path: '/home/:phone',
        name: 'Home',
        component: r => require(['../views/Home.vue'], r),
      },
      {
        path: 'list',
        name: 'List',
        component: r => require(['../views/List.vue'], r),
      },
      {
        path: 'search',
        name: 'Search',
        component: r => require(['../views/Search.vue'], r),
      }, {
        path: 'my',
        name: 'My',
        component: r => require(['../views/My.vue'], r),
      }
    ]
  },
 
  {
    path:'/like',
    name:'Like',
    component: r => require(['../views/Like.vue'], r)
  },
 
  {
    path: '/detail/:id',
    name: 'Detail',
    component: r => require(['../views/Detail.vue'], r),
  },
  {
    path: '/reviews/:id',
    name: 'Reviews',
    component: r => require(['../views/Reviews.vue'], r)
  },
  {
    path: '/listmovie/:name',
    name: 'ListMovie',
    component: r => require(['../views/ListMovie.vue'], r)
  },
  {
    path: '*',
    redirect: {
      name: 'Home'
    }
  }
]
