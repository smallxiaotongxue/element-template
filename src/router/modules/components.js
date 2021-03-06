export default [
  {
    path: '/components',
    name: 'Components',
    meta: { title: '组件综合', },
    redirect: '/components/page1',
    component: () => import(/* webpackChunkName: "components" */ '../../views/components/index'),
    children: [
      {
        path: '/components/page1',
        name: 'ComponentsPage1',
        meta: { title: '组件一页面', },
        component: () => import(/* webpackChunkName: "components" */ '../../views/components/page1')
      },
      {
        path: '/components/page2',
        name: 'ComponentsPage2',
        meta: { title: '组件二页面', },
        component: () => import(/* webpackChunkName: "components" */ '../../views/components/page2')
      },
      {
        path: '/components/page3',
        name: 'ComponentsPage3',
        meta: { title: '组件三页面', },
        component: () => import(/* webpackChunkName: "components" */ '../../views/components/page3')
      },
      {
        path: '/components/page4',
        name: 'ComponentsPage4',
        meta: { title: '组件4页面', },
        component: () => import(/* webpackChunkName: "components" */ '../../views/components/page4')
      },
    ]
  }
]
