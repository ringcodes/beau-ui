import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
const loginRoutePath = '/user/login'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (store.getters.addRouters.length === 0) {
    store.dispatch('GenerateRoutes', {})
  }
  if (to.path === loginRoutePath) {
    next()
  } else if (store.getters.token) {
    next()
  } else {
    store.dispatch('GetInfo', {}).then(() => {
      next()
    }).catch(
      () => next({ path: loginRoutePath, query: { redirect: to.fullPath } })
    )
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
