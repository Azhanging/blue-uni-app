<template>
  <div class="bc-row bc-f-14rpx bc-t-c">

    <div class="bc-pd-10rpx">
      <button class="bc-btn bc-btn-primary" open-type="getUserInfo" @getphonenumber="$getUserInfo">获取用户信息</button>
    </div>

    <div class="bc-pd-10rpx">
      <button class="bc-btn bc-btn-primary" open-type="getPhoneNumber" @getphonenumber="bindPhone">获取手机号</button>
    </div>

  </div>
</template>

<script>

  import { backLastRoute } from '$mp-api/page';

  export default {
    name: "register",
    methods: {
      //绑定手机号
      bindPhone(res) {
        this.$bindPhone(res).then(() => {
          //绑定成功后跳回到最后的路由地址
          backLastRoute();
        });
      }
    }
  }
</script>


