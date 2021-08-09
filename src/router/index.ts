import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '../store'
const Home = () => import('views/home/Home.vue')
const login = () => import('views/login/login.vue')
const register = () => import('views/login/register.vue')
const phoneLogin = () => import('views/login/phoneLogin.vue')
const search = () => import('views/search/search.vue')
const searchResult = () => import('views/search/searchResult.vue')
const song = () => import('views/song/song.vue')
const newSongs = () => import('views/song/newSongs.vue')
const songList = () => import('views/song/songList.vue')
const user = () => import('views/user/user.vue')
const commentList = () => import('views/song/commentList.vue')
const listSquare = () => import('views/square/listSquare.vue')
const Ranking = () => import('views/square/Ranking.vue')
const RecommendList = () => import('views/square/childComps/RecommendList.vue')
const boutique = () => import('views/square/childComps/boutique.vue')
const choiceness = () => import('views/square/childComps/choiceness.vue')
const choose = () => import('views/song/childComps/choose.vue')
const DailySong = () => import('views/song/DailySong.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/search',
    name: 'search',
    component: search,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/phone',
    name: 'phone',
    component: phoneLogin,
  },
  {
    path: '/searchResult/:search',
    name: 'searchResult',
    component: searchResult,
  },
  {
    path: '/song',
    name: 'song',
    component: song,
  },
  {
    path: '/user',
    name: 'user',
    component: user,
  },
  {
    path: '/songList',
    name: 'songList',
    component: songList,
  },
  {
    path: '/commentList',
    name: 'commentList',
    component: commentList,
  },
  {
    path: '/listSquare',
    component: listSquare,
    children:[
      {
        path: '',
        redirect: 'RecommendList'
      },
      {
        path: 'RecommendList',
        component: RecommendList
      },
      {
        path: 'boutique',
        component: boutique
      },
      {
        path: 'choiceness',
        component: choiceness
      }
    ]
  },
  {
    path: '/newSongs',
    component: newSongs,
    children:[
      {
        path: '',
        redirect: 'choose'
      },
      {
        path: 'choose',
        component: choose
      }
    ]
  },
  {
    path: '/DailySong',
    name: 'DailySong',
    component: DailySong,
  },
  {
    path: '/Ranking',
    name: 'Ranking',
    component: Ranking,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next)=>{ 
//   if (to.meta.isAuth && store.state.user.isLogin === false) {
//     Notify('您还没有登录,请先登录')
//     return next('/login')
//   }else {
//     next()
//   }

// })

export default router
