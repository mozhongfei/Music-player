import {
    request
} from "./request";
 const token = window.localStorage.getItem('token');
// 获取推荐歌曲
export function newsong(num = 100) {
    return request({
        url: '/personalized/newsong?limit=' + num ,
    })
}

// 获取每日推荐歌曲  登录后
export function recommend() {
    return request({
        url: '/recommend/songs?cookie='+ token,
        method: 'post',
    })
}

// 获取新歌速递 
export function song(type) {
    return request({
        url: '/top/song?cookie='+ token + '&type=' + type,
        method: 'post',
    })
}
// 全部:0
// 华语:7
// 欧美:96
// 日本:8
// 韩国:16