<template>
  <web-view :src="src"></web-view>
</template>

<script>

  export default {
    name: "index",
    onShow() {
      const webView = this.$webView;
      const { src, title } = webView.getWebView();
      this.src = decodeURIComponent(src);
      title && uni.setNavigationBarTitle({
        title
      });
    },
    data() {
      return {
        src: ``
      };
    }
  }
</script>