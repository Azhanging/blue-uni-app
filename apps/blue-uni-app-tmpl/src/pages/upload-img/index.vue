<template>
  <div class="bz-f-28rpx bz-t-c">
    <button @click="uploadImg" class="bz-btn bz-btn-primary">点击上传</button>
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
