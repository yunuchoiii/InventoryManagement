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
    @paging="pagingEvent"
    :title="title"
    :headers="headers"
    :datas="datas"
    :filterData="filterData"
    :componentKey="componentKey"
    :register_name="register_name"
    :isEmpty="isEmpty"/>
  </body>
</template>
<script>
/* eslint-disable */
import FilterBoxComponent from '@/components/FilterBoxComponent.vue'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'warehousingList',
  components: {FilterBoxComponent, TableComponent},
  props: {},
  data () {
    return {
      title: '입고 내역',
      register_name: '입고',
      clicked: false,
      headers: ['순번', '구분', '품목', '품목코드', '입고날짜', '입고량', '비고'],
      datas: [],
      filterData: {},
      pageable: {
        "page": 0,
        "size": 50,
        "sort": [
          "string"
        ]
      },
      componentKey: 0,
      querys: [],
      isEmpty: false
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
      this.isEmpty = false
      this.pageable.page = 0
      this.datas = []
      this.querys = []
      Object.keys(this.filterData).forEach(key => {
        if (this.filterData[key] != "") {
          this.querys.push(`${key}=${this.filterData[key]}`)
        }
      })
      this.getDataList()
    },
    componentKeyEvent (data) {
      this.componentKey = data
    },
    pagingEvent () {
      this.pageable.page ++
      this.getDataList()
    },
    getDataList () {
      const url = `http://localhost:8080/in-stock?${this.querys.join('&')}`
      this.$axios.get(url, {
        params: {
          page:this.pageable.page,
          size:this.pageable.size
        },
      }).then((res) => {
        res.data.content.forEach(element => {
          this.datas.push(element)
        });
        if (res.data.content.length < 50) {
          this.isEmpty = true
        }
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
