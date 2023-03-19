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
    :monthData="monthData"
    :filterData="filterData"
    :componentKey="componentKey"/>
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
      title: '월간 재고 현황',
      clicked: false,
      headers: ['구분', '품목', '품목코드',],
      datas: [],
      monthData: [],
      filterData: {},
      querys: [],
      componentKey: 0,
      monthLabel: []
    }
  },
  watch: {},
  setup () {},
  created () {
    this.getMonthsList()
    this.getLastYearMonths()
  },
  mounted () {},
  unmounted () {},
  methods: {
    filterEvent (data) {
      this.filterData = data;
      this.querys = [];
      if (data.year != "") {
        const startDate = data.year + '-01-01';
        const endDate = data.year + '-12-01';
        this.querys.push(`startDate=${startDate}`);
        this.querys.push(`endDate=${endDate}`);
      }
      if (data.categoryCode != "") {
        this.querys.push(`categoryCode=${data.categoryCode}`);
      }
      this.getDataList()
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
      const url = `http://localhost:8080/monthly/inventory?${this.querys.join('&')}`
      this.$axios.get(url).then((res) => {
        this.datas = res.data
        console.log(this.datas)
        // 월별 데이터 배열로 만들기
        for(let i=0; i<res.data.length; i++) {
          let monthlyDataList = res.data[i].monthlyQuantityList
          let dataArr = [];
          for(let a=0; a<this.monthLabel.length; a++) {
            const month = monthlyDataList.find(d => d.month == this.monthLabel[a]);
            if (month) {
              dataArr.push(month.quantity)
            } else {
              dataArr.push("-")
            }
          }
          this.monthData.push(dataArr)
        }
        // console.log(this.monthData)
      }).catch((error) => {
        console.log(error);
      })
    },
    getLastYearMonths () {
      const lastYearMonths = [];
        const today = new Date();
        for (let i = 11; i >= 0; i--) {
          const lastYearMonth = new Date(today.getFullYear(), today.getMonth() - i);
          lastYearMonths.push(lastYearMonth.getFullYear() * 100 + lastYearMonth.getMonth());
        }
      this.monthLabel = lastYearMonths;
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
