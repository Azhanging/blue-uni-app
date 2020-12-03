<template>
	<BvPage class="bz-t-c">
		
		<!-- 测试键盘输入 -->
		<div class="bz-flex-1" @click="focusNumber(number0)">
			car-number-0:{{ number0.value }}
		</div>
		<div class="bz-flex-1" @click="focusNumber(number1)">
			car-number-1:{{ number1.value }}
		</div>

		<!-- 数字键盘 -->
		<BvCarNumberKeyboard :visible.sync="isShowKeyboard"
		                     v-model="number.value"
		                     :isNewEnergy.sync="number.isNewEnergy"/>
	</BvPage>
</template>

<script>

export default {
  name: "car-number-keyboard",
  data() {
    return {
      numberValue: ``,
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
