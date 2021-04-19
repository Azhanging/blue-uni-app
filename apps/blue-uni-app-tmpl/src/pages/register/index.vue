<template>
	<BvPage>
		<div class="ba-t-c">
			<div class="ba-pd-14rp">
				<button class="ba-btn ba-btn-base" @click="getUserProfile" v-if="userProfileApi">
					授权登录
				</button>
				<button class="ba-btn ba-btn-base" open-type="getUserInfo" @getuserinfo="getUserInfo" v-else>
					授权登录
				</button>
			</div>
			<div v-if="needBindMember">
				<button class="ba-btn ba-btn-base" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
					快速登录
				</button>
				<navigator url="/pages/bind-phone/index" class="ba-btn ba-btn-base">
					手机号绑定登录
				</navigator>
			</div>
		</div>
	</BvPage>
</template>

<script>

import { backLastRoute } from '$mp-api/page';
import { setUserInfo } from '$mp-api/user-info';
import { setLoginStorage } from '$mp-api/login';

export default {
  name: "index",
  data() {
    return {
      //是否支持
      userProfileApi: uni.canIUse(`getUserProfile`),
      needBindMember: false
    };
  },
  methods: {

    getUserInfo(e) {
      this.getUserInfoHandler(e);
    },

    getUserProfile() {
      uni.getUserProfile({
        lang: `zh_CN`,
        desc: `使用授权信息`,
        success: (res) => {
          this.getUserInfoHandler(res);
          console.log(`获取用户信息成功:`, res);
        },
        fail(e) {
          console.log(`获取用户信息失败`, e);
        }
      });
    },

    getUserInfoHandler(res) {
      const {
        iv,
        encryptedData,
        errMsg
      } = res.detail;

      //取消授权
      if (/fail/ig.test(errMsg)) return;

      this.$request({
        url: `/mock/setUserInfo`,
        method: 'post',
        data: {
          iv,
          encryptedData
        }
      }).then((res) => {
        const { data } = res;
        //未注册用户
        if (res.errcode === 40001) {
          this.needBindMember = true;
        } else {
          // 微信用户，未关注公众号，
          // 不在一个主体内，需要获取一遍用户信息，
          this.registerSuccess(data);
        }
      });
    },

    //获取手机号
    getPhoneNumber(e) {
      const {
        encryptedData,
        iv,
        errMsg
      } = e.detail;
      if (/fail/ig.test(errMsg)) return;
      this.$request({
        url: '/mock/bindPhone',
        method: 'post',
        data: {
          encryptedData,
          iv
        }
      }).then((res) => {
        const { data } = res;
        if (res.errcode === 200) {
          this.registerSuccess(data);
        }
      });
    },

    //注册成功
    registerSuccess(data) {
      // 设置信息到storage中
      setLoginStorage(data);
      //登录成功后设置用户信息
      setUserInfo(data);
      // 这里将自动补全用户信息
      backLastRoute({
        type: 'launch'
      });
    }
  }
}
</script>