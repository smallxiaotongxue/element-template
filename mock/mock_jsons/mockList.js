export const permissionList = [
  {
    name: '首页',
    path: '/home',
    icon: 'el-icon-platform-eleme',
    id: 10000,
    type: 'page',
    children: []
  },
  {
    name: '组件',
    path: '/components',
    icon: 'el-icon-star-on',
    id: 10001,
    type: 'group',
    children: [
      {
        name: '组件一',
        path: '/components/page1',
        icon: 'el-icon-star-on',
        id: 100011,
        type: 'page',
        children: []
      },
      {
        name: '组件二',
        path: '/components/page2',
        icon: 'el-icon-star-on',
        id: 100012,
        type: 'page',
        children: []
      },
    ]
  },
]
