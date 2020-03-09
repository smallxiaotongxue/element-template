<template>
  <el-container class='Home'>
    <el-header class="home-header">
      <Header></Header>
    </el-header>

    <el-container class='css-content'>
      <el-aside width="220px">
        <left-menu></left-menu>
      </el-aside>

      <el-main class='home-main'>
        <router-view class='main-content'></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>
<script>
  import Header from '../components/header'
  import LeftMenu from '../components/menu'

  export default {
    name: 'home',
    data () {
      return {
        isCollapse: false,
        menuTab: [],
        name: name,
        activeTab: '/'
      }
    },
    computed: {},
    methods: {},
    components: {
      Header,
      LeftMenu
    },
    watch: {},
    mounted () {
    }
  }
</script>
<style lang='scss' scoped>
  .Home {

    .home-header {

    }

    .css-content {
      position: relative;
      height: calc(100vh - 60px);
    }

    .el-main.home-main {
      color: #323232;
      padding: 10px;

      .main-content {
        box-sizing: border-box;
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.96);
      }

      .copyright {
        text-align: center;
        color: #666;
        font-size: 14px;
        line-height: 50px;
      }
    }
  }
</style>
