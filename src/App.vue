<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  created () {
    window.addEventListener('beforeunload', this.setSessionParams);
    this.initSession();
  },
  methods: {
    setSessionParams () {
      sessionStorage.setItem('tag-list', JSON.stringify(this.$store.state.tagsView.visitedViews));
    },
    initSession () {
      let tagList = sessionStorage.getItem('tag-list');
      let userInfo = sessionStorage.getItem('userInfo');
      let TOKEN = sessionStorage.getItem('TOKEN');
      let permission_route = sessionStorage.getItem('permission_route');
      if (tagList) {
        this.$store.commit('tagsView/SET_VISITED_VIEW', JSON.parse(tagList));
      }
      if (userInfo) {
        this.$store.commit('user/SET_USERINFO', JSON.parse(userInfo));
      }
      if (TOKEN) {
        this.$store.commit('user/SET_TOKEN', TOKEN);
      }
      if (permission_route) {
        this.$store.commit('user/SET_PERMISSION_MENU', JSON.parse(permission_route));
      }
    }
  }
}
</script>
