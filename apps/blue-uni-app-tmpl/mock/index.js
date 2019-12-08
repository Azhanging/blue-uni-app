const BlueMpMockInterceptor = require('blue-mp-mock-interceptor');
const routes = require('./routes');

//实例化拦截器
const blueMpMockInterceptor = new BlueMpMockInterceptor({
  routes
});

//考虑到env的处理，这里面都使用CommonJS规范，request封装也是通过CommonJS定义
module.exports = blueMpMockInterceptor;
