<template>
  <v-chart :ref="refs"
           :theme="tdTheme"
           :autoresize="true"
           :options="polar" />
</template>

<script>
import 'echarts'
import ECharts from 'vue-echarts'
import tdTheme from './theme.json'
export default {
  name: 'ChartRadar',
  components: {
    'v-chart': ECharts
  },
  props: {
    indicator: Array,
    value: Array,
    refs: String,
    text: String,
    subtext: String
  },
  data () {
    return {
      tdTheme: tdTheme,
      polar: {}
    }
  },
  methods: {
    init () {
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        legend: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        grid: {
          top: 10,
          bottom: '10%',
          left: '10%',
          right: '10%'
        },
        tooltip: {},
        radar: {
          indicator: this.indicator
        },
        series: [
          {
            type: 'radar',
            data: this.value
          }
        ]
      }
      this.polar = option
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>
