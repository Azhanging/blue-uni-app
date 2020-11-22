<template>
  <BvPage customNavigation title="ECHARTSECHARTS" class="bz-t-c" navigationColor="white"
          navigationBackground="linear-gradient(#009fff, #639cd2)">
	  <div class="echart-wrap">
		  <BvECharts :echarts="echarts" @onInit="onInit" canvasId="canvasId" ref="chart"/>
	  </div>
  </BvPage>
</template>

<script>

  import echarts from 'echarts'

  let chart;

  function getEChartsOpts(){
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }]
    };
  }

  function initChart(e) {
    let canvas = this.$refs.chart.canvas;
    echarts.setCanvasCreator(() => canvas);
    chart = echarts.init(canvas, null, {
      width: e.width,  //width和height根据自己的需求设置
      height: e.height
    });
    canvas.setChart(chart);
    chart.setOption(getEChartsOpts());
    this.$refs.chart.setChart(chart);
  }

  function getEChartOpts() {
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }]
    };;
  }

  export default {
    name: "index",
    data() {
      return {
        echarts,
        onInit: initChart
      }
    }
  }
</script>

<style scoped lang="scss">
  .echart-wrap {
    width: 100%;
    height: rpx(600);
  }
</style>