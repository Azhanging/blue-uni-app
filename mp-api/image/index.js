//图片相关
import { showToast } from '$mp-api/toast';
import { authorize, authorizeFail } from "../authorize";
import { showModal } from "../modal";

//在Vue中扩展
export function imageInVue(Vue) {
  //保存图片
  Vue.prototype.$saveImage = saveImage;
}

//检测授权情况，进行图片下载，然后本地保存
function saveImage(opts) {
  return authorize({
    scope: 'scope.writePhotosAlbum'
  }).then(() => {
    return downFile.call(this, opts);
  }).then((res) => {
    return saveImg.call(this, res).then(() => {
      showToast({
        title: "保存图片成功"
      });
    });
  }).catch((err) => {
    const { errMsg } = err;
    console.log(errMsg);
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
function downFile(opts) {
  const { url } = opts;
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url,
      success: (res) => {
        if (res.statusCode == 200) {
          resolve.call(this, res);
        } else {
          reject.call(this, res);
        }
      },
      fail: (e) => {
        reject.call(this, e);
      }
    });
  });
}

//保存图片
function saveImg(opts) {
  return new Promise((resolve, reject) => {
    const { tempFilePath: filePath } = opts;
    uni.saveImageToPhotosAlbum({
      filePath,
      success: (res) => {
        resolve(res);
      },
      fail: (e) => {
        reject(e);
      }
    });
  });
}

