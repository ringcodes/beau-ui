import { request } from '@/utils/request'

export function getTopicListType (parameter) {
  return request({
    url: '/topic/list/' + parameter,
    method: 'get'
  })
}

export function getTopicList (parameter) {
  return request({
    url: '/topic/page',
    method: 'post',
    data: parameter
  })
}

export function saveTopic (parameter) {
  return request({
    url: '/topic/save',
    method: 'post',
    data: parameter
  })
}

export function delTopic (id) {
  return request({
    url: '/topic/del/' + id,
    method: 'delete'
  })
}

export function listTopicPos (id) {
  return request({
    url: '/topic/listTopicPos',
    method: 'get'
  })
}
export function topicSort (param) {
  return request({
    url: '/topic/topicSort',
    method: 'post',
    data: param
  })
}
export function listTopicType () {
  return request({
    url: '/topic/listTopicType',
    method: 'get'
  })
}
export function getArticleList (parameter) {
  return request({
    url: '/article/list',
    method: 'post',
    data: parameter
  })
}
export function saveArticle (parameter) {
  return request({
    url: '/article/save',
    method: 'post',
    data: parameter
  })
}

export function delArticle (id) {
  return request({
    url: '/article/del/' + id,
    method: 'delete'
  })
}

export function getArticle (parameter) {
  return request({
    url: '/article/getById/' + parameter,
    method: 'get'
  })
}

export function getTagList (parameter) {
  return request({
    url: '/tag/list',
    method: 'get',
    params: parameter
  })
}
export function getTagPage (parameter) {
  return request({
    url: '/tag/page',
    method: 'post',
    data: parameter
  })
}
export function saveTag (parameter) {
  return request({
    url: '/tag/save',
    method: 'post',
    data: parameter
  })
}
export function delTag (id) {
  return request({
    url: '/tag/del/' + id,
    method: 'post'
  })
}
export function statisticsAcount () {
  return request({
    url: '/statistics/acount'
  })
}
export function chartData () {
  return request({
    url: '/statistics/chartData'
  })
}
//
export function getSliderList (parameter) {
  return request({
    url: '/slider/list',
    method: 'get',
    params: parameter
  })
}
export function saveSlider (parameter) {
  return request({
    url: '/slider/save',
    method: 'post',
    data: parameter
  })
}
export function delSlider (id) {
  return request({
    url: '/slider/del/' + id,
    method: 'delete'
  })
}
export function listSliderPosition () {
  return request({
    url: '/slider/listPosition',
    method: 'get'
  })
}

export function operateLogPage (param) {
  return request({
    url: '/operate-log/page',
    method: 'post',
    data: param
  })
}

export function gateChart (param) {
  return request({
    url: '/statistics/chartData',
    method: 'get',
    params: param
  })
}

export function qushiChart (param) {
  return request({
    url: '/statistics/qushi',
    method: 'get',
    params: param
  })
}
export function listLogin () {
  return request({
    url: '/auth/listLogin',
    method: 'get'
  })
}
