import { TBlackListOpts } from '$assets/js/black-list';

//配置
interface TConfigParam<T> {
	[key: string]: T;
}

type TConfigParamString = TConfigParam<string>;

interface TConfigPages extends TConfigParam<any> {
	lastPathBlackList: TBlackListOpts[];
}

interface TConfigShare extends TConfigParam<any> {
	params?: any;
	blackList: TBlackListOpts[];
}

export interface TConfig extends TConfigParam<any> {
	app: TConfigParam<any>;
	url: TConfigParamString;
	path: TConfigParamString;
	tabBarPath: string[];
	pages: TConfigPages;
	login: {
		request: TConfigParam<any>;
		hooks: TConfigParam<Function>;
		storage: TConfigParam<any>;
	};
	userInfo: {
		request: TConfigParam<any>;
		hooks: TConfigParam<Function>;
	};
	share: TConfigShare;
	location: TConfigParamString;
	upload: TConfigParamString;
	css: TConfigParamString;
	request: {
		options: TConfigParam<any>;
	};
}

//global config
const config: TConfig = {

	//配置相关
	app: {
		name: "",               //小程序名
		id: ""                 //appid
	},

	url: {
		base: "",                       //域名地址
		static: "",                     //静态资源地址
	},

	//路径相关
	path: {
		home: "/pages/home/index",       //首页地址
		webview: "/pages/webview/index",
		reLogin: "/pages/re-login/index"
	},

	//底部地址信息，暂时用于relogin的时候的回跳处理
	tabBarPath: [],

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
			data () {
				return {};
			},
		},
		hooks: {
			got ( data: any ) {
				return data;
			},
			//登陆成功
			success () {
			},
			//清空登录状态
			clear () {
			}
		},
		//登录状态
		storage: {
			[`token`]: "token"
		}
	},

	//用户信息
	userInfo: {
		request: {
			url: `/update-info`,
			params ( res: any ) {
				return res;
			}
		},
		hooks: {
			got ( data: any ) {
				return data;
			}
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
			//是否显示
			showLoading: true,
			showToast: false,
			checkPageID: true,
			tips: {
				loading: '数据加载中',
				fail: '连接错误',
				timeout: `请求超时`
			}
		}
	}
};

export default config;
