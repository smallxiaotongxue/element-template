import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store/index'

Vue.use(Router);

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components';


/**
 * constantRoutes 基础页面不需要鉴权，所有角色都可以访问
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    name: 'home',
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
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "login" */ '@/views/error-page/404'),
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/index'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
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

router.beforeEach((to, from, next) => {
  // document.title = to.meta.title; // 自动化修改页面标签的 title
  // to.query['backUrl'] = from.fullPath;

  if (sessionStorage.getItem('TOKEN')) {
    next();
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
