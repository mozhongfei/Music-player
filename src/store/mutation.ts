import { ADD_COUNT, ADD_TO_SONG } from "./mutation-types"

const mutations = {
  //不适合做复杂操作(适合做跟踪数据),异步操作或者复杂操作放到actions
  [ADD_COUNT](state: { SLIDE_SINGLE_SONG: any }, payload: any) {
    state.SLIDE_SINGLE_SONG = payload
  },
  setIsLogin(state: { user: { isLogin: any } }, payload: any) {
    state.user.isLogin = payload
  },
}


export default mutations
