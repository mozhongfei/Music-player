import {
    request
} from "./request";
//  const token = window.localStorage.getItem('token');
// 获取榜单
export function topList() {
    return request({
        url: '/toplist' ,
    })
}

// 获取榜单内容摘要
export function detail() {
    return request({
        url: '/toplist/detail' ,
    })
}

// 获取排行榜中的歌手榜
export function artist(type) {
    return request({
        url: '/toplist/artist?type=' + type ,
    })
}

// type : 地区
// 1: 华语
// 2: 欧美
// 3: 韩国
// 4: 日本