<template>
  <body>
    <FilterBoxComponent
    @filterData="filterEvent"
    :register="true"
    :register_name="register_name"
    :title="title"
    :month_show="false"
    :year_show="false"
    :date_range="false"
    :tooltip_msg="tooltip_msg"/>
    <TableComponent
    @paging="pagingEvent"
    :title="title"
    :headers="headers"
    :datas="datas"
    :filterData="filterData"
    :register_name="register_name"
    :isEmpty="isEmpty"
    :isLoading="isLoading"/>
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
        categoryCode: "",
        start_date: "",
        end_date: ""
      },
      pageable : {
        page: 0,
        size: 1000,
        "sort": [
          "string"
        ]
      },
      tooltip_msg: "",
      tableData: [],
      isEmpty: false,
      isLoading: true,
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
      this.isEmpty = false
      this.pageable.page = 0
      this.datas = []
      this.getDataList()
    },
    pagingEvent () {
      this.pageable.page ++
      this.getDataList()
    },
    getDataList () {
      this.isLoading = true;
      const url = this.filterData.categoryCode != ""
        ? `${process.env.VUE_APP_API}/products?categoryCode=${this.filterData.categoryCode}` 
        : `${process.env.VUE_APP_API}/products`
      this.$axios.get(url, {
        params: {
          page:this.pageable.page,
          size:this.pageable.size
        },
      }).then((res) => {
        this.datas = res.data.content
        this.isLoading = false
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
