<template>
	<div id="navigation" :style="'padding-top:' + layout.top +'px;'">
		<slot/>
	</div>
</template>

<script>

function getMenuButton() {
  return {
    top: 0,
    width: 0,
    height: 0
  };
}

export default {
  name: `bv-navigation`,
  data() {
    return {
      menuButton: getMenuButton()
    };
  },
  methods: {
    _init() {
      //获取右上胶囊位置
      try {
        this.menuButton = uni.getMenuButtonBoundingClientRect();
      } catch (e) {
      }
      const domQuery = this.createSelectorQuery();
      domQuery.select(`#navigation`).boundingClientRect((res) => {

      }).exec();
    }
  },
  onShow() {
    this._init();
  },
  mounted() {
    this._init();
  }
};
</script>