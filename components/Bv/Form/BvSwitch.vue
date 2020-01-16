<template>
  <div class="bz-switch" @click="changeStatus">
    <div class="bz-switch-btn" :class="status ? 'bz-switch-active' : ''"></div>
    <div class="bz-switch-bg" :class="status ? 'bz-switch-active' : ''"></div>
  </div>
</template>

<script>
  export default {
    name: "bv-switch",
    props: {
      //状态
      status: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      changeStatus() {
        this.$emit('update:status', !this.status);
      }
    }
  }
</script>

<style scoped lang="scss">
  .bz-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
    border: 1px solid #c7c7c7;
    border-radius: 30px;
    box-sizing: border-box;
    overflow: hidden;
    .bz-switch-btn {
      border: 1px solid #f4f4f4;
      border-radius: 30px;
      height: 100%;
      width: 25px;
      background-color: #ebebeb;
      box-sizing: border-box;
      transition: 200ms ease all;
      &.bz-switch-active {
        transform: translateX(25px);
      }
    }
    .bz-switch-bg {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      height: 100%;
      transition: 200ms ease all;
      width: 10px;
      background-color: $color-base;
      &.bz-switch-active {
        width: 35px;
      }
    }
  }
</style>