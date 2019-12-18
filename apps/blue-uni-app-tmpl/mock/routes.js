const routes = [{
  //默认登录接口
  url: `/mock/login`,
  method: 'post',
  response() {
    return {
      code: 200,
      data: {
        token: 'token_value'
      },
      errcode: 50001
    };
  }
}, {
  //获取手动号注册用户
  url: `/mock/setUserInfo`,
  method: 'post',
  response() {
    return {
      code: 200,
      data: {
        username: 'blue',
        mobile: '',
        token: 'token_value'
      },
      errcode: 40001
    };
  }
}, {
  //通过手动输入手机注册用户
  url: `/mock/bindPhone`,
  method: 'post',
  response() {
    return {
      code: 200,
      data: {
        username: 'blue',
        mobile: '',
        token: 'token_value'
      }
    };
  }
}, {
  url: `/mock/getUserInfo`,
  method: 'get',
  response() {
    return {
      code: 200,
      data: null /*{
        username: 'blue',
        mobile: '',
        token: 'token_value'
      }*/,
      errcode: 40001
    };
  }
}];

module.exports = routes;
