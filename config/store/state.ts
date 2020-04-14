import config from '@config';
import { checkLocalLogin } from '$mp-api/login';

interface TState {
	isLogin: boolean;
	userInfo: any;
	lastPath: string;
}

const state: TState = {

	//登录状态
	isLogin: checkLocalLogin(),

	//用户授权信息，userInfo.phone来判定是否存在手机号
	userInfo: {},

	//业务回退url，默认主页url
	lastPath: config.path.home

};

export default state;
