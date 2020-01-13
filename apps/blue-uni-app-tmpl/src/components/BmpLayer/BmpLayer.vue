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
      visible: {
        type: Boolean,
        default: false
      },
      //点击遮罩关闭
      clickShadeClose: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      //固定的动画
      animation() {
        if (this.visible) {
          return this.$scaleAnimation();
        } else {
          return this.$scaleAnimation({
            opacity: 0,
            scale: 0
          });
        }
      }
    },
    methods: {
      shadeClick() {
        if (!this.clickShadeClose) return;
        this.$emit('update:visible', false);
      }
    }
  }
</script>

<style scoped lang="scss">
  .bmp-shade {
    transform: scale(0);
  }
</style>