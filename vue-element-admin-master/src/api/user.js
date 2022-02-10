import request from '@/utils/request'
// 登录
// /admin/acl/index/login
export function login(data) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}
// 获取用户信息
// /admin/acl/index/info
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}
// 退出登录
// /admin/acl/index/logout
export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}
