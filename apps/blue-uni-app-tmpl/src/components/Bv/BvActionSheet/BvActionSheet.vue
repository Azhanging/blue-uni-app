<template>
  <!-- 遮罩层 -->
  <div class="ba-shade" :animation="animation" @click.stop="shadeClick">
    <div class="action-sheet" @click.stop>
      <div class="action-sheet-header">
        <slot name="header">
          <div class="action-sheet-control left-control"></div>
          <div class="action-sheet-control title">
            {{title}}
          </div>
          <div class="action-sheet-control right-control">
            <a href="javascript:;" @click.stop="hide">
              关闭
            </a>
          </div>
        </slot>
      </div>

      <slot/>
    </div>
  </div>
</template>

<script>

  export default {
    name: "bv-action-sheet",
    props: {
      title: {
        type: String,
        default: ''
      },
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
          return this.$slideAnimation();
        } else {
          return this.$slideAnimation({
            y: '100%',
            opacity: 0
          });
        }
      }
    },
    methods: {
      //遮罩点击
      shadeClick() {
        if (!this.clickShadeClose) return;
        this.hide();
      },
      //隐藏
      hide() {
        this.$emit('update:visible', false);
      }
    }
  }
</script>

<style scoped lang="scss">
  .action-sheet-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    .action-sheet-control {
      flex: 1;
      padding: rpx(12);
      &.left-control {
        text-align: left;
      }
      &.title {
        flex: 2;
        font-weight: bold;
        text-align: center;
      }
      &.right-control {
        text-align: right;
      }
    }
  }

  .action-sheet {
    width: 100%;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .ba-shade {
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    opacity: 0;
  }

</style>