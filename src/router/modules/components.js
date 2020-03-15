export default [
  {
    path: '/components',
    name: 'ComponentDemo',
    meta: {
      title: '组件',
      icon: 'component'
    },
    component: () => import(/* webpackChunkName: "components" */ '../../views/components/index')
  }
]
