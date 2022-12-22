<template>
  <body class="body-padding">
    <StatusFilterBox
    @filterData="filterEvent"
    :title="title"
    :year-show="false"
    :month_show="false" />
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
  name: 'InventoryStatus',
  components: {StatusFilterBox, TableComponent},
  props: {},
  data () {
    return {
      title: '현 재고 현황',
      clicked: false,
      headers: ['구분', '물품', '물품코드', '전월 입고', '전월 출고', '전월 재고', '이달 입고', '이달 출고', '이달 재고'],
      datas: ['세제', 'EV-1',	123048,	6, 19, 20, 13, 54, 14],
      filterData: {}
    }
  },
  watch: {},
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    filterEvent (data) {
      this.filterData = data
      console.log(this.filterData)
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
