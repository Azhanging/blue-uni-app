<!-- 车辆键盘 -->
<template>
  <div class="car-number-key-board" :animation="animation">

    <!-- 操作菜单 -->
    <div class="ba-flex ba-flex-jc-sb menu">
      <div class="ba-flex-1">
        <button class="ba-inline-block ba-t-base ba-pd-10rpx" @click.stop="newEnergy">
          {{isNewEnergy ? '关闭' : '使用' }}新能源号
        </button>
      </div>
      <div class="ba-flex-1">
        <button class="ba-inline-block ba-t-base ba-pd-10rpx" @click.stop="hide">
          关闭
        </button>
      </div>
    </div>

    <!-- 省份键盘区域 -->
    <div v-show="carNumber.length === 0">
      <div class="key-row" v-for="(provinces,index) in allProvince" :key="index">
        <div class="key-btn" v-for="(key,_index) in provinces" :key="_index">
          <div :class="key !== '' &&  'key'" @click.stop="clickNumber(key)">
            {{key}}
          </div>
        </div>
      </div>
      <div class="ba-row ba-t-c ba-pd-10rpx ba-t-primary" @click="del">
        删除
      </div>
    </div>

    <!-- 全键盘 -->
    <div v-show="carNumber.length > 0">
      <div class="key-row" v-for="(keys,index) in fullKeyboard" :key="index">
        <div class="key-btn" v-for="(key,_index) in keys" :key="_index">
          <div class="key"
               :class="index === 0 && carNumber && carNumber.length < 2 && 'disabled'"
               :hover-class="'ba-btn-hover'"
               @click.stop="clickNumber(key,index)"
          >
            {{key}}
          </div>
        </div>
      </div>
      <div class="ba-row ba-t-c ba-pd-10rpx ba-t-primary" @click="del">
        删除
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "bv-car-number-keyboard",
    data() {
      return {
        //省按钮
        allProvince: [
          ["粤", "沪", "京", "津", "冀", "晋", "蒙", "辽", "吉",],
          ["黑", "苏", "浙", "皖", "闽", "赣", "鲁", "豫", "鄂",],
          ["湘", "桂", "琼", "渝", "川", "贵", "云", "藏", "陕",],
          ["", "", "甘", "青", "宁", "新", "使", "", ""]
        ],
        //全键盘
        fullKeyboard: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
          ["A", "B", "C", "D", "E", "F", "G", "H"],
          ["J", "K", "L", "M", "N", "P", "Q", "R"],
          ["S", "T", "U", "V", "W", "X", "Y", "Z"]
        ]
      };
    },
    props: {
      //是否显示键盘
      visible: {
        type: Boolean,
        default: false
      },
      //是否新能源
      isNewEnergy: {
        type: Boolean,
        default: false
      },
      //输入的数字
      value: {
        type: String,
        default: ``
      }
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
      },
      carNumber: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    },
    methods: {
      //使用新能源
      newEnergy() {
        let carNumber = this.carNumber;
        const isNewEnergy = !this.isNewEnergy;
        //删掉后面一位
        if (!isNewEnergy && carNumber.length === 8) {
          this.setCarNumber(carNumber.substr(0, carNumber.length - 1));
        }
        this.$emit('update:isNewEnergy', isNewEnergy);
      },
      //关闭键盘
      hide() {
        this.$emit('update:visible', false);
      },
      //删除
      del() {
        const carNumber = this.carNumber;
        if (carNumber.length < 1) return;
        this.setCarNumber(carNumber.substr(0, carNumber.length - 1));
      },
      //点击数字
      clickNumber(number, index) {
        const carNumber = this.carNumber;
        const isNewEnergy = this.isNewEnergy;
        const oldNumber = carNumber;
        //输入完省份地区才能输入数字
        if (index === 0 && oldNumber.length < 2) return;
        //新能源规则
        if ((!isNewEnergy && oldNumber.length === 7) || (isNewEnergy && oldNumber.length === 8)) return;
        this.setCarNumber(oldNumber + number);
      },
      //完成按钮
      result() {
        //关闭键盘
        this.hide();
      },
      //设置
      setCarNumber(val) {
        this.carNumber = val;
      }
    }
  }
</script>

<style scoped lang="scss">

  //车牌键盘
  .car-number-key-board {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #f4f4f4;
    background-color: #fff;
    opacity: 0;
    //键盘菜单
    .menu {
      border-bottom: 1px solid #f4f4f4;
    }

    //键盘行
    .key-row {
      display: flex;
      flex-align-items: center;
      flex-justify-content: center;
      text-align: center;

      .key-btn {
        flex: 1;
        font-size: 16px;
        color: #666;
        padding: 5px;

        .key {
          border: 1px solid #f4f4f4;
          padding: 10px 0;

          &.disabled {
            background-color: #f4f4f4;
          }
        }
      }
    }
  }
</style>