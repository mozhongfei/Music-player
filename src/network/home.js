import {request} from "./request";
// 首页数据
export function getHome() {
  return request({
    url: '/homepage/block/page',
    // withCredentials: false,
  })
}
// 圆形图标
export function getHomeBall() {
  return request({
    url: '/homepage/dragon/ball'
  })
}
// 轮播图
export function getHomeBanner( type=1) {
  return request({
    url: '/banner?type='+type
  })
}
// 默认搜索
export function getNarBar() {
  return request({
    url: '/search/default',
    // withCredentials: false,
  })
}