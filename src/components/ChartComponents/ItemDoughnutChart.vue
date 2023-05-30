<template>
  <Doughnut
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
/* eslint-disable */
import { Doughnut } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, ChartDataLabels)

export default {
  name: 'ItemDoughnutChart',
  components: {
    Doughnut
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
    colors: {
      type: Array,
    }
  },
  data() {
    return {
      chartData: {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: this.colors,
            data: this.data,
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: 'left'
          },
          datalabels: {
            align: 'center',
            color: 'white',
            display: true,
            font: {
              weight: 'bold',
              size: 15
            },
            padding: 6,
            formatter: Math.round,
          },
          doughnutlabel: {
            labels: [
              {
                text: '550',
                font: {
                  size: 20,
                  weight: 'bold',
                  color: 'black'
                },
              },
            ],
          },
        },
        animation: { duration: 1500, }
      }
    }
  }
}
</script>
