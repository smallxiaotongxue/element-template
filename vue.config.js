const FileManagerPlugin = require('filemanager-webpack-plugin'); // 引入filemanager-webpack-plugin插件
const ENV = process.env.VUE_APP_MODE === 'production' ? 'production' : process.env.VUE_APP_MODE === 'testing' ? 'testing' : 'dev';
const outputDirName = 'output_' + ENV;

// <!--gzip 压缩-->
// const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// const path = require('path')
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * publicPath: ENV === 'production' ? '/dist' : ENV === 'testing' ? '/dist' : '/'
   */
  publicPath: ENV === 'production' ? '/dist' : ENV === 'testing' ? '/dist' : '/', // 构建好的文件输出到哪里
  outputDir: outputDirName,

  // where to put static assets (js/css/img/font/...)
  assetsDir: 'static',

  // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
  lintOnSave: ENV === 'dev',

  // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: false,

  // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
  transpileDependencies: [
    /* string or regex */
    // 'vuetify'
  ],

  filenameHashing: true,

  // 是否为生产环境构建生成sourceMap?
  productionSourceMap: false,

  // // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // chainWebpack: (config) => {
  //   config.resolve.alias.set('@', resolve('src'))
  //     .set('@assets', resolve('src/assets'))
  // },

  // webpack的相关配置在这里
  configureWebpack: config => {
    if (ENV === 'testing' || ENV === 'production') {
      const plugins = [];

      // 初始化 filemanager-webpack-plugin 插件实例
      plugins.push(
        new FileManagerPlugin({
          onEnd: {
            delete: [`./${outputDirName}.zip`], // 首先需要删除项目根目录下的dist.zip
            // copy: [
            //   { source: ``, destination: `./${outputDirName}` }
            // ],
            archive: [ // 然后我们选择dist文件夹将之打包成dist.zip并放在根目录
              { source: `./${outputDirName}`, destination: `./${outputDirName}.zip` },
            ]
          }
        })
      );

      // // Begin 生成 gzip 压缩文件
      // plugins.push(
      //   new CompressionWebpackPlugin({
      //     filename: "[path].gz[query]",
      //     algorithm: "gzip",
      //     test: productionGzipExtensions,
      //     threshold: 10240,
      //     minRatio: 0.8
      //   })
      // );
      // // End 生成 gzip 压缩文件

      config.plugins = [...config.plugins, ...plugins]
    }
  },
  // CSS 相关选项
  css: {
    // 将组件内部的css提取到一个单独的css文件（只用在生产环境）也可以是传递给 extract-text-webpack-plugin 的选项对象
    extract: true, // 允许生成 CSS source maps?
    sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
    loaderOptions: { // 组件内公共样式 Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
      sass: {
        data: `
          @import "~@/assets/css/sass-scoped/variable.scss";
          @import "~@/assets/css/sass-scoped/mixins.scss";
        `
      }
    },
},

  // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores
  // parallel: require('os').cpus().length > 1,

  // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {},

  // configure webpack-dev-server behavior
  // devServer: {
        // 接口未实现情况下，使用mock
        // before: require('./mock')
  //   open: process.platform === 'darwin',
  //   disableHostCheck: false,
  //   host: '0.0.0.0',
  //   port: 8088,
  //   https: false,
  //   hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
  //   proxy: null // string | Object
  //   // before: app => {}
  // },

  // // 第三方插件配置
  // pluginOptions: {
  //   // ...
  // }
};
