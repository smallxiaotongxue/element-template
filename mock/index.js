// 将所有的mock文件引入
require('./mock_jsons/user');

// 在这里可以做一些通用的配置
const Mock = require("mockjs");

Mock.XHR.prototype.withCredentials = true;
Mock.setup({
  timeout: '100-200' // 设置所有ajax请求的超时时间，模拟网络传输耗时
});
