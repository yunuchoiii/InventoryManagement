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
  name: 'InBoundList',
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
      querys: [],
      isEmpty: false,
      unclosedMonths: []
    }
  },
  watch: {},
  setup () {},
  created () {
    // this.checkClosedMonths()
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
      const url = `http://localhost:8080/inbound?${this.querys.join('&')}`
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
    },
    checkStockClosed (date) {
      this.$axios.get(`http://localhost:8080/closing/inventory/check/${date}`).then((res) => {
        console.log(res.data);
      }).catch((error) => {
        console.log(error);
      })
    },
    // 입출고 마감 확인
    checkClosedMonths () {
      let year = new Date().getFullYear();
      let month = new Date().getMonth();
      let lastDay = new Date(year, month, 0).getDate();
      let date = month < 10 ? 
        year + '-' + `0${month}` + '-' + lastDay : 
        year + '-' + month + '-' + lastDay;

      //TODO: 월별 체크
      let monthCheck = this.checkClosedMonths(date)
      // console.log(monthCheck)
    },
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
