import config from '@config';
import { setLastPath, getCurrentPath } from "./page";

//跳转到注册页面
export function redirectRegister(opts = {}) {
	//设置最后的路由地址
	setLastPath(opts.path);
	//跳转绑定手机页面
	(getCurrentPath() !== config.path.register) && uni.reLaunch({
		url: config.path.register
	});
}

//是否在绑定手机的页面
export function isRegisterPage(path) {
	let lastPath = getCurrentPath();
	if (path) {
		lastPath = path;
	}
	return lastPath === config.path.register;
}