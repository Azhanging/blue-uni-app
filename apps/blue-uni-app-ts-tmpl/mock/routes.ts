module.exports = [{
	//默认登录接口
	url: `/mock/login`,
	method: 'post',
	response: (() => {
		let i = 0;
		return function () {
			i++;
			return {
				code: 200,
				data: {
					token: 'token_value'
				},
				errcode: 50002  //模拟50001需要注册
			};
		}
	})()
}, {
	//获取手动号注册用户
	url: `/mock/setUserInfo`,
	method: 'post',
	response () {
		return {
			code: 200,
			data: {
				username: 'blue',
				mobile: '',
				token: 'token_value'
			},
			errcode: 40001
		};
	}
}, {
	//通过手动输入手机注册用户
	url: `/mock/bindPhone`,
	method: 'post',
	response () {
		return {
			code: 200,
			data: {
				username: 'blue',
				mobile: '',
				token: 'token_value'
			}
		};
	}
}, {
	url: `/mock/getUserInfo`,
	method: 'get',
	response () {
		return {
			code: 200,
			data: null /*{
        username: 'blue',
        mobile: '',
        token: 'token_value'
      }*/,
			errcode: 40001
		};
	}
}, {
	url: `/mock/status401`,
	method: 'get',
	response: (() => {
		let i = 0;
		return function () {
			i++;
			return {
				code: i >= 2 ? 200 : 401,
				data: {
					data: 'data'
				}
			}
		};
	})()
}, {
	url: `/mock/data`,
	method: 'get',
	response: (() => {
		let i = 0;
		return function () {
			i++;
			return {
				code: i >= 4 ? 200 : 401,
				data: {
					data: 'data'
				}
			}
		};
	})()
},{
	url: `/mock/dara-1`,
	method: 'get',
	response () {
		return {
			code: 200,
			data: {}
		};
	}
}];
