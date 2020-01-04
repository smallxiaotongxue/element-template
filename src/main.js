import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false;
Vue.prototype.$API_URL = process.env.VUE_APP_API_URL; // 当前接口 配置 url

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
