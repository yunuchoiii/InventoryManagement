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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, Filler, ChartDataLabels)

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
          legend: false,
          datalabels: {
            align: 'top',
            borderColor: 'white',
            color: '#555555',
            display: true,
            font: {
              weight: 'bold',
              size: 14
            },
            padding: 6,
            formatter: Math.round,
          },
        }
      }
    }
  }
}
</script>
