const routes = [{
  url: `/mock/data`,
  method: 'get',
  response() {
    return {
      code: 200,
      data: {}
    };
  }
}, {
  url: `/mock/data1`,
  method: 'get',
  response() {
    return {
      code: 200,
      data: {
        data: 1
      }
    };
  }
}];

module.exports = routes;
