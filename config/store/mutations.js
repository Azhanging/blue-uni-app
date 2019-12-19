import config from '@config';

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  SET_LAST_PATH(state, path) {
    state.lastPath = path;
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
