const mutations = {
	//设置用户信息
	SET_USER_INFO ( state: any, userInfo: any ): void {
		state.userInfo = userInfo;
	},
	//设置用户最后访问的路径
	SET_LAST_PATH ( state: any, path: string ): void {
		state.lastPath = path;
	},
	//设置登录状态
	SET_LOGIN ( state: any, status: boolean ): void {
		state.isLogin = status;
	}
};

export default mutations;
