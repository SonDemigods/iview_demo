<template>
  <v-chart :ref="refs"
           :theme="tdTheme"
           :autoresize="true"
           @click="onClick"
           :options="polar" />
</template>

<script>
import 'echarts'
import ECharts from 'vue-echarts'
import tdTheme from './theme.json'
export default {
  name: 'ChartPie',
  components: {
    'v-chart': ECharts
  },
  props: {
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
      // let legend = this.value.map(_ => _.name)
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
          formatter: '{b} : {c} ({d}%)'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'right',
        //   data: legend
        // },
        grid: {
          top: 20,
          bottom: '10%',
          left: '10%',
          right: '10%'
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.value,
            label: {
              show: true,
              position: 'outside',
              formatter: '{b} : {c} ({d}%)'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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
