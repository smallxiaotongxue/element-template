<template>
  <div class="login-page">
    <div class="login-wrap animated fadeIn">
      <h3>系统名称</h3>
      <p>副标题名称</p>
      <el-form ref="form" :model="form" :rules="rules" label-width="0px">
        <el-form-item prop="username">
          <el-input ref="username" placehoulder="请输入账号名称" v-model="form.username" clearable></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input ref="password" placehoulder="请输入密码" v-model="form.password" type="password" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-row type="flex" justify="space-between">
            <el-checkbox v-model="isMemery" style="color:#eee">记住密码</el-checkbox>
            <a href @click.prevent="openMsg" style="color:#eee">忘记密码</a>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button :loading="loading" type="primary" @click="login('form')">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 粒子漂浮物 -->
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="30"
      shapeType="star"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push">
    </vue-particles>
  </div>
</template>

<script>

  export default {
    name: 'login',
    data () {
      return {
        form: {
          username: sessionStorage.userInfo || 'admin',
          password: sessionStorage.passwordInfo || '654321'
        },
        isMemery: false,
        rules: {
          username: [{ required: true, message: '请输入', trigger: 'blur' }],
          password: [{ required: true, message: '请输入', trigger: 'blur' }]
        },
        loading: false
      }
    },
    props: {},
    components: {},
    computed: {},
    watch: {},
    created () {
    },
    mounted () {
      if (this.form.username === '') {
        this.$refs['username'].focus();
      } else if (this.form.password === '') {
        this.$refs['password'].focus();
      }
    },
    destroyed () {
    },
    methods: {
      login (formName) {
        this.loading = true;
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$api.common.login(this.form).then((res) => {
                sessionStorage.setItem('TOKEN', res.data.token || '123456');
                this.$router.push({ path: this.$route.query.redirect || '/' })
                this.loading = false
            })
            .catch(() => {
              // TODO delete
              sessionStorage.setItem('TOKEN', '123456');
              this.$router.push({ path: this.$route.query.redirect || '/' })
              this.loading = false
            });
          } else {
            return false
          }
        })
      },
      openMsg () {
        this.$message.warning('忘记密码')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .login-page {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/images/login-bg.jpg");
    background-position: center;
    background-size: cover;

    #particles-js {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  .login-wrap {
    width: 310px;
    padding: 30px;
    z-index: 3;
    margin-right: -40%;
    position: relative;
    background: rgba(50, 50, 50, 0.5);

    .el-form-item {
      margin-bottom: 25px !important;
    }

    h3 {
      text-align: center;
      color: #ebedef;
      margin-top: 0px;
      margin-bottom: 5px;
      font-size: 22px;

      span {
        color: #20a0ff;
      }
    }

    p {
      text-align: center;
      color: #fff;
      margin: 0;
    }

    form {
      margin-top: 25px;

      .el-form-item {
        margin-bottom: 15px;
      }

    }

    a {
      text-decoration: none;
      color: #1f2d3d;
    }

    button {
      width: 100%;
      font-weight: 600;
    }
  }

</style>
