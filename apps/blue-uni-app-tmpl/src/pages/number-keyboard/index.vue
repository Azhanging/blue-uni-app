<template>
  <div class="bc-t-333 bc-f-14rpx bc-t-c bc-pd-10rpx">

    <!-- 测试键盘输入 -->
    <div class="bc-flex">
      <div class="bc-flex-1" @click="focusNumber(number0)">
        number-0:{{number0.value}}
      </div>
      <div class="bc-flex-1" @click="focusNumber(number1)">
        number-1:{{number1.value}}
      </div>
    </div>

    <!-- 数字键盘 -->
    <BmpNumberKeyboard :number.sync="number.value" :visible.sync="isShowKeyboard"/>

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
