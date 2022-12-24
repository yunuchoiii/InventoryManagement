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
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'OutputList',
  components: {StatusFilterBox, TableComponent},
  props: {},
  data () {
    return {
      title: '출고 리스트',
      register_name: '출고',
      clicked: false,
      headers: ['구분', '품목', '품목코드', '날짜', '출고량', '비고'],
      datas: ['세제', 'EV-1',	'123048',	'2022-3-16', '20', ''],
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
