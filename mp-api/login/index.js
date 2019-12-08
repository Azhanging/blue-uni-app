import config from '@config';
import utils from 'blue-utils';
import store from '@store';
import { updateUserInfo } from '../user-info';
import { apiLogin } from '$api';
import * as mp from '$mp-api/compatible';

//check local session
export function checkSession() {
	mp.hideLoading();
	wx.checkSession({
		success() {
			//更新用户信息
			updateUserInfo();
		},
		fail() {
			//清空登录状态
			clearLoginStatus();
			//重新登录
			login();
		}
	});
}

//检查是否登录了,检查login的配置中在storage中是否存在
function checkLocalLogin() {
	const keys = Object.keys(config.login.storage);
	let len = 0;
	utils.each(config.login.storage, (key, _key) => {
		if (mp.getStorageSync(_key)) ++len;
	});
	return keys.length === len;
}

//wx login
export function login() {
	//检查登录状态，只在微信小程序中检查
	if (checkLocalLogin() && (process.env.VUE_APP_PLATFORM === 'mp-weixin')) {
		checkSession();
	} else {
		//weixin login
		mp.login({
			//微信的授权timeout
			timeout: 5000,
			//打开就授权支付宝主动授权
			scopes: `auth_user`,
			success(res) {
				mp.hideLoading();
				//login success
				if (/ok/g.test(res.errMsg)) {
					//扩展登录params
					sendCode(utils.hook(null, config.login.params, [res]) || {});
				} else {
					mp.showModal({
						content: '登录失败',
						showCancel: false,
						confirmText: '重新登录',
						success() {
							login();
						}
					});
				}
			},
			fail() {
				mp.hideLoading();
			}
		});
	}
}

//发送logon code,获取openid
function sendCode(params) {
	apiLogin(params).then((res) => {
		const {data} = res;
		//设置信息到storage中
		setLoginStorage(data);
		//更新用户信息
		updateUserInfo();
	}).catch(() => {
		//尝试登录
		loginAgain();
	});
}

//设置指定的登录态到
function setLoginStorage(data) {
	const gotData = utils.hook(null, config.login.hooks.got, [data]);
	utils.each(config.login.storage, (key, _key) => {
		if (key in gotData) {
			mp.setStorageSync(_key, gotData[key]);
		}
	});
}


//clear login session in storage
export function clearLoginStatus() {
	//清空所有的存储
	uni.clearStorageSync();
	//重新设置登录状态
	store.commit('setLogin', false);
}

//重新登录
function loginAgain() {
	mp.showModal({
		content: '登录失败',
		showCancel: false,
		confirmText: '重新登录',
		success() {
			login();
		}
	});
}