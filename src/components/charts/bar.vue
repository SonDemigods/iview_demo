<template>
  <v-chart :ref="refs"
           :theme="tdTheme"
           @click="onClick"
           :autoresize="true"
           :options="polar" />
</template>

<script>
import 'echarts'
import ECharts from 'vue-echarts'
import tdTheme from './theme.json'
export default {
  name: 'ChartBar',
  components: {
    'v-chart': ECharts
  },
  props: {
    bottom: {
      type: Number,
      default: 70
    },
    rotate: {
      type: Number,
      default: 50
    },
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
      let xAxisData = []
      let seriesData = []
      this.value.map(item => {
        xAxisData.push(item.name)
        seriesData.push(item.value)
      })
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
          top: 20,
          bottom: this.bottom,
          left: '10%',
          right: '10%'
        },
        tooltip: {},
        xAxis: {
          axisLabel: { rotate: this.rotate, interval: 0 },
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            formatter: function (params) {
              if (params.value > 0) {
                return params.value
              } else {
                return ''
              }
            }
          }
        }]
      }
      this.polar = option
    },
    onClick (event, instance, echarts) {
      // console.log(arguments)
      this.$emit('chartClick', arguments)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>
<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
