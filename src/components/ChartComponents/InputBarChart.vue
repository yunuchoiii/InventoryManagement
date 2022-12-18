<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script>
/* eslint-disable */
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'InputBarChart',
  components: { Bar },
  props: {
    labels: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
  },
  data () {
    return {
      chartData: {
        labels: this.labels,
        datasets: [
          {
            label: '입고량',
            backgroundColor: '#FF6B8A',
            data: this.data,
            borderRadius: 10,
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: false,
        },
        scales: {
          x: {
            grid: {display: false}
          }
        }
      }
    }
  },
}
</script>
<style>
</style>
