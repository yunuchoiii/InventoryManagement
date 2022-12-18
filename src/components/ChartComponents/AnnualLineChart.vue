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
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
          legend: false,
          datalabels: {
                        backgroundColor: function (context) {
                            return context.dataset.backgroundColor;
                        },
                        borderColor: 'white',
                        borderRadius: 30,
                        borderWidth: 2,
                        color: function (context) {
                            return context.hovered ? 'black' : '#6e6d6d'
                        },
                        font: {
                            weight: 'normal'
                        },
                        listeners: {
                            enter: function (context) {
                                context.hovered = true;
                                return true;
                            },
                            leave: function (context) {
                                context.hovered = false;
                                return true;
                            }
                        },
                        display: true,
                        formatter: function (value, context) {
                            let sum = 0;
                            let valueArr = this.doughnutChart.datasets[0].data;
                            for (var i in valueArr) {
                                sum += parseInt(valueArr[i]);
                            }
                            let percentage = (value * 100 / sum).toFixed(2) + "%";
                            return percentage;
                        }.bind(this)
                    },
        }
      }
    }
  }
}
</script>
