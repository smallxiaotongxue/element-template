<comment># 组件注释</comment>

<template>
    <div :class="{'has-logo': showLogo}">
      <logo v-if="showLogo" :collapse="isCollapse"></logo>
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path"></sidebar-item>
        </el-menu>
      </el-scrollbar>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Logo from './Logo';
  import SidebarItem from './SidebarItem';
  import variables from '@/assets/css/sass-scoped/variable.scss';

  export default {
    name: 'index',
    data () {
      return {}
    },
    props: {},
    components: {
      SidebarItem,
      Logo
    },
    computed: {
      ...mapGetters([
        'permission_routes',
        'sidebar'
      ]),
      activeMenu () {
        const route = this.$route;
        const { meta, path } = route;

        if (meta.activeMenu) {
          return meta.activeMenu;
        }

        return path;
      },
      showLogo () {
        return this.$store.state.settings.sidebarLogo;
      },
      variables () {
        return variables;
      },
      isCollapse () {
        return !this.sidebar.opened;
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

<style lang="scss" scoped>
</style>
