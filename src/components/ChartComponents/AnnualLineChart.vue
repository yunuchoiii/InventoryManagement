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
            label: '총 재고량',
            data: this.data,
            borderColor: '#9a66ff',
            pointBorderColor: '#9a66ff',
            // backgroundColor: "rgba(204, 178, 255, 0.4)",
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0,0,0,250);

              gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
              gradient.addColorStop(1, 'rgba(155, 102, 255, 0.6)');

              return gradient;
            },
            borderWidth: 4,
            fill: 'origin',
            cubicInterpolationMode: 'monotone'
          }
        ]
      },
      chartOptions: {
        scales: {
          y: {
            suggestedMin: 0
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 25,
            right: 25,
          }
        },
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
        },
      }
    }
  }
}
</script>
