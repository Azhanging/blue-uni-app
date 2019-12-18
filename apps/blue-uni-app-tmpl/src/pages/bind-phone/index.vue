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

  import { reLaunchLastRoute } from '$mp-api/page';
  import { getLastPath } from "$mp-api/page";
  import { setUserInfo } from '$mp-api/user-info';

  let timer = null;
  const getCodeText = '获取验证码';

  function setTimer() {
    timer = setTimeout(() => {
      if (this.sendCodeText !== 1) {
        --this.sendCodeText;
        setTimer.call(this);
      } else {
        this.sendCodeText = getCodeText;
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
        sendCodeText: getCodeText
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
          //设置用户信息
          setUserInfo(data);
          reLaunchLastRoute();
        });
      }
    },
    unLoad() {
      clearTimeout(timer);
    }
  }
</script>