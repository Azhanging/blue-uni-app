<template>
  <div class="bz-pd-24rpx bz-t-c">
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
  </div>
</template>

<script>

  import { backLastRoute } from '$mp-api/page';

  export default {
    name: "index",
    data() {
      return {
        reLoginStatus: false   //true 中登录中 false 登录失败
      };
    },
    onShow() {
      this.login();
    },
    methods: {
      login() {
        if (this.reLoginStatus) return;
        this.reLoginStatus = true;
        this.$login().then(() => {
          const { config, $store } = this;
          //如果是tab的路径，直接使用switchTab执行
          if (config.tabBarPath.indexOf($store.state.lastPath) !== -1) {
            //回到最后的路由页面
            backLastRoute({
              type: 'tab'
            });
          } else {
            //回到最后的路由页面
            backLastRoute({
              type: 'back'
            });
          }
        }).catch(() => {
          this.reLoginStatus = false;
        });
      }
    }
  }
</script>