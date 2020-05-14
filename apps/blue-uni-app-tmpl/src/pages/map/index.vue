<template>
  <Page>
    <map id="map"
         :markers="map.markers"
         @callouttap="openMarker"
         @regionchange="regionchange"
         @end="regionchange"
         @begin="regionchange"
         style="width:100%;height:100%;position: fixed;top:0;bottom:0;"
    ></map>
  </Page>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      map: {
        id: "map",
        latitude: 23.099994,
        longitude: 113.324520,
        markers: [{
          id: Math.random(),
          latitude: 23.099994,
          longitude: 113.424520,
          anchor: {
            x: 10,
            y: 20
          },
          callout: {
            content: "测试一下\n<navigator url=''>地址</navigator>",
            color: "#fff",
            bgColor: "#000",
            display: "BYCLICK",
            borderRadius: 20,
            padding: 10
          }
        }, {
          id: Math.random(),
          latitude: 22.598248,
          longitude: 113.931845,
          callout: {
            content: "地址信息\n查看详情>>",
            color: "#fff",
            bgColor: "#000",
            display: "BYCLICK",
            borderRadius: 20,
            padding: 10
          }
        }]
      },
      mapCtx: {}
    }
  },
  methods: {
    openMarker(e) {
      console.log(e);
      uni.navigateTo({
        url: "/pages/index/main"
      });
    },
    regionchange(e) {
      this.mapCtx.getRegion({
        success: (res) => {
          console.log(res);
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      //获取定位
      this.$getLocation();

      this.mapCtx = uni.createMapContext(this.map.id);

      this.mapCtx.includePoints({
        points: this.map.markers
      });

      this.mapCtx.getCenterLocation({
        success: (res) => {
          this.map.latitude = res.latitude;
          this.map.longitude = res.longitude;
        }
      });
    });
  }
}
</script>

<style scoped lang="scss">

</style>
