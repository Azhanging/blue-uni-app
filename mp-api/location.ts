import config from '@config';
import utils from 'blue-utils';
import BlueQueuePipe from 'blue-queue-pipe';
import { showLoading, hideLoading } from '$mp-api/loading';
import { authorize, authorizeFail } from "./authorize";

//定位任务队列
export const locationQueue = new BlueQueuePipe({
	methods: {
		//执行任务
		runTask ( fn: Function ) {
			if (getLocationStorage()) {
				fn();
			} else {
				this.enqueue(fn);
			}
		}
	}
});

//location 接口
export function locationInVue ( Vue: any ) {
	//获取定位
	Vue.prototype.$getLocation = getLocation;
	//定位队列
	Vue.prototype.$locationQueue = locationQueue;
}

//获取地理位置
export function getLocation ( opts = {
	isShowFailModal: false
} ) {
	return authorize({
		scope: 'scope.userLocation'
	}).then(() => {
		//使用定位,返回可以用于wx.openLocation的经纬度
		return new Promise(( resolve, reject ) => {
			showLoading();
			//区分不同端的地理位置类型
			const type = (() => {
				switch (process.env.VUE_APP_PLATFORM) {
					case 'mp-weixin':
						return 'gcj02';
					case 'mp-alipay':
						return 1;
				}
			})();
			uni.getLocation(utils.extend({
				type,
				success ( res: any ) {
					hideLoading();
					//定位信息
					const location = {
						lat: res.latitude,
						lng: res.longitude
					};
					//设置定位信息到本地到本地
					setLocationStorage(location);
					resolve(location);
				},
				fail ( err: any ) {
					hideLoading();
					reject(err);
				}
			}, opts));
		});
	}).catch(( err ) => {
		hideLoading();
		//针对微信提醒授权使用 不设置isShowFailModal不进行授权提醒
		if (/auth/.test(err.errMsg) && opts.isShowFailModal) {
			authorizeFail({
				type: 'location'
			});
		}
		return Promise.reject(err);
	});
}

//设置定位到本地存储
export function setLocationStorage ( opts = {} ) {
	//{lat:0,lng:0}
	uni.setStorageSync(config.location.storageKey, JSON.stringify(opts));
}

//获取本地的定位信息
export function getLocationStorage () {
	const locationStorage = uni.getStorageSync(config.location.storageKey);
	return (locationStorage && JSON.parse(locationStorage)) || null;
}