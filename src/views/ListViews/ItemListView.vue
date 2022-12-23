<template>
  <body class="body-padding">
    <StatusFilterBox
    @filterData="filterEvent"
    :register="true"
    :register_name="register_name"
    :title="title"
    :month_show="false"
    :year_show="false"
    :date_range="true"/>
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
import StatusFilterBox from '@/components/StatusFilterBox.vue'
import TableComponent from '@/components/TableComponents/TableComponent.vue'

export default {
  name: 'InputList',
  components: {StatusFilterBox, TableComponent},
  props: {},
  data () {
    return {
      title: '상품 리스트',
      register_name: '상품',
      clicked: false,
      headers: ['구분', '구분코드', '물품', '물품코드', '판매단가', '비고'],
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
