<template>
  <div class="bc-t-24rpx">
    <div class="bc-pd-24rpx">
      <BcInput type="text" label="账号" placeholder="请输入账号" v-model="username"/>
      <BcInput type="password" label="密码" placeholder="请输入密码" v-model="password"/>
      <BcInput type="password" label="验证码" placeholder="请输入验证码" v-model="code">
        <button class="bv-btn bv-btn-base bc-bd-radius-4" slot="append" hover-class="bc-btn-hover">
          发送验证码
        </button>
      </BcInput>
    </div>

    <div class="bc-pd-24rpx">
      <button class="bv-btn bv-btn-base bc-bd-radius-4">
        提交
      </button>
    </div>

  </div>
</template>

<script>

  import BcInput from '$components/Bc/Form/BcInput';

  export default {
    name: "index",
    components: {
      BcInput
    },
    data() {
      return {
        username: '',
        password: '',
        code: ''
      };
    },
    methods:{
      send(){
        console.log(`11`);
      }
    }
  }
</script>