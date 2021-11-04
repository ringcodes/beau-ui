import { request } from '@/utils/request'

export function getUserList (parameter) {
  return request({
    url: '/user/page',
    method: 'post',
    data: parameter
  })
}

export function listConfigPage (parameter) {
  return request({
    url: '/config/page',
    method: 'post',
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
export function listConfigType (type,key) {
  return request({
    url: '/config/'+type+'/' + key,
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

export function listMenu(){
  return request({
    url: '/menu/list',
    method: 'get'
  })
}
export function saveMenu(param){
  return request({
    url: '/menu/save',
    method: 'post',
    data: param
  })
}
export function delMenu(param){
  return request({
    url: '/menu/del/'+param,
    method: 'delete'
  })
}