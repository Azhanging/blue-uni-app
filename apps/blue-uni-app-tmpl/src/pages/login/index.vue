<template>
  <div class="bc-pd-14rp">
    <button class="bc-btn bc-btn-base" @click="login">
      登录
    </button>
  </div>
</template>

<script>

  import { login } from '$mp-api/login';

  export default {
    name: "index",
    methods: {
      login() {
        login();
      }
    }
  }
</script>