import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutation"
import actions from './action'
import getters from './getter'

Vue.use(Vuex)

const state = {
  SLIDE_SINGLE_SONG: {},
  user: {
    isLogin: window.localStorage.getItem('token') ? true : false
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
