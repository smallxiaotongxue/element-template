<comment># 组件注释</comment>

<template>
    <div class="navbar">
      <div style="padding: 0 15px;" @click="toggleSideBar">
        <i class="el-icon-s-fold"></i>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data () {
      return {}
    },
    props: {},
    components: {},
    computed: {},
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
    },
  }
</script>

<style lang="scss" scoped>
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;

    &.is-active {
      transform: rotate(180deg);
    }
  }
</style>
