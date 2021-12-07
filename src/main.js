// ie polyfill
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import Antd from 'ant-design-vue'

Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
