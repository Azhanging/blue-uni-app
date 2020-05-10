<template>
  <div class="bz-t-c bz-f-28rpx bz-pd-30rpx">
    <div class="scroll-view-wrap">
      <scroll-view class="scroll-view" scroll-y="true" @scrolltolower="scrollLower"
                   :lower-threshold="loadMore.lowerThreshold">

        <!-- 关注关联的公众号 -->

        <!--  #ifdef MP-WEIXIN -->
        <official-account @load="account"></official-account>
        <!--  #endif -->

        <!-- 没登录显示登录按钮 -->
        <div class="bz-row bz-pd-20rpx" v-if="!isLogin">
          <button @click="login" class="bz-btn bz-btn-base">
            登录
          </button>
        </div>

        <div class="bz-row bz-pd-20rpx">
          <button @click="openSetting" class="bz-btn bz-btn-base">
            打开设置
          </button>
        </div>

        <div class="bz-row bz-pd-20rpx">
          <button @click="reLogin" class="bz-btn bz-btn-base">
            跳转重新登录
          </button>
        </div>

        <!-- 没登录显示登录按钮 -->
        <div class="bz-row bz-pd-20rpx">
          <button @click="requestSubscribeMessage" class="bz-btn bz-btn-base">
            订阅消息
          </button>
        </div>

        <!-- 没登录显示登录按钮 -->
        <div class="bz-row bz-pd-20rpx">
          <button @click="openWebView" class="bz-btn bz-btn-base">
            webview
          </button>
        </div>

        <div class="bz-row bz-pd-20rpx">
          <button class="bz-btn bz-btn-base" @click="scanCode">
            扫一扫
          </button>
        </div>

        <div class="bz-row bz-pd-20rpx">
          <button class="bz-btn bz-btn-base" @click="saveImg">
            保存图片
          </button>
        </div>

        <div class="bz-row bz-pd-20rpx">
          <button class="bz-btn bz-btn-base" @click="chooseInvoiceTitle">
            发票抬头
          </button>
        </div>

        <div class="bz-row bz-pd-20rpx">
          <navigator url="/pages/map/index" class="bz-btn bz-btn-base">
            地图
          </navigator>
        </div>

        <div class="bz-row bz-pd-20rpx">
          <navigator url="/pages/upload-img/index" class="bz-btn bz-btn-base">
            上传图片
          </navigator>
        </div>

        <div class="bz-row bz-pd-20rpx">
          <navigator url="/pages/number-keyboard/index" class="bz-btn bz-btn-base">
            数字键盘
          </navigator>
        </div>

        <div class="bz-row bz-pd-20rpx">
          <navigator url="/pages/car-number-keyboard/index" class="bz-btn bz-btn-base">
            车牌键盘
          </navigator>
        </div>

        <div class="bz-row bz-pd-20rpx">
          <!-- 微信客服 -->
          <button open-type="contact" session-from="weapp" class="bz-btn bz-btn-base">
            客服测试
          </button>
        </div>

        <!-- switch -->
        <div class="bz-pd-30rpx bz-flex bz-flex-ai-c bz-flex-jc-c">
          switch:
          <BvSwitch
                  v-for="(item,index) in formSwitch"
                  :status.sync="item.status"
                  :key="index"
          />
        </div>

        <div class="bz-row bz-pd-20rpx">
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
    <div class="bz-row bz-pd-20rpx">
      <button class="bz-btn bz-btn-base" @click="toggleAction">
        测试animation || BvActionSheet组件
      </button>
    </div>

    <!-- 测试animation -->
    <div class="bz-row bz-pd-20rpx">
      <button class="bz-btn bz-btn-base" @click="toggleLayer">
        测试BvLayer组件
      </button>
    </div>

    <!-- 询问层 -->
    <BvActionSheet :visible.sync="actionShow" title="BvActionSheet">
      <scroll-view scroll-y="true" style="height:500rpx;">
        <ul class="bz-reset-ul">
          <li v-for="i in list" :key="i" class="bz-pd-20rpx">
            选项{{i}}
          </li>
        </ul>
      </scroll-view>
    </BvActionSheet>

    <!-- 弹层 -->
    <BvLayer :visible.sync="layerShow">
      <div class="bz-bg-white" style="width:200rpx;height:200rpx;">
        layer 内容
      </div>
    </BvLayer>

  </div>
</template>

<script>

  import Vuex from 'vuex';
  import scrollLower from '$mixin-components/scroll-lower';
  import BvSwitch from '$components/Bv/BvForm/BvSwitch';
  import { navigateToReLogin } from "$mp-api/login";
  import { getCurrentPath } from '$mp-api/page';

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
      BvSwitch
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
        }],
        isAuthSubMsg: false
      };
    },
    computed: {
      ...mapState(['isLogin'])
    },
    onLoad() {
    },
    onShow() {
      this.$loggedIn().then(() => {
        this.init();
      });
    },
    methods: {

      //登录
      login() {
        this.$login().then(() => {
          this.init();
        });
      },

      getUserInfo(e) {
        console.log(e);
      },

      //跳转重新登录
      reLogin() {
        navigateToReLogin({
          path: getCurrentPath()
        });
      },

      requestSubscribeMessage() {
        const tmplIds = [
          `mcza6vW7J8Ydza3MwI1XApOgBOAB6nB-SFV2F_u0FuY`,
          `xP7zr-V6_jeAyH2ONzMs4lm1M0-94zuLb-PV2lxudag`,
          `Uoj0b6tjmJ2sNjXkT204NZo29ThPjHjAurk9zp-st9c`
        ];
        this.$requestSubscribeMessage({
          tmplIds
        }).then((res) => {
          console.log(res);
        });
      },

      init() {
        this.getData();
        this.getData();
        this.getData();
      },

      openWebView() {
        this.$webView.navigateTo({
          src: 'https://mp.weixin.qq.com/s/GwC0FQ8yuzXtqrVKZEMZBA',
          title: '新闻'
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
      },
      getData() {
        this.$request({
          url: `/mock/data`
        });
      },

      openSetting() {
        uni.openSetting();
      }
    },
    created() {
      this.$loggedIn().then(() => {
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
