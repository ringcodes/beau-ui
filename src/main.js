// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control

import { Button, message } from 'ant-design-vue'
Vue.use(Button)

Vue.config.productionTip = false
Vue.prototype.$message = message

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
