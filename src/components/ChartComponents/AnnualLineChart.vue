<template>
  <LineChartGenerator
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
/* eslint-disable */
import { Line as LineChartGenerator } from 'vue-chartjs'

import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, Filler } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, Filler)

export default {
  name: 'LineChart',
  components: {
    LineChartGenerator
  },
  props: {
    labels: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 100
    }
  },
  mounted () {},
  data() {
    return {
      chartData: {
        labels: this.labels,
        datasets: [
          {
            label: '연간 재고량',
            data: this.data,
            borderColor: '#9a66ff',
            pointBorderColor: '#9a66ff',
            backgroundColor: "rgba(204, 178, 255, 0.4)",
            borderWidth: 4,
            fill: 'origin'
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: false
        }
      }
    }
  }
}
</script>
