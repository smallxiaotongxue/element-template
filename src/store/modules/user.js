import { login, getUserInfo, logout } from '../../api/user'
import { resetRouter } from '../../router'

const state = {
  token: '',
  userInfo: {},
}

const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
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
        debugger;

        const { data } = response
        commit('SET_TOKEN', data.token);
        commit('SET_USERINFO', data.userInfo);

        resolve(data);
      }).catch(error => {
        debugger;

        reject(error)
      })
    })
  },
  getInfo ({ commit, state }, payload) {
    return getUserInfo(payload).then(res => {
      let data = res.data
      commit('SET_USERINFO', data)
    })
  },

  // user logout
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then((res) => {
        commit('SET_TOKEN', '')

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
