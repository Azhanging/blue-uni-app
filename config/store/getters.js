const getters = {
  //是否授权过微信信息
  hasUserInfo(state) {
    try {
      if (state.userInfo instanceof Array) {
        return false;
      } else if (state.userInfo && state.userInfo.head_img) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
};

export default getters;
