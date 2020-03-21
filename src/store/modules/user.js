import { login, logout, getUserMenu } from '../../api/user'
import { resetRouter } from '../../router'

const state = {
  token: '',
  userInfo: {},
  userMenu: [],
  permissionRoutes: [], // 用户当前授权路由
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param child
 * @param res
 */
export function filterAsyncRoutes(routes, child = 'children', res = []) {

  routes.forEach(route => {
    const item = { ...route };
    res.push(item.path);
    if (item[child]) {
      filterAsyncRoutes(item[child], child = 'children', res);
    }
  });

  return res;
}

function generateRoutes(menu) {
  let defaultRoutes = [
    '/login',
    '/404',
  ];
  let accessedRoutes = filterAsyncRoutes(menu);
  return [...defaultRoutes, ...accessedRoutes];
}

const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
    if (Object.keys(userInfo).length > 0) {
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    } else {
      sessionStorage.removeItem('userInfo')
    }
  },
  SET_MENU: (state, menu) => {
    state.userMenu = menu;
    state.permissionRoutes = generateRoutes(menu);
  },
  SET_TOKEN (state, token) {
    state.token = token
    if (token) {
      sessionStorage.setItem('TOKEN', token)
    } else {
      sessionStorage.removeItem('TOKEN')
    }
  },
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {

        const { data } = response
        commit('SET_TOKEN', data.token);
        commit('SET_USERINFO', data.userInfo);
        commit('SET_MENU', data.userMenu);

        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },

  // getUserMenu
  getUserMenu ({ commit }, params) {
    return new Promise((resolve, reject) => {
      getUserMenu(params).then(response => {
        const { data } = response
        commit('SET_MENU', data.userMenu);

        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then((res) => {
        dispatch('clearUserMessage');

        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  clearUserMessage ({ commit, state }) {
    commit('SET_TOKEN', '')
    commit('SET_USERINFO', {});
    commit('SET_MENU', []);
    sessionStorage.removeItem('tag-list');
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
