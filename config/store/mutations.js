import config from '@config';
import * as mp from '$mp-api/compatible';

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  SET_LAST_PATH(state, path) {
    state.lastPath = path;
    console.log(path);
  },
  SET_LOGIN(state, status) {
    state.isLogin = status;
  },
  //设置定位
  SET_LOCATION(state, status) {
    //设置定位到本地存储
    uni.setStorageSync(config.location.storageKey, JSON.stringify(status));
    state.location = status;
  }
};

export default mutations;
