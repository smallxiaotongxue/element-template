<comment># 组件注释</comment>

<template>
  <div class="navbar">
    <div class="hamburger-container" style="padding: 0 15px;" @click="toggleSideBar">
      <i class="hamburger el-icon-s-fold" :class="{'is-active': sidebar.opened}"></i>
    </div>

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <template v-if="device!=='mobile'">

        <error-log class="errLog-container right-menu-item hover-effect"/>

        <div class="right-menu-item hover-effect" @click="screen">
          <i class="el-icon-full-screen"></i>
        </div>

        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect"/>
        </el-tooltip>

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="require('@/assets/logo.png')" class="user-avatar" alt=""/>
          <i class="el-icon-caret-bottom"></i>
        </div>

        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from './inner/Breadcrumb'
  import ErrorLog from './inner/ErrorLog'
  import SizeSelect from './inner/SizeSelect'

  export default {
    name: 'Navbar',
    data () {
      return {
        fullscreen: false,
      }
    },
    props: {},
    components: {
      Breadcrumb,
      ErrorLog,
      SizeSelect,
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'device'
      ])
    },
    watch: {},
    created () {
    },
    mounted () {
    },
    destroyed () {
    },
    methods: {
      toggleSideBar () {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout () {
        await this.$store.dispatch('user/logout').then((res) => {
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }).catch(() => {
          // TODO delete
          this.$store.commit('user/SET_TOKEN', '');
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        });
      },
      screen () {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen()
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen()
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen()
          }
        }
        this.fullscreen = !this.fullscreen;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .hamburger {
    display: inline-block;
    font-size: 20px;

    &.is-active {
      transform: rotate(180deg);
    }
  }

  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);

    .hamburger-container {
      line-height: 50px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
