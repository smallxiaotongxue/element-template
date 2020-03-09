<template>
  <el-menu
    :default-active="$route.path"
    router
  >
    <el-menu-item index="/components">
      <i class="el-icon-menu"></i>
      <span slot="title">组件</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'left-menu'
  }
</script>

<style scoped>

</style>
