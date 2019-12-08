//session_key key name
const tokenName = `token`;

//global config
const config = {

  //配置相关
  app: {
    name: "",               //小程序名
    id: "",                 //appid
    secret: "",             //小程序secret
    login_form: 0          //来源
  },

  url: {
    base: "",                       //域名地址
    static: "",                     //静态资源地址
  },

  //路径相关
  path: {
    home: "/pages/index/main",       //首页地址
    register: `/pages/register/main`                    //注册页面
  },

  //登录相关
  login: {
    url: '/user/login.json',
    //登录获取的状态
    params() {
      return {};
    },
    hooks: {
      got(data) {
        return data;
      }
    },
    //登录状态
    storage: {
      /*openid: "openid",
      unionid: "unionid",*/
      [tokenName]: "token"
    }
  },

  //用户信息
  userInfo: {
    url: ``,
    hooks: {
      got(data) {
        return data;
      }
    },
    params(res) {
      return res;
    }
  },

  //绑定相关
  bind: {
    //关系绑定
    relation: {
      url: 'share_bind'
    },

    //手机相关
    phone: {
      //get phone 中 参数tokenName的key
      [tokenName]: tokenName
    },
  },

  //钩子相关，执行当前项目相关的钩子任务
  hooks: {
    show() {

    }
  },

  //分享相关的
  share: {
    title: "blue-wx-mini-program",
    deps: "blue-wx-mini-program is vue public template",
    imgUrl: "",
    params: {
      phone: 'n'
    },

    //分享黑名单,限于公共分享触发，page定义的分享走默认的规则
    blackList: [/*{
      path: '', //分享的黑名单地址 String || RegExp
      sharePath: `` //指派的地址,可选，不填写会跳转到config.path.home
    }*/]
  },

  //定位相关
  location: {
    //存储的key
    storageKey: `location`
  },

  //上传成功
  upload: {
    //上传地址
    url: `https://portal.kindpetro.com.cn/base/saveMoneySapp/specialCar/uploadPicture`
  },

  //获取手机相关
  phone: {
    url: ``
  },

  //支付相关
  pay: {
    url: ``
  },

  //css相关
  css: {
    baseColor: ""       //基色
  }

};

export default config;
