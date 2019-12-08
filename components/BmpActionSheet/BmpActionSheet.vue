<template>
  <!-- 遮罩层 -->
  <div class="bmp-shade" :animation="animation" @click.stop="shadeClick">
    <div class="action-sheet">
      <slot/>
    </div>
  </div>
</template>

<script>

  export default {
    name: "bmp-action-sheet",
    props: {
      //是否显示
      isShow: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      //固定的动画
      animation(){
        if (this.isShow) {
          return this.$slide();
        } else {
          return this.$slide({
            y: '100%',
            opacity: 0
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
  .action-sheet {
    width: 100%;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>