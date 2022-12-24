<template>
  <body class="body-padding">
    <FilterBoxComponent
    @filterData="filterEvent"
    :register="true"
    :register_name="register_name"
    :title="title"
    :month_show="false"
    :year_show="false"
    :date_range="false"/>
    <TableComponent
    :headers="headers"
    :datas="datas"
    :filterData="filterData"/>
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
  data () {
    return {
      title: '상품 리스트',
      register_name: '상품',
      clicked: false,
      headers: ['구분', '구분코드', '품목', '품목코드', '판매단가', '비고'],
      datas: ['세제', '01', '좋은 세제', '294721', '20,000', ''],
      filterData: {},
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
