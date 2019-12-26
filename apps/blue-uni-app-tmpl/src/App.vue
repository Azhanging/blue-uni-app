<script>
  import { getUserInfo } from '$mp-api/user-info';
  import { setQuery } from '$mp-api/page';
  import { apiErrorReport } from '$api';

  export default {
    created() {
      //初始化获取用户信息
      getUserInfo();
    },
    onLaunch: function () {
      console.log('App Launch');
    },
    onShow: function (opts) {
      //设置页面参数
      setQuery(opts.query);
    },
    //错误处理
    onError(err) {
      //上报错误
      apiErrorReport(err);
    }
  }
</script>
