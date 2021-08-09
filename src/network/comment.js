import {
  request
} from "./request";
const token = window.localStorage.getItem('token');
// 评论数据
export function comment(params) {
  return request({
    url: '/comment/new?cookie=' + token,
    // method:"post",
    params
  })
}

// 评论楼层数据
export function commentFloor(params) {
  return request({
    url: '/comment/floor?cookie=' + token,
    // method:"post",
    params
  })
}
//   parentCommentId: 楼层评论 id
//   id : 资源 id
//   type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
//   0: 歌曲
//   1: mv
//   2: 歌单
//   3: 专辑
//   4: 电台
//   5: 视频
//   可选参数 : limit: 取出评论数量 , 默认为 20
//   time: 分页参数,取上一页最后一项的 time 获取下一页数据

// 评论点赞
export function commentLike(data) {
  return request({
    url: '/comment/like?cookie=' + token,
    method: "post",
    data
  })
}
