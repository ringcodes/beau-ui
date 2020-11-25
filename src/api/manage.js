import { request } from '@/utils/request'

export function getUserList (parameter) {
  return request({
    url: '/user/list',
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return request({
    url: '/role/list',
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return request({
    url: '/service/list',
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return request({
    url: '/user/permission',
    method: 'get',
    params: parameter
  })
}

export function saveService (parameter) {
  return request({
    url: '/service/save',
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
export function getConfigType () {
  return request({
    url: '/config/getBiz',
    method: 'post'
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
export function listPosition () {
  return request({
    url: '/config/listPosition',
    method: 'get'
  })
}
