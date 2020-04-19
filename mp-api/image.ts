//图片相关
import { showToast } from '$mp-api/toast';
import { authorize, authorizeFail } from "./authorize";
import { showModal } from "./modal";

//在Vue中扩展
export function imageInVue ( Vue: any ): void {
	//保存图片
	Vue.prototype.$saveImage = saveImage;
}

//检测授权情况，进行图片下载，然后本地保存
function saveImage ( opts: any ): Promise<any> {
	return authorize({
		scope: 'scope.writePhotosAlbum'
	}).then(() => {
		return downFile(opts);
	}).then(( res: any ) => {
		return saveImg(res).then(() => {
			showToast({
				title: "保存图片成功"
			});
		});
	}).catch(( err: any ) => {
		const {errMsg} = err;
		//提醒授权错误，可跳转授权页面
		if (/auth/.test(errMsg)) {
			authorizeFail({
				type: 'writePhotosAlbum'
			});
		} else {
			//保存错误提示
			showModal({
				title: "提示",
				content: "保存图片失败",
				confirmText: "我知道了"
			});
		}
		return Promise.reject(err);
	});
}

//下载文件
function downFile ( this: any, opts: {
	url: string;
} ): Promise<any> {
	const {url} = opts;
	return new Promise(( resolve, reject ) => {
		uni.downloadFile({
			url,
			success: ( res: any ) => {
				if (res.statusCode === 200) {
					resolve.call(this, res);
				} else {
					reject.call(this, res);
				}
			},
			fail: ( err: any ) => {
				reject.call(this, err);
			}
		});
	});
}

//保存图片
function saveImg ( opts: any ): Promise<any> {
	return new Promise(( resolve, reject ) => {
		const {tempFilePath: filePath} = opts;
		uni.saveImageToPhotosAlbum({
			filePath,
			success: ( res: any ) => {
				resolve(res);
			},
			fail: ( err: any ) => {
				reject(err);
			}
		});
	});
}

