import { login, logout } from '../../api/user'
import { resetRouter } from '../../router'

const state = {
  token: '',
  userInfo: {},
  permission_route: [], // 用户当前菜单路由
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
  SET_PERMISSION_MENU: (state, menu) => {
    state.permission_route = menu;

    if (menu && menu.length > 0) {
      sessionStorage.setItem('permission_route', JSON.stringify(menu))
    } else {
      sessionStorage.removeItem('permission_route');
    }
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
        commit('SET_PERMISSION_MENU', data.permission_route);

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
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', {});
        commit('SET_PERMISSION_MENU', []);

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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
