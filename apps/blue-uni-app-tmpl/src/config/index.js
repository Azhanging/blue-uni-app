//工具类
import utils from 'blue-utils';
//公共的config
import publicConfig from '$config';

import path from './path';

import * as common from '$assets/js/common';

//项目config
const config = utils.extend(publicConfig, {
	app: {
		name: "blue-wx-program-tmpl",               //小程序名
		id: "wx27b9d7d5baaa8687",                 //appid
		secret: "081e624777af5d4d75099afc15ab4743",             //小程序secret
		login_form: 1          //来源
	},

	//域名url相关
	url: {
		base: `https://wxapp2.youzhanjia.com/api`,
		static: ``
	},

	//路径相关
	path,

	//登陆相关
	login: {
		//登录获取的状态
		params(res) {
			return {
				wxAppId: config.app.id,
				wxAppCode: res.code,
				ticket: common.getTicket()
			};
		},
		hooks: {
			got(data) {
				return data.info;
			}
		}
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
