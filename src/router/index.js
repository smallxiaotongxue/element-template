import Vue from 'vue'
import Router from 'vue-router'
import defaultSettings from '@/settings'
// import store from '../store/index'

Vue.use(Router);

/* Layout */
import Layout from '@/views/layout'

/* Router Modules */
import componentsRouter from './modules/components';


/**
 * constantRoutes 基础路由
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: { title: '首页', icon: 'home', affix: true },
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },

      /** when your routing map is too long, you can split it into small modules **/
      ...componentsRouter,
    ]
  },

  {
    path: '/login',
    name: 'login',
    meta: { title: '登录', icon: 'home', affix: false },
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
  },
  {
    path: '/404',
    meta: { title: '404', icon: 'home', affix: false },
    component: () => import(/* webpackChunkName: "login" */ '@/views/error-page/404'),
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: (to, from, position) => {
    return position || { y: 0 };
  },
  routes: constantRoutes,
})

const router = createRouter();

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

const whiteList = ['/login', '/toLogin'] // no redirect whitelist
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || ''} - ${defaultSettings.title}`; // 自动化修改页面标签的 title
  // to.query['backUrl'] = from.fullPath;

  let token = sessionStorage.getItem('TOKEN');
  if (token) {
    if (to.path === "/login") {
      next({ path: '/' }); // if is logged in, redirect to the home page
    } else {
      // 确定用户当前访问路径是否有权限
      const hasPermission = true;
      if (hasPermission) {
        next();
      } else {
        next(`/login?redirect=${to.path}`);
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

export default router;
