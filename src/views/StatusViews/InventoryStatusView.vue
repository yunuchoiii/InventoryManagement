<template>
  <body class="body-padding">
    <FilterBoxComponent
    @filterData="filterEvent"
    @componentKey="componentKeyEvent"
    :title="title"
    :year_show="false"
    :month_show="false" />
    <TableComponent
    :title="title"
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
  name: 'InventoryStatus',
  components: {FilterBoxComponent, TableComponent},
  props: {},
  data () {
    return {
      title: '현 재고 현황',
      clicked: false,
      headers: ['구분', '품목', '품목코드', '전월 입고', '전월 출고', '전월 재고', '이달 입고', '이달 출고', '이달 재고'],
      datas: ['세제', 'EV-1',	123048,	6, 19, 20, 13, 54, 14],
      filterData: {},
      componentKey: 0
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
    },
    componentKeyEvent (data) {
      this.componentKey = data
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
