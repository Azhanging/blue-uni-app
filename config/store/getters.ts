const getters = {
	//是否授权过微信信息
	hasUserInfo ( state: any ): boolean {
		try {
			if (state.userInfo instanceof Array) {
				return false;
			} else if (state.userInfo && state.userInfo.head_img) {
				return true;
			}
			return false;
		} catch (e) {
			return false;
		}
	}
};

export default getters;
