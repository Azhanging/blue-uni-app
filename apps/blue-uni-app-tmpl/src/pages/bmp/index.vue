<template>
  <div class="bc-t-24rpx">
    <div class="bc-pd-24rpx">
      <BmpInput type="text" label="账号" placeholder="请输入账号" v-model="username"/>
      <BmpInput type="password" label="密码" placeholder="请输入密码" v-model="password"/>
      <BmpInput type="password" label="验证码" placeholder="验证码" v-model="code">
        <BmpButton slot="append" class="bc-t-base">
          发送验证码
        </BmpButton>
      </BmpInput>
    </div>

  </div>
</template>

<script>

  import BmpInput from '$components/Bmp/form/BmpInput';
  import BmpButton from '$components/Bmp/form/BmpButton';

  export default {
    name: "index",
    components: {
      BmpInput,
      BmpButton
    },
    data() {
      return {
        username: '',
        password: '',
        code: ''
      };
    }
  }
</script>