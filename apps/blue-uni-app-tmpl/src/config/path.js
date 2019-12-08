const env = process.env.PROJECT_ENV;
//环境地址
const path = (() => {
  switch (env) {
    case 'base':
      //beta环境path
      return {};
    case 'prod':
      //生产环境path
      return {
        base: `https://wxapp2.youzhanjia.com`,
        phone: `https://portal.kindpetro.com.cn`,
        file: `https://wxapp2.youzhanjia.com`,
        img: `http://images.youzhanjia.com`,
        pay: `http://wxapp2.youzhanjia.com/cashier-api`,
        static: ``,
        home: `/pages/index/main`
      };
    default:
	    //测试环境path
	    return {
		    base: `https://wxapp2.youzhanjia.com/api`,
		    phone: `https://portal.kindpetro.com.cn`,
		    file: `https://wxapp2.youzhanjia.com`,
		    img: `http://images.youzhanjia.com`,
		    pay: `http://wxapp2.youzhanjia.com/cashier-api`,
		    static: ``,
		    home: `/pages/index/main`
	    };
  }
})();

export default path;
