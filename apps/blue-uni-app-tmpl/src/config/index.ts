//工具类
import utils from 'blue-utils';
//公共的config
import publicConfig, { TConfig } from '$config';
import path from './path';

const programConfig = {
	app: {
		name: "blue-wx-program-tmpl",               //小程序名
		appid: "wx17318d9ecf514495"                 //appid
	},

	//域名url相关
	url: {
		base: ``,
		static: ``
	},

	//路径相关
	path,

	pages: {
		//设置最后的路由黑名单配置
		lastPathBlackList: [{
			path: /register|bind-phone/
		}]
	},

	//登录相关
	login: {
		request: {
			url () {
				return `/mock/login`;
			},
			//登录获取的状态
			params ( res: any ): any {
				return {
					appid: programConfig.app.appid,
					code: res.code
				};
			},
		},
		hooks: {
			got ( data: any ) {
				return data;
			}
		}
	},

	userInfo: {
		request: {
			url: `/mock/getUserInfo`
		}
	},

	css: {
		//基色
		baseColor: "#0f8cca"
	},

	//分享相关
	share: {
		blackList: [{
			path: /register|bind-phone/
		}]
	}
};

//项目config
const config: TConfig = utils.extend(publicConfig, programConfig);

export default config;
