import utils from 'blue-utils';
import config from '@config';
import { showLoading, hideLoading } from '$mp-api/loading';

//选择图片,默认上传图片,isUpload为false时，将返回默认chooseImage的数据流
export function chooseImage ( opts = {} ) {
	return new Promise(( resolve, reject ) => {

		const _opts = utils.extend({
			//是否上传文件
			isUpload: true
		}, opts);

		uni.chooseImage(utils.extend(_opts, {
			success ( res: any ) {
				//自动上传图片
				if (_opts.isUpload) {
					uploadFile({
						filePaths: res.tempFilePaths
					}).then(( res ) => {
						resolve(res);
					});
				} else {
					resolve(res);
				}
			},
			fail ( err: any ) {
				reject(err);
			}
		}));
	});
}

//上传图片
export function uploadFile ( opts: {
	filePaths: string[];
} = {
	//多个上传图片
	filePaths: []
} ): Promise<any> {
	const all: Promise<any>[] = [];
	const { filePaths } = opts;
	filePaths.forEach(( filePath ) => {
		all.push(new Promise(( resolve, reject ) => {
			showLoading();
			uni.uploadFile(utils.extend({
				//上传地址
				url: config.upload.url,
				//随机name
				name: `file`,
				header: {
					"Content-Type": "multipart/form-data",
					'accept': 'application/json',
				},
				filePath
			}, opts, {
				success ( res: any ) {
					hideLoading();
					resolve(res);
				},
				fail ( err: any ) {
					hideLoading();
					reject(err);
				}
			}));
		}));
	});
	return Promise.all(all);
}

//扩展到Vue上
export function uploadInVue ( Vue: any ) {
	//获取图片文件
	Vue.prototype.$chooseImage = chooseImage;
	//上传资源
	Vue.prototype.$uploadFile = uploadFile;
}

