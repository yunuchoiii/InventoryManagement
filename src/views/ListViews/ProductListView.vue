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
    :title="title"
    :headers="headers"
    :datas="datas"
    :filterData="filterData"
    :componentKey="componentKey"
    :register_name="register_name"/>
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
      title: '상품 목록',
      register_name: '상품',
      clicked: false,
      headers: ['순번', '구분', '품목', '품목코드', '판매단가', '용량', '상태', '비고'],
      datas: [],
      filterData: {
        year: "",
        month: "",
        category: "",
        item: "",
        start_date: "",
        end_date: ""
      },
      componentKey: 0,
      tooltip_msg: "",
      tableData: []
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
      this.getDataList()
    },
    componentKeyEvent (data) {
      this.componentKey = data
    },
    getDataList () {
      const url = this.filterData.category != "" 
        ? `http://localhost:8080/products?categoryCode=${this.filterData.category}` 
        : `http://localhost:8080/products`
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
