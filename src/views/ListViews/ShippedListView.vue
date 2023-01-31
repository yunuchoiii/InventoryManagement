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
    :date_range="true"/>
    <TableComponent
    :title="title"
    :headers="headers"
    :datas="datas"
    :filterData="filterData"
    :componentKey="componentKey"
    :register_name="register_name"/>
  </body>
</template>
<script>
/* eslint-disable */
import FilterBoxComponent from '@/components/FilterBoxComponent.vue'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'ShippedList',
  components: {FilterBoxComponent, TableComponent},
  props: {},
  data () {
    return {
      title: '출고 내역',
      register_name: '출고',
      clicked: false,
      headers: ['순번', '구분', '품목', '품목코드', '출고날짜', '고객명', '가격', '출고량', '비고'],
      datas: [],
      filterData: {},
      componentKey: 0,
      categoryCode: "",
      startDate: "",
      endDate: "",
      pageable: {
        "page": 0,
        "size": 1000,
        "sort": [
          "string"
        ]
      }
    }
  },
  watch: {},
  setup () {},
  created () {
    this.getDataList()
  },
  mounted () {},
  unmounted () {},
  methods: {
    filterEvent (data) {
      this.filterData = data
      // this.categoryCode = ""
      this.getDataList()
    },
    componentKeyEvent (data) {
      this.componentKey = data
    },
    getDataList () {
      const url = `http://localhost:8080/out-stock`
      this.$axios.get(url, {
        params: {},
      }).then((res) => {
        this.datas = res.data.content
      }).catch((error) => {
        console.log(error);
      })
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
