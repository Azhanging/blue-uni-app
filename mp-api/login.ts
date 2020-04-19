import config from '@config';
import utils from 'blue-utils';
import store from '@store';
import {apiLogin} from '$api';
import {setUserInfo} from '$mp-api/user-info';
import {getCurrentPath, setLastPath} from "$mp-api/page";
import {showLoading, hideLoading} from '$mp-api/loading';
import {redirectRegister} from '$mp-api/register';
import {showModal} from '$mp-api/modal';

//扩展到Vue中
export function loginInVue(Vue: any): void {
	Vue.prototype.$login = login;
	Vue.prototype.$loggedIn = loggedIn;
}

//check session
function checkSession(): Promise<any> {
	return new Promise(((resolve, reject) => {
		uni.checkSession({
			success() {
				resolve();
			},
			fail() {
				reject();
			}
		});
	}));
}

//检查是否登录了,检查login的配置中在storage中是否存在
export function checkLocalLogin(): boolean {
	const keys: string[] = Object.keys(config.login.storage);
	let len = 0;
	utils.each(config.login.storage, (key: string, _key: string) => {
		if (uni.getStorageSync(_key)) ++len;
	});
	return keys.length === len;
}

//小程序登录
function mpLogin(): Promise<any> {
	return new Promise((resolve, reject) => {
		uni.login({
			//微信的授权timeout
			timeout: 5000,
			//打开就授权支付宝主动授权
			// @ts-ignore
			scopes: `auth_user`,
			success(res) {
				resolve(res);
			},
			fail(err) {
				console.log(`登录失败fail:`, err);
				reject(err);
			}
		});
	});
}

//wx login
export function login(): Promise<any> {
	return new Promise((resolve, reject) => {
		showLoading({
			title: '登陆中'
		});
		//检查本地的登录状态，只在微信小程序中检查
		if (checkLocalLogin()) {
			hideLoading();
			//检查session
			checkSession().then(() => {
				//检查正常不进行业务处理
				resolve();
			}).catch(() => {
				//清空登录的状态
				clearLoginStatus();
				//重新登录
				login().then((res: any) => {
					resolve(res);
				});
			});
		} else {
			//微信登录
			mpLogin().then((res: any) => {
				hideLoading();
				//login success
				if (!/ok/g.test(res.errMsg)) {
					//登录失败，提醒重新登录
					return showLoginModal({
						resolve,
						reject
					});
				}
				//发送login code
				sendLoginCode({
					data: utils.hook(null, config.login.request.data, [res]) || {}
				}).then(() => {
					// 设置登录状态
					resolve();
				}).catch((err: any) => {
					console.log(`登录失败:`, err);
					//登录失败，提醒重新登录
					showLoginModal({
						resolve,
						reject
					});
				});
			}).catch((err: any) => {
				console.log(`登录失败:`, err);
				hideLoading();
				//登录失败，提醒重新登录
				showLoginModal({
					resolve,
					reject
				});
			});
		}
	});
}

//检查登录状态
export function loggedIn(): Promise<any> {
	return new Promise((resolve, reject) => {
		if (store.state.isLogin) {
			resolve();
		} else {
			reject();
		}
	});
}

//发送logon code,获取openid
function sendLoginCode(opts: {
	data: any;
}): Promise<any> {
	return apiLogin(opts).then((res: any) => {
		const {data} = res;
		if (res.errcode === 50001) {
			//新用户，前往注册
			redirectRegister({
				path: getCurrentPath()
			});
		} else {
			//新用户，设置用户信息值
			//设置信息到storage中
			setLoginStorage(data);
			//设置用户信息
			setUserInfo(data);
			//调用成功后的钩子
			utils.hook(null, config.login.hooks.success, [data]);
		}
		return res;
	});
}

//设置指定的登录态到
export function setLoginStorage(data: any): void {
	const gotData: any = utils.hook(null, config.login.hooks.got, [data]);
	utils.each(config.login.storage, (key: string, _key: string) => {
		if (key in gotData) {
			uni.setStorageSync(_key, gotData[key]);
		}
	});
}

//clear login session in storage
export function clearLoginStatus(): void {
	//清空所有的存储
	utils.each(config.login.storage, (key: string, _key: string) => {
		uni.removeStorageSync(_key);
	});
	//调用登录后的钩子
	utils.hook(null, config.login.hooks.clear);
	//重新设置登录状态
	store.commit('SET_IS_LOGIN', false);
}

//提醒重新重新登录
function showLoginModal(opts: {
	resolve: Function,
	reject: Function
}): void {
	const {resolve, reject} = opts;
	showModal({
		content: '登录失败',
		showCancel: true,
		confirmText: '重新登录'
	}).then((res: any) => {
		if (res.confirm === true) {
			login().then((res) => {
				resolve(res);
			});
		} else if (res.cancel === true) {
			//清空请求的队列
			reject();
		}
	});
}

//是否为重登页面
export let isReLoginPage = false;

//设置是否重登的状态
export function setIsReLoginPage(status: boolean): void {
	isReLoginPage = status;
}

//跳转重登页面
export function navigateToReLogin(opts: {
	path?: string;
} = {}): void {
	//避免
	if(isReLoginPage) return;
	//设置是否重登的状态
	setIsReLoginPage(true);
	//设置最后的路由地址
	setLastPath(opts.path);
	//清空登录态
	clearLoginStatus();
	//跳转绑定手机页面
	uni.navigateTo({
		url: config.path.reLogin
	});
}