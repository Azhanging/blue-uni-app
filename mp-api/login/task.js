import store from '@store';
import BlueQueuePipe from 'blue-queue-pipe';

//登录任务队列
const loginTask = new BlueQueuePipe({
  methods:{
    //执行任务
    runTask(fn){
      if (store.state.login) {
        fn();
      } else {
        this.enqueue(fn);
      }
    }
  }
});

//登录的任务在vue中执行，所有的动作都在登录后去执行
export function loginTaskInVue(Vue) {
  Vue.prototype.$loginTask = loginTask;
}

export default loginTask;