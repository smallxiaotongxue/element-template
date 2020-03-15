<comment># 组件注释</comment>

<template>
    <div class="app-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key" class="page-container"></router-view>
          </keep-alive>
        </transition>
    </div>
</template>

<script>
  export default {
    name: 'AppMain',
    data () {
      return {}
    },
    props: {},
    components: {},
    computed: {
      cachedViews () {
        return this.$store.state.tagsView.cachedViews
      },
      key () {
        return this.$route.path
      }
    },
    watch: {},
    created () {
    },
    mounted () {
    },
    destroyed () {
    },
    methods: {},
  }
</script>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>

<style lang="scss" scoped>
  .app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;

    .page-container {
      padding: 15px;
    }
  }

  .fixed-header+.app-main {
    padding-top: 50px;
  }

  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
      min-height: calc(100vh - 85px);
    }

    .fixed-header+.app-main {
      padding-top: 84px;
    }
  }
</style>
