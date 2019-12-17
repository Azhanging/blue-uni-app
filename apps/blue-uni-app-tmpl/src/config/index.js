//工具类
import utils from 'blue-utils';
//公共的config
import publicConfig from '$config';
import path from './path';

//项目config
const config = utils.extend(publicConfig, {
  app: {
    name: "blue-wx-program-tmpl",               //小程序名
    id: "wx27b9d7d5baaa8687",                 //appid
    login_form: 1          //来源
  },

  //域名url相关
  url: {
    base: ``,
    static: ``
  },

  //路径相关
  path,

  //登陆相关
  login: {
    url: `/mock/login`,
    //登录获取的状态
    params(res) {
      return {
        appid: config.app.id,
        code: res.code
      };
    },
    hooks: {
      got(data) {
        return data;
      }
    }
  },

  userInfo: {
    url: `/mock/getUserInfo`
  },

  css: {
    //基色
    baseColor: "#0f8cca"
  },

  //分享相关
  share: {
    blackList: [{
      path: /pages\/register\/main/
    }]
  }
});

export default config;
