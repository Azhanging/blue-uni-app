const routes = [{
  url: `/mock/login`,
  method: 'post',
  response() {
    return {
      code: 200,
      data: {
        token: '123456'
      }
    };
  }
}, {
  url: `/mock/getUserInfo`,
  method: 'get',
  response() {
    return {
      code: 200,
      data: {}
    };
  }
}];

module.exports = routes;
