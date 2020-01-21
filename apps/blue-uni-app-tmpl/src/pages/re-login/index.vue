<template>
  <div class="bz-pd-24rpx bz-t-c">
    <div class="bz-mg-b-20rpx">
      <button @click="login" class="bz-btn bz-btn-base bz-bd-radius-6 bz-w-100" v-if="reLoginStatus">
        重新登录
      </button>
      <div class="bz-pd-24rpx" v-else>
        <template v-if="!reLoginStatus">
          重新登录中...
        </template>
      </div>
    </div>
    <div>
      <navigator open-type="reLaunch" :url="config.path.reLogin" class="bz-btn bz-btn-base bz-bd-radius-6 bz-w-100">
        回到首页
      </navigator>
    </div>
  </div>
</template>

<script>

  import { backLastRoute } from '$mp-api/page';

  export default {
    name: "index",
    data() {
      return {
        reLoginStatus: false
      };
    },
    onShow() {
      this.login();
    },
    methods: {
      login() {
        this.reLoginStatus = false;
        this.$login().then(() => {
          this.reLoginStatus = true;
          //回到最后的路由页面
          backLastRoute({
            type: 'launch'
          });
        }).catch(() => {
          this.reLoginStatus = false;
        });
      }
    }
  }
</script>