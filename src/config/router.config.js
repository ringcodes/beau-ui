// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
export const asyncRouterMap = [
  {
    path: '/',
    name: 'home',
    redirect: '/home'
  },
  {
    path: '/index',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    children: [
      {
        path: '/home',
        name: 'Workplace',
        component: () => import('@/views/home/Home'),
        meta: { title: '工作台', keepAlive: true, icon: 'home' }
      },
      {
        path: '/topic',
        name: 'TopicList',
        component: () => import('@/views/topic/TopicList'),
        meta: { title: '主题管理', keepAlive: true, icon: 'profile' }
      }, {
        path: '/article',
        name: 'ArticleList',
        component: () => import('@/views/article/ArticleList'),
        meta: { title: '文章管理', keepAlive: true, icon: 'read' }
      }, {
        path: '/article/edit',
        name: 'ArticleEdit',
        hidden: true,
        component: () => import('@/views/article/ArticleEdit'),
        meta: { title: '文章编辑', keepAlive: true, icon: '' }
      }, {
        path: '/article/add',
        name: 'ArticleAdd',
        hidden: true,
        component: () => import('@/views/article/ArticleAdd'),
        meta: { title: '文章编辑', keepAlive: true, icon: '' }
      }, {
        path: '/article/detail',
        name: 'ArticleDetail',
        hidden: true,
        component: () => import('@/views/article/ArticleDetail'),
        meta: { title: '文章编辑', keepAlive: true, icon: '' }
      }, {
        path: '/tag',
        name: 'TagList',
        component: () => import('@/views/tag/TagList'),
        meta: { title: '标签管理', keepAlive: true, icon: 'tag' }
      }, {
        path: '/slider',
        name: 'SliderList',
        component: () => import('@/views/slider/SliderList'),
        meta: { title: '轮播管理', keepAlive: true, icon: 'play-square' }
      }, {
        path: '/menu',
        name: 'MenuList',
        component: () => import('@/views/menu/index'),
        meta: { title: '菜单管理', keepAlive: true, icon: 'menu' }
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        hidden: true,
        meta: { title: '个人页', icon: 'user', keepAlive: true },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true }
              }
            ]
          }
        ]
      },
      {
        path: '/system/user',
        name: 'UserList',
        component: () => import('@/views/user/UserList'),
        meta: { title: '用户列表', icon: 'user', keepAlive: true }
      }, {
        path: '/webConfig',
        name: 'WebConfig',
        component: () => import('@/views/config/WebConfig'),
        meta: { title: '网站配置', keepAlive: true, icon: 'setting' }
      }
    ]
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: '/user/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
