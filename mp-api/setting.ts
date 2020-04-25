//初始授权验证
export function getSetting (): Promise<any> {
	return new Promise(( resolve, reject ) => {
		uni.getSetting({
			// @ts-ignore
			withSubscriptions: true,
			success: ( res ) => {
				resolve(res);
			},
			fail ( err ) {
				reject(err);
			}
		});
	});
}