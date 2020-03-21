import Vue from 'vue'
import Router from 'vue-router'
import defaultSettings from '@/settings'
import store from '../store/index'

Vue.use(Router);

// fixed bug
const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

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
        meta: { title: '首页', affix: true },
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },

      /** when your routing map is too long, you can split it into small modules **/
      ...componentsRouter,
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "home" */ '../views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
  },
  {
    path: '/404',
    meta: { title: '404' },
    component: () => import(/* webpackChunkName: "login" */ '@/views/error-page/404'),
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404'
  }
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

const whiteList = ['/login', '/toLogin']; // no redirect whitelist

function hasPermissionFunction (route, permissionList) {
  if (route.meta) {
    return permissionList.includes(route.path);
  } else {
    return true
  }
}

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title || ''} - ${defaultSettings.title}`; // 自动化修改页面标签的 title
  // to.query['backUrl'] = from.fullPath;

  let token = sessionStorage.getItem('TOKEN');
  if (token) {
    // 确定用户当前访问路径是否有权限
    if (store.state.user.permissionRoutes.length <= 0) {
      await store.dispatch('user/getUserMenu');
    }
    const hasPermission = hasPermissionFunction(to, store.state.user.permissionRoutes);
    if (hasPermission) {
      if (to.path === "/login") {
        next({ path: '/' }); // if is logged in, redirect to the home page
      } else {
        next();
      }
    } else {
      next(`/404`);
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
