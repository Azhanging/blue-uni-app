import config from '@config';
import * as mp from '$mp-api/compatible';

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setLastPath(state, path) {
    state.lastPath = path;
    console.log(path);
  },
  setLogin(state, status) {
    state.login = status;
  },
  //设置定位
  setLocation(state, status) {
    //设置定位到本地存储
    mp.setStorageSync(config.location.storageKey, JSON.stringify(status));
    state.location = status;
  }
};

export default mutations;
