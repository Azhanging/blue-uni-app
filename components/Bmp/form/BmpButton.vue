<template>
  <button class="bmp-button" :type="type">
    <slot/>
  </button>
</template>

<script>
  export default {
    name: "bmp-button",
    props: ['type']
  }
</script>

<style scoped lang="scss">
  @import '../config';

  .bmp-button {
    padding: $form-elm-pd;
  }
</style>