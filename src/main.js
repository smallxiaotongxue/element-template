import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './components/global-components/index' // 注册公共全局组件 放入该文件下
import VueParticles from 'vue-particles';

import './assets/css/common.scss';
import api from './api/index';

Vue.use(VueParticles);
Vue.config.productionTip = false;
Vue.prototype.$API_URL = process.env.VUE_APP_API_URL; // 当前接口 配置 url
Vue.prototype.$api = api; // 全局api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
