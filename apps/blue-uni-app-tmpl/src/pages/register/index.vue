<template>
  <div class="bc-pd-14rp">
    <div class="bc-t-c">
      <div class="bc-pd-14rp">
        <button class="bc-btn bc-btn-base" open-type="getUserInfo" @getuserinfo="getUserInfo">
          授权登录
        </button>
      </div>
      <div v-if="needBindMember">
        <button class="bc-btn bc-btn-base" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
          快速登录
        </button>
        <navigator url="/pages/bind-phone/index" class="bc-btn bc-btn-base">
          手机号绑定登录
        </navigator>
      </div>
    </div>
  </div>
</template>

<script>

  import { backLastRoute } from '$mp-api/page';
  import { setUserInfo } from '$mp-api/user-info';
  import { setLoginStorage } from '$mp-api/login';

  export default {
    name: "index",
    data() {
      return {
        needBindMember: false
      };
    },
    methods: {

      getUserInfo(e) {
        const {
          iv,
          encryptedData,
          errMsg
        } = e.detail;

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