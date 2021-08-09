import {
    request
} from "./request";
// 登录
export function login(data) {
    return request({
        url: '/login/cellphone',
        method: 'post',
        data
    })
}

// 退出登录
export function logout() {
    return request({
        url: '/logout',
    })
}

// 检查手机是否注册
export function checkPhone(phone) {
    return request({
        url: '/cellphone/existence/check?phone=' + phone,
    })
}

//  发送验证码
export function sent(phone) {
    return request({
        url: '/captcha/sent?phone=' + phone,
    })
}
// 验证验证码
export function captcha(data) {
    return request({
        url: '/captcha/verify',
        method: 'post',
        data
    })
}
// 注册
export function Register(data) {
    return request({
        url: '/register/cellphone',
        method: 'post',
        data
    })
}

// 刷新登录状态
export function refresh() {
    return request({
        url: '/login/refresh',
    })
}