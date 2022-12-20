<template>
  <body class="body-padding">
    <StatusFilterBox
    @filterData="filterEvent"
    :register="true"
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
  name: 'InputList',
  components: {StatusFilterBox, TableComponent},
  props: {},
  data () {
    return {
      title: '입고 리스트',
      clicked: false,
      headers: ['구분', '물품', '물품코드', '날짜', '입고량', '비고'],
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
