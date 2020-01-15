import Vue from 'vue';
import App from './App';
//use public in vue
import useInVue from '$use-in-vue';
//use vuex
import './store';
//全局blue-components
import '@css/blue-zone.scss';
//公共scss
import '$assets/css/app.scss';

/*------ 公共组件START -------*/
import BcActionSheet from '$components/Bc/ActionSheet/BcActionSheet';
import BcLayer from '$components/Bc/Layer/BcLayer';
import BcCarNumberKeyboard from '$components/Bc/CarNumberKeyboard/BcCarNumberKeyboard';
import BcNumberKeyboard from '$components/Bc/NumberKeyboard/BcNumberKeyboard';

//注册全局的组件
Vue.component('BcActionSheet', BcActionSheet);
Vue.component('BcLayer', BcLayer);
Vue.component('BcCarNumberKeyboard', BcCarNumberKeyboard);
Vue.component('BcNumberKeyboard', BcNumberKeyboard);
/*------ 公共组件END -------*/

//使用插件到Vue，相对于公共的插件
useInVue(Vue);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  ...App
});

app.$mount();
