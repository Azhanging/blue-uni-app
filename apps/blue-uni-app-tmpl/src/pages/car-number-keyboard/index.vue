<template>
  <div class="bc-t-333 bc-f-14rpx bc-t-c bc-pd-10rpx">

    <!-- 测试键盘输入 -->
    <div class="bc-flex">
      <div class="bc-flex-1" @click="focusNumber(number0)">
        car-number-0:{{number0.value}}
      </div>
      <div class="bc-flex-1" @click="focusNumber(number1)">
        car-number-1:{{number1.value}}
      </div>
    </div>

    <!-- 数字键盘 -->
    <BmpCarNumberKeyboard :visible.sync="isShowKeyboard" :carNumber.sync="number.value"
                          :isNewEnergy.sync="number.isNewEnergy"/>

  </div>
</template>

<script>

  export default {
    name: "car-number-keyboard",
    data() {
      return {
        number: {
          value: ''
        },
        number0: {
          value: '',
          isNewEnergy: false
        },
        number1: {
          value: '',
          isNewEnergy: true
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
      }
    }
  };

</script>
