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
const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: { title: 'Home', icon: 'dashboard', affix: true },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  ...componentsRouter,

  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

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
  // 自动化修改页面标签的 title
  // document.title = to.meta.title;
  to.query['backUrl'] = from.fullPath;

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
