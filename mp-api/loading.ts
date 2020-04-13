//兼容api
import BlueQueuePipe from 'blue-queue-pipe';
import utils from 'blue-utils';

//loading队列，只要存在未加载完毕的loading，就会不关闭
const loadingQueue: BlueQueuePipe = new BlueQueuePipe();

//默认的loading属性
const defaultLoadingOpts = {
	mask: true
};

//showLoading
export function showLoading ( opts: any = {} ) {
	loadingQueue.isEmpty() && uni.showLoading(utils.extend(defaultLoadingOpts, opts));
	loadingQueue.enqueue(1);
}

//hide loading
export function hideLoading () {
	loadingQueue.dequeue();
	loadingQueue.isEmpty() && uni.hideLoading();
}

export function loadingInVue ( Vue: any ) {
	Vue.prototype.$showLoading = showLoading;
	Vue.prototype.$hideLoading = hideLoading;
}