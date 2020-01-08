//兼容api
import BlueQueuePipe from 'blue-queue-pipe';

//loading队列，只要存在未加载完毕的loading，就会不关闭
const loadingQueue = new BlueQueuePipe();

//showLoading
export function showLoading(opts = {
  title: ``
}) {
  loadingQueue.enqueue(1);
  return uni.showLoading(opts);
}

//hide loading
export function hideLoading() {
  loadingQueue.dequeue();
  loadingQueue.isEmpty() && uni.hideLoading();
}

export function loadingInVue(Vue){
  Vue.prototype.$showLoading = showLoading;
  Vue.prototype.$hideLoading = hideLoading;
}