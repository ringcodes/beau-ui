import { request } from '@/utils/request'

export function getTopicListType (parameter) {
  return request({
    url: '/topic/list/' + parameter,
    method: 'get'
  })
}

export function getTopicList (parameter) {
  return request({
    url: '/topic/list',
    method: 'get',
    params: parameter
  })
}

export function saveTopic (parameter) {
  return request({
    url: '/topic/save',
    method: 'post',
    params: parameter
  })
}

export function delTopic (id) {
  return request({
    url: '/topic/del/' + id,
    method: 'post'
  })
}

export function getArticleList (parameter) {
  return request({
    url: '/article/list',
    method: 'get',
    params: parameter
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
    method: 'post'
  })
}

export function getArticle (parameter) {
  return request({
    url: '/article/' + parameter,
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
export function saveTag (parameter) {
  return request({
    url: '/tag/save',
    method: 'post',
    params: parameter
  })
}
export function delTag (id) {
  return request({
    url: '/tag/del/' + id,
    method: 'post'
  })
}
export function acount () {
  return request({
    url: '/statis/acount'
  })
}
export function chartData () {
  return request({
    url: '/statis/chartData'
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
    method: 'post'
  })
}
export function listSliderPosition() {
  return request({
    url: '/slider/listPosition',
    method: 'get'
  })
}
