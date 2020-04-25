import utils from 'blue-utils';
import { hideLoading, showLoading } from "$mp-api/loading";
import { showToast } from "$mp-api/toast";
import { authorizeFail } from "$mp-api/authorize";
import { getSetting } from "$mp-api/setting";

const subscribeMessageTips = {
	request: `网络问题，请稍后重试`,
	default: `订阅消息异常`
};

export function messageInVue ( Vue: any ) {
	//授权订阅消息订阅
	Vue.prototype.$requestSubscribeMessage = requestSubscribeMessage;
	//检查对于订阅ids的有效性
	Vue.prototype.$checkSubscribeMessageByTmplIds = checkSubscribeMessageByTmplIds;
}

//订阅消息错误处理
function subscribeMessageErrHandler ( err: any ): void {
	const { errCode, errMsg } = err;
	const defaultErrTips = `${subscribeMessageTips.default}:${errCode}`;
	switch (errCode) {
		case 10002:
		case 10003:
			showToast({
				title: subscribeMessageTips.request
			});
			break;
		case 20001:
			showToast({
				title: defaultErrTips
			});
			break;
		case 20004:
			authorizeFail({
				type: `subscribeMessage`
			});
			break;
		case 20005:
			showToast({
				title: defaultErrTips
			});
			break;
		default:
			showToast({
				title: errMsg
			});
	}
}

//授权订阅消息订阅
export function requestSubscribeMessage ( opts = {} ): Promise<any> {
	return new Promise(( resolve, reject ) => {
		showLoading();
		// @ts-ignore
		uni.requestSubscribeMessage(utils.extend(opts, {
			success ( res: any ) {
				hideLoading();
				resolve(res);
			},
			fail ( err: any ) {
				hideLoading();
				//订阅消息错误处理
				subscribeMessageErrHandler(err);
				reject(err);
			}
		}));
	});
}

/*
* accept reject ban状态
* 如果未授权=>false
* 模板id匹配到不授权=>false
* */

//检查对于订阅ids的有效性
export function checkSubscribeMessageByTmplIds ( ids: string[] = [] ): Promise<boolean> {
	return getSetting().then(( res: any ) => {
		const { subscriptionsSetting } = res;
		if (!subscriptionsSetting) return false;
		const { itemSettings } = subscriptionsSetting;
		const reject: string[] = [];
		ids.forEach(( id: string ) => {
			if (itemSettings[ id ] === 'accept') return;
			//收集错误
			reject.push(id);
		});
		return reject.length === 0;
	});
}