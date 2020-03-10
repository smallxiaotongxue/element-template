<comment># 组件注释</comment>

<template>
    <div class="app-wrapper" :class="classObj">
      <div v-if="device === 'mobile' && sideBar.opened" class="drawer-bg" @click="handleClickOutside"></div>

      <sidebar class="sidebar-container">
        <div :class="{ hasTagsView: needTagsView }" class="main-container">
          <div :class="{'fixed-header': fixedHeader}">
            <navbar></navbar>
            <tags-view v-if="needTagsView"></tags-view>
          </div>

          <app-main></app-main>
          <right-panel v-if="showSettings">
            <settings></settings>
          </right-panel>
        </div>
      </sidebar>

    </div>
</template>

<script>
import RightPanel from './components/RightPanel';
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components';
import ResizeMixin from './mixin/ResizeHandler';
import { mapState } from 'vuex';

export default {
  name: 'index',
  data () {
    return {}
  },
  props: {},
  components: {
    RightPanel,
    AppMain,
    Navbar,
    Settings,
    Sidebar,
    TagsView,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch: {},
  created () {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
