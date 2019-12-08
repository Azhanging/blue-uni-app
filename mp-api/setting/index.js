//初始授权验证
export function getSetting() {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			success: (res) => {
				resolve(res);
			},
			fail(err) {
				reject(err);
			}
		});
	});
}

//针对兼容列表做处理
/*
* album => scope.writePhotosAlbum
* location => scope.userLocation
* camera => scope.camera
* audioRecord => scope.record
* */
export function authSettingScope(authSetting, name) {
	//做兼容处理
	let scopeName = ``;
	if (process.env.VUE_APP_PLATFORM === 'mp-weixin') {
		switch (name) {
			case 'album':
				scopeName = `scope.writePhotosAlbum`;
				break;
			case 'location':
				scopeName = `scope.userLocation`;
				break;
			case 'camera':
				scopeName = `scope.camera`;
				break;
			case 'audioRecord':
				scopeName = `scope.record`;
				break;
			default:
				console.warn(`兼容列表不存在${name}`);
				return false;
		}
	} else {
		scopeName = name;
	}
	return authSetting[scopeName];
}