import '@babel/polyfill'
import Vue from 'vue'

import './assets/css/index.scss';

import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios';
import api from './api/index';
import utils from './utils/index';
import './plugins/element.js'
import './components/global-components/index' // 注册公共全局组件 放入该文件下

process.env.NODE_ENV === 'development' && process.env.VUE_APP_MOCK && require('../mock') // dev环境配置 引入mock-json

import VueParticles from 'vue-particles';
// import VueBus from 'vue-bus'; // this.$bus.emit...
// import AnimateCss from 'animate.css';

Vue.use(VueParticles);
// Vue.use(AnimateCss);
// Vue.use(VueBus);

Vue.config.productionTip = false;
Vue.prototype.$API_URL = process.env.VUE_APP_API_URL; // 当前接口 配置 url
Vue.prototype.$api = api; // 全局api
Vue.prototype.$utils = utils; // 全局utils
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
