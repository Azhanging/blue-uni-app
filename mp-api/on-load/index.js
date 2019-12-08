import { setShareQuery } from '../share';
import utils from 'blue-utils';

//微信公共onLoad
export function onLoadInVue(Vue) {
  Vue.mixin({
    onLoad(query) {
      const _query = utils.parseParams(decodeURIComponent(query.scene || ""));
      //load策略
      setShareQuery(_query);
    }
  });
}