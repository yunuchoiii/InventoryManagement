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
    :key="componentKey"
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
      filterData: {},
      componentKey: 0,
      tooltip_msg: "",
      tableData: []
    }
  },
  watch: {},
  setup () {},
  created () {
    this.getProductData()
  },
  mounted () {},
  unmounted () {},
  methods: {
    filterEvent (data) {
      this.filterData = data
    },
    componentKeyEvent (data) {
      this.componentKey = data
    },
    getProductData () {
      const url = '/products';
      this.$axios.get(url, {
        params: {},
      }).then((res) => {
        console.log(res.data);
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
