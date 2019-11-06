// 引入filemanager-webpack-plugin插件
const FileManagerPlugin = require('filemanager-webpack-plugin');
const ENV = process.env.NODE_ENV === 'production' ? 'production' : process.env.NODE_ENV === 'testing' ? 'testing' : 'dev';

module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * publicPath: process.env.NODE_ENV==='production'?" ":'/',
   */
  publicPath: ENV === 'production' ? '/dist' : ENV === 'testing' ? '/dist' : '/', // 构建好的文件输出到哪里
  outputDir: 'dist',
  // where to put static assets (js/css/img/font/...)
  assetsDir: '',
  // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
  lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
  transpileDependencies: [
    /* string or regex */
    // 'vuetify'
  ],

  filenameHashing: true,

  // 是否为生产环境构建生成sourceMap?
  productionSourceMap: false,
  // // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // chainWebpack: () => {},

  // webpack的相关配置在这里
  configureWebpack: config => {
    if (ENV === 'testing' || ENV === 'production') {
      const plugins = [];

      plugins.push(
        new FileManagerPlugin({ // 初始化 filemanager-webpack-plugin 插件实例
          onEnd: {
            delete: [ // 首先需要删除项目根目录下的dist.zip
              './dist.zip',
            ],
            archive: [ // 然后我们选择dist文件夹将之打包成dist.zip并放在根目录
              {
                source: './dist',
                destination: './dist.zip'
              },
            ]
          }
        })
      );
      config.plugins = [
        ...config.plugins,
        ...plugins
      ]
    }
  },
  // // CSS 相关选项
  // css: {
  //   // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
  //   // 也可以是传递给 extract-text-webpack-plugin 的选项对象
  //   extract: true, // 允许生成 CSS source maps?
  //   sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
  //   loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
  //   modules: false
  // }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores
  // parallel: require('os').cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {}, // configure webpack-dev-server behavior
  // devServer: {
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
