<template>
  <div class="bz-t-333 bz-f-28rpx bz-t-c bz-pd-20rpx">

    <!-- 测试键盘输入 -->
    <div class="bz-flex">
      <div class="bz-flex-1" @click="focusNumber(number0)">
        number-0:{{number0.value}}
      </div>
      <div class="bz-flex-1" @click="focusNumber(number1)">
        number-1:{{number1.value}}
      </div>
    </div>

    <!-- 数字键盘 -->
    <BvNumberKeyboard :number.sync="number.value" :visible.sync="isShowKeyboard"/>

  </div>
</template>

<script>

  export default {
    name: "number-keyboard",
    data() {
      return {
        number: {
          value: ''
        },
        number0: {
          value: '123'
        },
        number1: {
          value: ''
        },
        //显示键盘状态
        isShowKeyboard: false
      }
    },
    methods: {
      //选中某个数字
      focusNumber(number) {
        this.isShowKeyboard = true;
        this.number = number;
      },

      closeKeyboard(state) {
        this.isShowKeyboard = state;
      },

      //修改数据
      changeNumber(number) {
        this.number.value = number;
      }
    }
  };
</script>
