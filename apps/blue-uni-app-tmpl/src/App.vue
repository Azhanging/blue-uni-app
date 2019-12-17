<script>

  import { login } from '$mp-api/login';
  import { checkScene } from '$mp-api/scene';
  import { apiErrorReport } from '$api';
  import { updateUserInfo } from '$mp-api/user-info';

  export default {
    created() {
      updateUserInfo();
    },
    onLaunch: function () {
      console.log('App Launch')
    },
    onShow: function (opts) {
      //检查场景值
      checkScene(opts);
    },
    //错误处理
    onError(err) {
      //上报错误
      apiErrorReport(err);
    }
  }
</script>
