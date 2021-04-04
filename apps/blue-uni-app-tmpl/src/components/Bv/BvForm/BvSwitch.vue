<template>
  <div class="ba-switch" @click="changeStatus">
    <div class="ba-switch-btn" :class="status ? 'ba-switch-active' : ''"></div>
    <div class="ba-switch-bg" :class="status ? 'ba-switch-active' : ''"></div>
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
  .ba-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
    border: 1px solid #c7c7c7;
    border-radius: 30px;
    box-sizing: border-box;
    overflow: hidden;
    .ba-switch-btn {
      border: 1px solid #f4f4f4;
      border-radius: 30px;
      height: 100%;
      width: 25px;
      background-color: #ebebeb;
      box-sizing: border-box;
      transition: 200ms ease all;
      &.ba-switch-active {
        transform: translateX(25px);
      }
    }
    .ba-switch-bg {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      height: 100%;
      transition: 200ms ease all;
      width: 10px;
      background-color: $color-base;
      &.ba-switch-active {
        width: 35px;
      }
    }
  }
</style>