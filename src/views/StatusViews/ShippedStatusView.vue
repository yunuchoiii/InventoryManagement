<template>
  <body class="body-padding">
    <FilterBoxComponent
    @filterData="filterEvent"
    @componentKey="componentKeyEvent"
    :month_show="false"
    :title="title"/>
    <TableComponent
    :headers="headers"
    :datas="datas"
    :filterData="filterData"
    :key="componentKey"/>
  </body>
</template>
<script>
/* eslint-disable */
import FilterBoxComponent from '@/components/FilterBoxComponent.vue'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'MonthStatus',
  components: {FilterBoxComponent, TableComponent},
  props: {},
  data () {
    return {
      title: '출고 현황',
      clicked: false,
      headers: ['구분', '품목', '품목코드',],
      datas: ['세제', 'EV-1',	123048,	6, -19, 20, 13, 54, 14, 6, -19, 20, 13, 54, 14],
      filterData: {},
      componentKey: 0
    }
  },
  watch: {},
  setup () {},
  created () {
    this.getMonthsList()
  },
  mounted () {},
  unmounted () {},
  methods: {
    filterEvent (data) {
      this.filterData = data
    },
    componentKeyEvent (data) {
      this.componentKey = data
    },
    //일년치 월 리스트 구하기
    getMonthsList () {
      var month = new Date(new Date().setMonth(new Date().getMonth() + 2)).getMonth() == 0 ? 12 : new Date(new Date().setMonth(new Date().getMonth() + 2)).getMonth()
      this.headers.push(month + '월')
      for (var i=0; i < 11; i++) {
        if(month + 1 == 13) {
          month = 1
          this.headers.push(1 + '월')
        } else {
          month = month + 1
          this.headers.push(month + '월')
        }
      }
    }
  }
}
</script>
<style>
/* eslint-disable */
@import '@/styles/styles.css';
td {
  text-align: center;
}
</style>
