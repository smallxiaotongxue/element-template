import user from '@/api/user'


const state = {
  userInfo: {},
}

const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
}

const actions = {
  // get user info
  getInfo ({ commit, state }, payload) {
    return user.getInfo(payload).then(res => {
      let data = res.data;

      commit('SET_USERINFO', data);
    })
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
