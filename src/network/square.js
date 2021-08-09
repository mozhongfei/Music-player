import {
    request
} from "./request";
 const token = window.localStorage.getItem('token');
// 获取推荐歌单
export function personalized(num = 30) {
    return request({
        url: '/personalized?limit=' + num + '&cookie=' + token,
        method: 'post',
    })
}
// 获取精品歌单
export function highQuality(params) {
    return request({
        url: '/top/playlist/highquality',
        params
    })
}
// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
// limit: 取出歌单数量 , 默认为 20
// before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据

// 获取相关推荐歌单
export function related(id) {
    return request({
        url: '/related/playlist?cookie='+ token + '&id=' + id,
        method: 'post',
    })
}

// 获取歌单
export function playlist(data) {
    return request({
        url: '/top/playlist',
        // method: 'post',
        params: {
            cookie: token,
            ...data
        }
    })
}
// order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
// limit: 取出歌单数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值

// 获取每日推荐歌单  登录后
export function recommend() {
    return request({
        url: '/recommend/resource?cookie='+ token + '&id=' + id,
        method: 'post',
    })
}