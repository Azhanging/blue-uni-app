import Vue from 'vue';
import App from './App';
//use public in vue
import useInVue from '$use-in-vue';
//use vuex
import './store';
//全局blue-components
import '@css/blue-component.scss';
//公共scss
import '$assets/css/app.scss';

/*------ 公共组件START -------*/
import BmpActionSheet from '$components/BmpActionSheet/BmpActionSheet';
import BmpLayer from '$components/BmpLayer/BmpLayer';
import BmpSwitch from '$components/BmpSwitch/BmpSwitch';
import BmpCarNumberKeyboard from '$components/BmpCarNumberKeyboard/BmpCarNumberKeyboard';
import BmpNumberKeyboard from '$components/BmpNumberKeyboard/BmpNumberKeyboard';

//注册全局的组件
Vue.component('BmpActionSheet', BmpActionSheet);
Vue.component('BmpLayer', BmpLayer);
Vue.component('BmpSwitch', BmpSwitch);
Vue.component('BmpCarNumberKeyboard', BmpCarNumberKeyboard);
Vue.component('BmpNumberKeyboard', BmpNumberKeyboard);
/*------ 公共组件END -------*/

//使用插件到Vue，相对于公共的插件
useInVue(Vue);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  ...App
});

app.$mount();
