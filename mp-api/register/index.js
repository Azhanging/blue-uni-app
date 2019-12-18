import store from '@store';
import config from '@config';
import { setLastPath, getLastPath } from "../page";

//检查是否注册（是否调用过getUserInfo）
export function checkRegister(opts = {}) {
	//是否拥有用户信息
	//是否绑定手机
	if (!store.getters.hasUserInfo || !store.getters.phone) {
		return false;
	}
	return true;
}

//跳转到注册页面
export function redirectRegister(opts = {}) {
	//设置最后的路由地址
	setLastPath(opts.path);
	//跳转绑定手机页面
	(getLastPath() !== config.path.register) && uni.reLaunch({
		url: config.path.register
	});
}

//是否在绑定手机的页面
export function isRegisterPage(path) {
	let lastPath = getLastPath();
	if (path) {
		lastPath = path;
	}
	return lastPath === config.path.register;
}