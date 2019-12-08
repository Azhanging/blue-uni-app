import { authSettingScope } from '$mp-api/setting';

//初始化的getSetting
export function setting(res) {
  console.log(res);
  const authSetting = res.authSetting;
  //检查定位授权
  if (authSettingScope(authSetting, `location`)) {
    console.log(res);
  }
}
