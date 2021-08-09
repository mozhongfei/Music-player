import {
    request
} from "./request";
 const token = window.localStorage.getItem('token');
// 账号信息
export function account() {
    return request({
        url: '/user/account?cookie='+ token,
        method: 'post',
    })
}

// 用户详情
export function userDetail(id) {
    return request({
        url: '/user/detail?cookie='+ token + '&uid=' + id,
        method: 'post',
    })
}

// 用户信息
export function subCount() {
    return request({
        url: '/user/subcount?cookie='+ token,
        method: 'post',
    })
}

// 用户歌单
export function UserList(id) {
    return request({
        url: '/user/playlist?cookie='+ token + '&uid=' + id,
        method: 'post',
    })
}