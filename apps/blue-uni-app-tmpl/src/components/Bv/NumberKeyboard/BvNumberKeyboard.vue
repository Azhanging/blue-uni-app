<template>
  <!-- 数字键盘 -->
  <div class="bz-number-keyboard" :animation="animation">

    <!-- 操作菜单 -->
    <div class="bz-row bz-t-r bz-number-keyboard-menu">
      <span class="bz-inline-block bz-t-base bz-pd-10rpx" @click.stop="hide">
        关闭
      </span>
    </div>

    <div class="bz-flex bz-flex-jc-c">

      <!-- 数字操作键盘 -->
      <div class="bz-flex-3">
        <div class="key-row" v-for="(keys,index) in numberKey" :key="index">
          <div class="key-btn" v-for="(keyNumber,_index) in keys" :key="_index"
               :hover-class="keyNumber !== '' && 'bz-btn-hover'" @click.stop="clickNumber(keyNumber)">
            {{ (isInt && keyNumber === '.') ? '' : keyNumber }}
          </div>
        </div>
      </div>

      <!-- 其他操作 -->
      <div class="bz-flex-1">
        <div class="bz-flex bz-flex-d-c bz-flex-jc-c bz-flex-ai-c other-btn">
          <div class="bz-flex-1 bz-w-100" @click.stop="del">
            <div class="bz-flex bz-flex-jc-c bz-flex-d-c del-btn" hover-class="bz-btn-hover">
              删除
            </div>
          </div>
          <div class="bz-flex-1 bz-w-100" @click.stop="result">
            <div class="bz-flex bz-flex-jc-c bz-flex-d-c result-btn" hover-class="bz-btn-hover">
              确定
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "bv-number-key-bord",
    props: {
      //是否显示键盘
      visible: {
        type: Boolean,
        default: false
      },
      //输入的数字
      number: {
        type: [String, Number],
        default: ''
      },
      min: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: 99999
      },
      //只能输入整数
      isInt: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        //数字键盘
        numberKey: [
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
          ['', '0', '.']
        ]
      };
    },
    computed: {
      //键盘动画
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
      //关闭键盘
      hide() {
        this.$emit('update:visible', false);
      },
      //删除
      del() {
        const number = this.number;
        if (number.length < 1) return;
        this.$emit('update:number', number.substr(0, number.length - 1));
      },
      //点击数字
      clickNumber(number) {
        const oldNumber = this.number;
        let newNumber = oldNumber;
        //首位为0,后面只能跟0
        if (oldNumber.length === 1 && oldNumber === '0' && number !== '.') return;
        //第一位不能为.
        if (oldNumber.length === 0 && number === `.`) return;
        //不能存在两个逗号
        if (!(number === `.` && /\./.test(oldNumber))) {
          newNumber += number;
        }
        this.$emit('update:number', newNumber);
      },
      //完成按钮
      result() {
        this.hide();
        this.$emit('result', this.number);
      }
    }
  }
</script>

<style scoped lang="scss">
  //数字键盘
  .bz-number-keyboard {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #f4f4f4;
    background-color: #fff;
    opacity: 0;

    //键盘菜单
    .bz-number-keyboard-menu {
      border-bottom: 1px solid #f4f4f4;
    }

    .key-row {
      display: flex;
      flex-align-items: center;
      flex-justify-content: center;
      .key-btn {
        flex: 1;
        font-size: 21px;
        color: #666;
        height: 50px;
        line-height: 50px;
        &:nth-of-type(1) {
          border-bottom: 1px solid #f4f4f4;
        }
        &:nth-of-type(2) {
          border-left: 1px solid #f4f4f4;
          border-right: 1px solid #f4f4f4;
          border-bottom: 1px solid #f4f4f4;
        }
        &:nth-of-type(3) {
          border-right: 1px solid #f4f4f4;
          border-bottom: 1px solid #f4f4f4;
        }
      }
    }

    //其他按钮
    .other-btn {
      height: 100%;
    }

    //删除按钮，完成按钮
    .del-btn, .result-btn {
      width: 100%;
      height: 100%;
      border-bottom: 1px solid #f4f4f4;
    }
  }
</style>