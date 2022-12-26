<template>
  <body class="body-padding">
    <FilterBoxComponent
    @filterData="filterEvent"
    @componentKey="componentKeyEvent"
    :register="true"
    :register_name="register_name"
    :title="title"
    :month_show="false"
    :year_show="false"
    :date_range="false"
    :tooltip_msg="tooltip_msg"/>
    <TableComponent
    :headers="headers"
    :datas="datas"
    :filterData="filterData"
    :key="componentKey"/>
    <div>
      <input type="text">
    </div>
  </body>
</template>
<script>
/* eslint-disable */
import FilterBoxComponent from '@/components/FilterBoxComponent.vue'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'ProductList',
  components: {FilterBoxComponent, TableComponent},
  props: {},
  watch: {},
  data () {
    return {
      title: '상품 리스트',
      register_name: '상품',
      clicked: false,
      headers: ['구분', '구분코드', '품목', '품목코드', '판매단가', '용량', '개수', '비고'],
      datas: ['세제', '01', '좋은 세제', '294721', '20,000', '300ml', '50', ''],
      filterData: {},
      componentKey: 0,
      tooltip_msg: ""
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
