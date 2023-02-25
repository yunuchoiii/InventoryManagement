<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script>
/* eslint-disable */
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)

export default {
  name: 'InBoundBarChart',
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
            borderRadius: 100,
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: false,
          datalabels: {
            align: 'top',
            anchor: 'end',
            color: '#555555',
            display: true,
            font: {
              weight: 'bold',
              size: 14
            },
            formatter: Math.round,
          },
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
