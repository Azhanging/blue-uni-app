<template>
  <div class="bc-t-c bc-f-28rpx bc-pd-30rpx">
    <div class="scroll-view-wrap">
      <scroll-view class="scroll-view" scroll-y="true" @scrolltolower="scrollLower"
                   :lower-threshold="loadMore.lowerThreshold">

        <!-- 关注关联的公众号 -->

        <!--  #ifdef MP-WEIXIN -->
        <official-account @load="account"></official-account>
        <!--  #endif -->

        <div v-if="!hasUserInfo">
          <!-- 获取授权 -->
          <button open-type="getAuthorize" @getAuthorize="$authorizeUserInfo" scope="userInfo"
                  class="bc-btn bc-btn-danger"
                  v-if="platform === 'my'">
            获取授权
          </button>
          <!-- 获取授权 -->
          <button open-type="getUserInfo" @getuserinfo="$authorizeUserInfo" class="bc-btn bc-btn-danger"
                  v-else-if="platform === 'wx'">
            获取授权
          </button>
        </div>
        <div v-else>
          <div>
            <img :src="userInfo.head_img" :alt="userInfo.nickname" class="user-avatar">
          </div>
          <div>
            {{userInfo.nickname}}
          </div>
        </div>

        <!-- 没登录显示登录按钮 -->
        <div class="bc-row bc-pd-20rpx" v-if="!isLogin">
          <button @click="login" class="bc-btn bc-btn-base">
            登录
          </button>
        </div>

        <div class="bc-row bc-pd-20rpx">
          <button class="bc-btn bc-btn-base" @click="scanCode">
            扫一扫
          </button>
        </div>

        <div class="bc-row bc-pd-20rpx">
          <button class="bc-btn bc-btn-base" @click="saveImg">
            保存图片
          </button>
        </div>

        <div class="bc-row bc-pd-20rpx">
          <button class="bc-btn bc-btn-base" @click="chooseInvoiceTitle">
            发票抬头
          </button>
        </div>

        <div class="bc-row bc-pd-20rpx">
          <navigator url="/pages/map/index" class="bc-btn bc-btn-base">
            地图
          </navigator>
        </div>

        <div class="bc-row bc-pd-20rpx">
          <navigator url="/pages/upload-img/index" class="bc-btn bc-btn-base">
            上传图片
          </navigator>
        </div>

        <div class="bc-row bc-pd-20rpx">
          <navigator url="/pages/number-keyboard/index" class="bc-btn bc-btn-base">
            数字键盘
          </navigator>
        </div>

        <div class="bc-row bc-pd-20rpx">
          <navigator url="/pages/car-number-keyboard/index" class="bc-btn bc-btn-base">
            车牌键盘
          </navigator>
        </div>

        <div class="bc-row bc-pd-20rpx">
          <!-- 微信客服 -->
          <button open-type="contact" session-from="weapp" class="bc-btn bc-btn-base">
            客服测试
          </button>
        </div>

        <!-- switch -->
        <div class="bc-pd-15rpx bc-flex bc-flex-ai-c bc-flex-jc-c">
          switch:
          <BcSwitch
                  v-for="(item,index) in formSwitch"
                  :status.sync="item.status"
                  :key="index"
          />
        </div>

        <div class="bc-row bc-pd-20rpx">
          <div v-for="item in loadMore.data.list" :key="item">
            {{item}}
          </div>
        </div>

        <div v-if="loadMore.status.hasMore">
          没有更多数据
        </div>

      </scroll-view>
    </div>

    <!-- 测试animation -->
    <div class="bc-row bc-pd-20rpx">
      <button class="bc-btn bc-btn-base" @click="toggleAction">
        测试animation || BcActionSheet组件
      </button>
    </div>

    <!-- 测试animation -->
    <div class="bc-row bc-pd-20rpx">
      <button class="bc-btn bc-btn-base" @click="toggleLayer">
        测试BcLayer组件
      </button>
    </div>

    <!-- 询问层 -->
    <BcActionSheet :visible.sync="actionShow" title="BcActionSheet">
      <scroll-view scroll-y="true" style="height:500rpx;">
        <ul class="bc-reset-ul">
          <li v-for="i in list" :key="i" class="bc-pd-20rpx">
            选项{{i}}
          </li>
        </ul>
      </scroll-view>
    </BcActionSheet>

    <!-- 弹层 -->
    <BcLayer :visible.sync="layerShow">
      <div class="bc-bg-white" style="width:200rpx;height:200rpx;">
        layer 内容
      </div>
    </BcLayer>

  </div>
</template>

<script>

  import { login } from '$mp-api/login';
  import Vuex from 'vuex';
  import scrollLower from '$mixin-components/scroll-lower';
  import BcSwitch from '$components/Bc/Form/BcSwitch';

  const { mapState } = Vuex;

  export default {
    mixins: [scrollLower({
      data: {
        loadMore: {
          ajax: {
            params: {
              method: 'koi_gif_list',
              id: 1
            }
          }
        }
      }
    })],
    components: {
      BcSwitch
    },
    data() {
      return {
        list: (() => {
          const arr = [];
          for (let i = 0; i < 30; i++) {
            arr.push(i);
          }
          return arr;
        })(),
        actionShow: false,
        layerShow: false,
        formSwitch: [{
          status: false
        }, {
          status: false
        }]
      };
    },
    computed: {
      ...mapState(['isLogin'])
    },
    mounted() {
      this.$nextTick(() => {
        //微信支付
        /*this.$pay({
          success() {
            console.log('123');
          }
        });*/
      });
    },
    methods: {

      //登录
      login() {
        this.$login().then(() => {
          console.log('登录成功');
        });
      },

      changeSwitch(data) {
        this.formSwitch[data.index].status = data.status;
      },

      chooseInvoiceTitle() {
        this.$chooseInvoiceTitle().then((res) => {
          console.log(res);
        });
      },

      toggleAction() {
        this.actionShow = !this.actionShow;
      },

      toggleLayer() {
        this.layerShow = !this.layerShow;
      },

      kf(query) {
        console.log(query);
      },

      account(detail) {
        console.log(detail);
      },

      //扫描二维码
      scanCode() {
        this.$scanCode().then((res) => {
          console.log(res);
        });
      },

      saveImg() {
        this.$saveImage({
          url: 'http://tmp/wx27b9d7d5baaa8687.o6zAJs4StNoF3TQRZ5K_CveFl3hc.wiVspkHW0euJb57b1517d4fdaf3f3c66e17263f0125d.jpg'
        }).then(() => {
          console.log(`saveImage`);
        });
      }

    },
    created() {
      this.$isLogin().then(() => {
        //this.scrollLower();
      });
    }
  };
</script>

<style scoped lang="scss">
  .user-avatar {
    width: rpx(100);
    height: rpx(100);
  }
</style>
