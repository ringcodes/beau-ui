import { request } from '@/utils/request'

export function getUserList (parameter) {
  return request({
    url: '/user/page',
    method: 'post',
    data: parameter
  })
}

export function listConfig (parameter) {
  return request({
    url: '/config/list',
    method: 'get',
    data: parameter
  })
}

export function saveConfig (parameter) {
  return request({
    url: '/config/save',
    method: 'post',
    data: parameter
  })
}
export function delConfig (id) {
  return request({
    url: '/config/del/' + id,
    method: 'post'
  })
}
export function getConfigType (type) {
  return request({
    url: '/config/getByBiz/' + type,
    method: 'get'
  })
}
export function getById (id) {
  return request({
    url: '/config/get/' + id,
    method: 'post'
  })
}
export function getId () {
  return request({
    url: '/config/getId',
    method: 'get'
  })
}
