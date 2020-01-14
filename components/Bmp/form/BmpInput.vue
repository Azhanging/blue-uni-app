<template>
  <div class="bmp-input-container">
    <div class="bmp-input-label" v-if="label">
      {{label}}
    </div>
    <div class="bmp-input">
      <input :type="type" :placeholder="placeholder" v-model="currentValue">
    </div>
    <!-- 尾部插槽 -->
    <slot name="append"/>
  </div>
</template>

<script>
  export default {
    name: "bmp-input",
    props: {
      type: {
        type: String,
        default: 'text'
      },
      label: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入内容'
      },
      value: {
        type: String,
        default: ''
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val)
      }
    },
    created() {
      this.currentValue = this.value;
    },
    data() {
      return {
        currentValue: ''
      };
    }
  }
</script>

<style scoped lang="scss">
  @import '../config';

  .bmp-input-container {
    display: flex;
    border-bottom: 1px solid #e5e5e5;
    .bmp-input-label {
      width: rpx(120);
      font-weight: 400;
      padding: $form-elm-pd;
    }
    .bmp-input {
      flex: 1;
      padding: $form-elm-pd;
    }
    .bmp-input-append {
      flex: 1;
    }
  }
</style>