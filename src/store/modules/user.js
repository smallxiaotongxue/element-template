import { login, getUserInfo, loginOut } from '@/api/user'
import router, { resetRouter } from '@/router'

const state = {
  token: '',
  userInfo: {},
  roles: []
}

const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_TOKEN (state, payload) {
    state.token = payload.token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)

        resolve()
      }).catch(error => {
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

  // user loginOut
  loginOut ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      loginOut(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])

        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('SET_TOKEN', token)
      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
