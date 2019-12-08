<template>
  <div class="bc-f-14rpx bc-t-c">
    <button @click="uploadImg" class="bc-btn bc-btn-primary">点击上传</button>
  </div>
</template>

<script>
  export default {
    name: "upload-img",
    methods: {
      uploadImg() {
        //读取图片上传
        this.$chooseImage({
          isUpload: false
        }).then((res) => {
          console.log(res);
        });
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
