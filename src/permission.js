import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  console.log("aaaaaa")
  store.dispatch('GenerateRoutes', {  })
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
