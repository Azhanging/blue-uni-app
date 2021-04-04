<template>
	<BvPage class="ba-pd-15rpx ba-t-c">

		<!-- 测试键盘输入 -->
		<div @click="focusNumber(number0)">
			number-0:{{number0.value}}
		</div>
		<div @click="focusNumber(number1)">
			number-1:{{number1.value}}
		</div>

		<!-- 数字键盘 -->
		<BvNumberKeyboard :isInt="number.isInt" v-model="number.value" :visible.sync="isShowKeyboard"/>

	</BvPage>
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
        value: '123',
        isInt: false
      },
      number1: {
        value: '',
        isInt: true
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
