<template>
  <div  class='header'>

    <div class="__title">
      标题内容
    </div>

    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>

    <ul class="info">
      <li>
        <i class='el-icon-user'></i><span class="ml10">{{username}}，欢迎您</span>
      </li>
      <li @click='loginOut'>退出</li>
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {
      username: '',
      data: [],
      headerMenu: [
        {
          path: '/',
          name: '首页'
        },
      ]
    };
  },
  methods: {

    loginOut () {
      sessionStorage.setItem('isLogin', 'false');
      this.$router.push('/login');
    }
  },
  components: {},
  mounted () {

  }
};
</script>
<style lang='scss' scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .__title {
    min-width: 300px;
    padding: 0 10px;
  }

  .el-menu-demo {
    display: inline-block;
  }

  .info{
    display: inline-block;
    right: 20px;
    font-size: 16px;
    color: #666;
    .ml10{
      margin-left: 10px;
    }
    li{
      float: left;
      cursor: pointer;
      padding: 0 20px;
    }
    li:hover{
      color: #303133;
    }
    li:last-child{
      padding-right: 0;
    }
  }
}
</style>
