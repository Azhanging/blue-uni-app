<template>
  <BvPage>
    <div class="bz-pd-24rpx">
      <BvInput type="text" label="账号" placeholder="请输入账号" v-model="username"/>
      <BvInput type="password" label="密码" placeholder="请输入密码" v-model="password"/>
      <BvInput type="password" label="验证码" placeholder="请输入验证码" v-model="code">
        <button class="bz-btn bz-btn-base bz-bd-radius-4" slot="append" hover-class="hover">
          发送验证码
        </button>
      </BvInput>
    </div>

    <div class="bz-pd-24rpx">
      <button class="bz-btn bz-btn-base bz-bd-radius-4 bz-w-100" hover-class="hover">
        提交
      </button>
    </div>
  </BvPage>
</template>

<script>

  import BvInput from '$components/Bv/BvForm/BvInput';

  export default {
    name: "index",
    components: {
      BvInput
    },
    data() {
      return {
        username: '',
        password: '',
        code: ''
      };
    },
    methods: {
      send() {
        console.log(`11`);
      }
    }
  }
</script>