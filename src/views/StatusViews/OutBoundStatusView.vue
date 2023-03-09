<template>
  <body class="body-padding">
    <FilterBoxComponent
    @filterData="filterEvent"
    @componentKey="componentKeyEvent"
    :month_show="false"
    :title="title"/>
    <TableComponent
    :title="title"
    :headers="headers"
    :datas="datas"
    :filterData="filterData"
    :componentKey="componentKey"/>
    {{ datas }}
  </body>
</template>
<script>
/* eslint-disable */
import FilterBoxComponent from '@/components/FilterBoxComponent.vue'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'MonthStatus',
  components: {FilterBoxComponent, TableComponent},
  props: {},
  data () {
    return {
      title: '월간 출고 현황',
      clicked: false,
      headers: ['구분', '품목', '품목코드',],
      datas: [],
      filterData: {},
      componentKey: 0
    }
  },
  watch: {},
  setup () {},
  created () {
    this.getMonthsList()
    this.getDataList()
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
    //일년치 월 리스트 구하기
    getMonthsList () {
      let month = new Date(new Date().setMonth(new Date().getMonth() + 1)).getMonth() == 0 ? 12 : new Date(new Date().setMonth(new Date().getMonth() + 1)).getMonth()
      this.headers.push(month + '월')
      for (var i=0; i < 11; i++) {
        if(month + 1 == 13) {
          month = 1
          this.headers.push(1 + '월')
        } else {
          month = month + 1
          this.headers.push(month + '월')
        }
      }
    },
    getDataList () {
      const url = `http://localhost:8080/monthly/outbound`
      this.$axios.get(url).then((res) => {
        this.datas = res.data
        console.log(this.datas)
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
