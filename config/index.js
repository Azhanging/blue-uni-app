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
    home: "/pages/home/index",       //首页地址
    webview: "/pages/webview/index",
    reLogin: "/pages/re-login/index",
    //底部地址信息，暂时用于relogin的时候的回跳处理
    tabBarPath: []
  },

  //页面相关
  pages: {
    //设置最后的路由黑名单配置
    lastPathBlackList: [/*{
      //校验分享路径 Regexp 或者 String
      path: /regexp/ || 'string',
      //转换的 String || Function
      sharePath: ''
    }*/]
  },

  //登录相关
  login: {
    request: {
      url: '/mock/login.json',
      method: 'post',
      //登录获取的状态
      params() {
        return {};
      },
    },
    hooks: {
      got(data) {
        return data;
      },
      //登陆成功
      success() {
      },
      //清空登录状态
      clear() {
      }
    },
    //登录状态
    storage: {
      [tokenName]: "token"
    }
  },

  //用户信息
  userInfo: {
    request: {
      url: `/update-info`,
      params(res) {
        return res;
      }
    },
    hooks: {
      got(data) {
        return data;
      }
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
      sharePath: `` //指派的地址,可选，不填写会跳转到config.path.home String || Function
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
  },

  request: {
    options: {
      data: {},
      method: "GET",
      dataType: "json",
      responseType: "text",
      ['content-type']: 'application/x-www-form-urlencoded',
      isShowLoading: true,
      tips: {}
    },
    tips: {
      loading: '数据加载中',
      fail: '连接错误',
      timeout: `请求超时`
    },
    //拦截器(针对项目的拦截器自定义)
    interceptor: {
      request: null,
      response: null
    }
  }
};

export default config;
