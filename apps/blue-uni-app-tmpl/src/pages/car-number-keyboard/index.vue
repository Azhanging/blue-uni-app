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
    <BmpCarNumberKeyboard
      :isShow="isShowKeyboard"
      :carNumber="number"
      @clickNumber="changeNumber"
      @delNumber="changeNumber"
      @closeKeyboard="closeKeyboard"
      @newEnergy="newEnergy"
    />

  </div>
</template>

<script>
  import BmpCarNumberKeyboard from '$components/BmpCarNumberKeyboard/BmpCarNumberKeyboard';

  export default {
    name: "car-number-keyboard",
    components: {
      BmpCarNumberKeyboard
    },
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
      //使用新能源
      newEnergy(data) {
        const number = this.number;
        number.isNewEnergy = data.isNewEnergy;
        number.value = data.value;
      },
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
