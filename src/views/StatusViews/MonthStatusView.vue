<template>
  <body class="body-padding">
    <StatusFilterBox
    @filterData="filterEvent"
    :title="title"/>
    <TableComponent
    :headers="headers"
    :datas="datas"
    :filterData="filterData"/>
  </body>
</template>
<script>
/* eslint-disable */
import StatusFilterBox from '@/components/StatusFilterBox.vue'
import TableComponent from '@/components/TableComponents/TableComponent.vue'

export default {
  name: 'MonthStatus',
  components: {StatusFilterBox, TableComponent},
  props: {},
  data () {
    return {
      title: '월간 재고 현황',
      clicked: false,
      headers: ['구분', '물품', '물품코드',],
      datas: ['세제', 'EV-1',	123048,	6, -19, 20, 13, 54, 14, 6, -19, 20, 13, 54, 14],
      filterData: {}
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
