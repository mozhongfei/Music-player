import axios from 'axios'

import router from '../router'


export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://r3inbowari.top:3000',
    timeout: 10000,
    // withCredentials: true,
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {

    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data ? res.data : res;
  }, err => {
    return err.response.data
    // if (err.response.status == '401') {
    //   Toast.fail('请先登录')
    //   router.push('/login')
    // }

    // if (err.response.status == '422') {
    //   Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0])
    // }
  })

  // 3.发送真正的网络请求
  return instance(config)
}
