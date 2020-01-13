<template>
  <div class="bc-row bc-f-14rpx bc-t-c">
    <div class="bc-flex">
      <input type="text" class="bc-input bc-flex-1" placeholder="请输入手机号" v-model="form.phone">
      <button @click="sendCode">
        {{sendCodeText}}
      </button>
    </div>
    <div class="bc-flex">
      <input type="text" class="bc-flex-1 bc-input" placeholder="请输入短信验证码" v-model="form.code">
    </div>
    <div class="bc-t-c">
      <button class="bc-btn bc-btn-base" @click="login">
        登录
      </button>
    </div>
  </div>
</template>

<script>

  import { backLastRoute } from '$mp-api/page';
  import { getCurrentPath } from "$mp-api/page";
  import { setUserInfo } from '$mp-api/user-info';
  import { setLoginStorage } from '$mp-api/login';

  let timer = null;
  const codeText = '获取验证码';

  function setTimer() {
    timer = setTimeout(() => {
      if (this.sendCodeText !== 1) {
        --this.sendCodeText;
        setTimer.call(this);
      } else {
        this.sendCodeText = codeText;
      }
    }, 1000);
  }

  export default {
    name: "register",
    data() {
      return {
        form: {
          phone: '',
          code: ''
        },
        sendCodeText: codeText
      }
    },
    methods: {
      sendCode() {
        const form = this.form;
        if (!/1\d{10}/.test(form.tel)) {
          return uni.showToast({
            title: `手机格式错误`,
            icon: 'none'
          });
        }
        //还在倒计时中，不进行操作
        if (!isNaN(this.sendCodeText)) return;
        clearTimeout(timer);
        this.$request({
          url: ``,
          data: {
            phone: form.phone
          }
        }).then(() => {
          this.sendCodeText = 10;
          setTimer.call(this);
        });
      },

      login() {
        const form = this.form;
        this.$request({
          url: `/mock/bindPhone`,
          method: 'post',
          data: {
            phone: form.phone,
            code: form.code
          }
        }).then((res) => {
          const { data } = res;
          this.registerSuccess(data);
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
    },
    onUnload() {
      clearTimeout(timer);
    }
  }
</script>