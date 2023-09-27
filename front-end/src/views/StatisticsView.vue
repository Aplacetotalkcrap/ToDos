<template>
  <h1>数据统计页</h1>
  <div class="chart" ref="chart">
  </div>
  <div>{{this.attentionTimer}}</div>
  <div>
    <p>计算后的 attentionTimer: {{ computedAttentionTimer }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';
import {getCookie} from "@/utils";

export default {
  name: 'StatisticsView',
  data(){
    return{
      attentionTimer:{},
      timer:0
    }
  },
  mounted() {
    this.drawChart();
    this.getAttention()
  },
  methods: {
    drawChart() {
      const chart = echarts.init(this.$refs.chart);
      const option = {
        title: {
          text: 'ECharts 入门示例',
        },
        xAxis: {
          type: 'category',
          data: ['A', 'b', 'c', 'd', 'e', 'f'],
        },
        yAxis: {
          type: 'value',
          data: [20, 20]
        },
        series: [
          {
            name: '数据',
            type: 'bar',
            data: [10,20,30,40,50,60,],
          },
        ],
      };
      chart.setOption(option);
    },
    async getAttention() {
      await axios.get(`/api/intent/getIntent?token=${this.$store.state.userInfo.token || getCookie('token')}`)
          .then(
              r => {
                console.log(r.data.attentionTimer)
                const attTime = r.data.attentionTimer
                this.attentionTimer = attTime[0].attention_time
              }
          ).catch()
    }
  },
  computed: {
    computedAttentionTimer() {
      const attentionTimeInSeconds =  this.attentionTimer;

      if (attentionTimeInSeconds < 60) {
        // 如果 attentionTimeInSeconds 小于 60 秒，将其转化为分钟
        return `${attentionTimeInSeconds} 分钟`;
      } else {
        const attentionTimeInMinutes = Math.floor(attentionTimeInSeconds / 60);
        return `${attentionTimeInMinutes} 小时`;
      }
    }
  }

};
</script>

<style scoped>
.chart {
  width: 300px;
  height: 300px;
}
</style>