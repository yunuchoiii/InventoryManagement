<template>
  <body class="body-padding">
    <FilterBoxComponent
    @filterData="filterEvent"
    :register="true"
    :register_name="register_name"
    :title="title"
    :month_show="true"
    :year_show="true"
    :close_show="true"
    :date_range="false"/>
    <TableComponent
    @paging="pagingEvent"
    :title="title"
    :headers="headers"
    :datas="datas"
    :filterData="filterData"
    :register_name="register_name"
    :isEmpty="isEmpty"/>
  </body>
</template>
<script>
/* eslint-disable */
import FilterBoxComponent from '@/components/FilterBoxComponent.vue'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'OutBoundList',
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
      categoryCode: "",
      startDate: "",
      endDate: "",
      pageable: {
        "page": 0,
        "size": 50,
        "sort": [
          "string"
        ]
      },
      querys: [],
      isEmpty: false
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
      this.querys = []
      if (localStorage.getItem("filterData") != null) {
        const localFilterData = JSON.parse(localStorage.getItem("filterData"));
        Object.keys(localFilterData).forEach(key => {
          if (localFilterData[key] != "") {
            this.querys.push(`${key}=${localFilterData[key]}`)
          }
        })
        localStorage.removeItem("filterData")
      } else {
        Object.keys(this.filterData).forEach(key => {
          if (this.filterData[key] != "") {
            this.querys.push(`${key}=${this.filterData[key]}`)
          }
        })        
      }
      this.getDataList()
    },
    pagingEvent () {
      this.pageable.page ++
      this.getDataList()
    },
    getDataList () {
      const url = `http://localhost:8080/outbound?${this.querys.join('&')}`
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
