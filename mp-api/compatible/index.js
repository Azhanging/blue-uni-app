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