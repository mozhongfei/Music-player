import {request} from "./request";
// 获取音乐url
const token = window.localStorage.getItem('token');
export function getSong(id) {
  return request({
    url: '/song/url?id='+id,
  })
}

// 获取歌曲详情
export function getSongDetail(ids) {
  return request({
    url: '/song/detail?ids='+ids,
  })
}
// 获取歌单内容列表
export function getPlaylist(listId) {
  return request({
    url: '/playlist/detail?id='+listId + '&cookie=' + token,
  })
}
// 查看音乐是否可用
export function checkPlay(checkId) {
  return request({
    url: '/check/music?id='+checkId,
    // method: 'post',
  })
}

// 查看歌曲详情动态
export function dynamic(id) {
  return request({
    url: '/playlist/detail/dynamic?id='+id,
    // method: 'post',
  })
}

// 通过id 获取歌词
export function getLyric(id){
  return request({
      url:'/lyric?id='+id,
      method:"get",
  })
}

export class SongDetail {
  constructor(itemInfo) {
    this.dt = itemInfo.dt
    this.al = itemInfo.al
    this.ar = itemInfo.ar
    this.id = itemInfo.id
    this.songName = itemInfo.name
    // this.url = ''
  }
} 