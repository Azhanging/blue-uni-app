<template>
  <BvPage>
    <div class="bz-mg-b-20rpx">
      <button @click="login" class="bz-btn bz-btn-base bz-bd-radius-6 bz-w-100">
        {{reLoginStatus ? `重新登录中...` : `重新登录`}}
      </button>
    </div>
    <div v-if="!reLoginStatus">
      <navigator open-type="reLaunch" :url="config.path.home" class="bz-btn bz-btn-base bz-bd-radius-6 bz-w-100">
        回到首页
      </navigator>
    </div>
  </BvPage>
</template>

<script>

  import { backLastRoute } from '$mp-api/page';
  import { setIsReLoginStatus } from '$mp-api/login';

  export default {
    name: "index",
    data() {
      return {
        reLoginStatus: false   //true 中登录中 false 登录失败
      };
    },
    onLoad() {
      this.login();
    },
    onUnload() {
      setIsReLoginStatus(false);
    },
    methods: {
      login() {
        if (this.reLoginStatus) return;
        this.reLoginStatus = true;
        this.$login().then(() => {
          uni.navigateBack();
        }).catch(() => {
          this.reLoginStatus = false;
        });
      }
    }
  }
</script>