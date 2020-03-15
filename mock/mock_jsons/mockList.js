export const permissionList = [
  {
    name: '首页',
    path: '/',
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
        id: 100011,
        type: 'page',
        children: []
      },
    ]
  },

  {
    'path': '/permission',
    'component': {
      '_custom': {
        'type': 'component-definition',
        'display': 'Layout <span>(src/layout/index.vue)</span>',
        'tooltip': 'Component definition',
        'file': 'src/layout/index.vue'
      }
    },
    'redirect': '/permission/page',
    'alwaysShow': true,
    'name': 'Permission',
    'meta': { 'title': 'Permission', 'icon': 'lock', 'roles': ['admin', 'editor'] },
    'children': [{
      'path': 'page',
      'component': { '_custom': { 'type': 'function', 'display': '<span>ƒ</span> component()' } },
      'name': 'PagePermission',
      'meta': { 'title': 'Page Permission', 'roles': ['admin'] }
    }, {
      'path': 'directive',
      'component': { '_custom': { 'type': 'function', 'display': '<span>ƒ</span> component()' } },
      'name': 'DirectivePermission',
      'meta': { 'title': 'Directive Permission' }
    }, {
      'path': 'role',
      'component': { '_custom': { 'type': 'function', 'display': '<span>ƒ</span> component()' } },
      'name': 'RolePermission',
      'meta': { 'title': 'Role Permission', 'roles': ['admin'] }
    }]
  },
]
