//兼容api
import BlueQueuePipe from 'blue-queue-pipe';

//loading队列，只要存在未加载完毕的loading，就会不关闭
const loadingQueue = new BlueQueuePipe();

//showLoading
export function showLoading(opts = {
	title: ``
}) {
	switch (process.env.VUE_APP_PLATFORM) {
		case 'mp-alipay':
			opts.content = opts.title;
			break;
	}
	uni.showLoading(opts);
	loadingQueue.enqueue(1);
}

//hide loading
export function hideLoading() {
	loadingQueue.dequeue();
	loadingQueue.isEmpty() && uni.hideLoading();
}

//showToast
export function showToast(opts = {
	title: ``,
	icon: ``
}) {
	uni.showToast(opts);
}

// wx.login || mp-alipay.getAuthCode
export function login(opts = {}) {
	const login = uni.login || uni.getAuthCode;
	return login(opts);
}

//wx.showModal || mp-alipay.confirm
export function showModal(opts) {
	const showModal = uni.showModal || uni.confirm;
	return showModal(opts);
}

//wx.requestPayment || mp-alipay.tradePay;
export function pay(opts = {}) {
	const pay = uni.requestPayment || uni.tradePay;
	return pay(opts);
}

//getAuthUserInfo
export function getUserInfo(opts = {}) {
	const getUserInfo = uni.getUserInfo || uni.getAuthUserInfo;
	return getUserInfo(opts);
}

//设置存储
export function setStorageSync(key, data) {
	uni.setStorageSync(key, data);
}

//获取存储
export function getStorageSync(key) {
	return uni.getStorageSync(key);
}

//删除指定key存储
export function removeStorageSync(key) {
	switch (process.env.VUE_APP_PLATFORM) {
		case 'mp-weixin':
			uni.removeStorageSync(key);
			break;
		case 'mp-alipay':
			uni.removeStorageSync({
				key
			});
			break;
		default:
			;
	}
}

//扫一扫
export function scanCode(opts = {
	type: 'qr' || 'bar',
	hideAlbum: false
}) {
	const scanCode = uni.scanCode || uni.scan;
	switch (process.env.VUE_APP_PLATFORM) {
		case 'mp-weixin':
			opts.scanType = `${opts.type}Code`;
			opts.onlyFromCamera = opts.hideAlbum;
			break;
		default:
			;
	}
	scanCode(opts);
}