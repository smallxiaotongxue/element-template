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
      debugger;
      let tagList = sessionStorage.getItem('tag-list');
      let userInfo = sessionStorage.getItem('userInfo');
      let TOKEN = sessionStorage.getItem('TOKEN');
      let userMenu = sessionStorage.getItem('userMenu');
      if (tagList) {
        this.$store.commit('tagsView/SET_VISITED_VIEW', JSON.parse(tagList));
      }
      if (userInfo) {
        this.$store.commit('user/SET_USERINFO', JSON.parse(userInfo));
      }
      if (TOKEN) {
        this.$store.commit('user/SET_TOKEN', TOKEN);
      }
      // if (userMenu) {
      //   this.$store.commit('user/SET_MENU', JSON.parse(userMenu));
      // }
    }
  }
}
</script>
