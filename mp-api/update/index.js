import { showModal } from '../modal';

//微信小程序更新
export function mpUpdate() {
  const updateManager = uni.getUpdateManager();
  updateManager.onUpdateReady(() => {
    showModal({
      title: '更新提示',
      content: '发现新版本，小程序将会重启打开',
      showCancel: false
    }).then((res) => {
      if (!res.confirm) return;
      updateManager.applyUpdate();
    });
  });

  updateManager.onCheckForUpdate((res) => {
    if (res.hasUpdate) {
      console.log('发现新版本');
    } else {
      console.log('当前版本为最新版本');
    }
  });
}