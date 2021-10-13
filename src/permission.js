import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
const loginRoutePath = '/user/login'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (to.path === loginRoutePath) {
    next()
  } else if(store.getters.token){
    next();
  } else{
    store.dispatch('GetInfo', {}).then(() => {
      store.dispatch('GenerateRoutes', {})
      next();
    }).catch(
      ()=> next({ path: loginRoutePath, query: { redirect: to.fullPath } })
    )
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
