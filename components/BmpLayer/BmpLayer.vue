<template>
  <!-- 组件通过默认的animation关闭显示 -->
  <!-- 弹层 -->
  <div class="bmp-shade" :animation="animation" @click.stop="shadeClick">
    <div class="bmp-layer">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bmp-layer",
    props: {
      //是否显示
      isShow: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      //固定的动画
      animation() {
        if (this.isShow) {
          return this.$scale();
        } else {
          return this.$scale({
            opacity: 0,
            scale: 0
          });
        }
      }
    },
    methods: {
      //遮罩点击
      shadeClick() {
        this.$emit('shadeClick');
      }
    }
  }
</script>

<style scoped lang="scss">
  .bmp-shade {
    transform: scale(0);
  }
</style>