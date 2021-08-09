import {
    request
} from "./request";
// 搜索热词
export function getSearchHot() {
    return request({
        url: '/search/hot/detail',
        // withCredentials: false,
    })
}

// 搜索建议
export function getSuggest(data) {
    return request({
        url: '/search/suggest',
        // withCredentials: false,
        params: {
            type: 'mobile',
            ...data
        }
    })
}

// 搜索单曲 
export function cloudsearch(keywords, i) {
    return request({
        url: '/cloudsearch?limit=10',
        // withCredentials: false,
        params: {
            keywords: keywords,
            offset: i * 10
        }
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