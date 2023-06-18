<template>
  <body>
    <FilterBoxComponent
    @filterData="filterEvent"
    :month_show="false"
    :title="title"/>
    <TableComponent
    :title="title"
    :headers="headers"
    :datas="datas"
    :monthData="monthData"
    :filterData="filterData"
    :isLoading="isLoading"/>
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
      headers: ['순번', '구분', '품목', '품목코드',],
      datas: [],
      monthData: [],
      filterData: {},
      querys: [],
      monthLabel: [],
      isLoading: true
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
        const endDate = data.year + '-12-31';
        this.querys.push(`startDate=${startDate}`);
        this.querys.push(`endDate=${endDate}`);
        this.headers = ['순번', '구분', '품목', '품목코드', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        this.getLastYearMonths(data.year)
      }
      if (data.categoryCode != "") {
        this.querys.push(`categoryCode=${data.categoryCode}`);
      }
      this.getDataList()
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
      this.monthData = [];
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/monthly/outbound?${this.querys.join('&')}`
      this.$axios.get(url).then((res) => {
        this.datas = res.data
        // 월별 데이터 배열로 만들기
        for(let i=0; i<res.data.length; i++) {
          let monthlyDataList = res.data[i]['monthlyQuantityList']
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
        this.isLoading = false;
      }).catch((error) => {
        console.log(error);
      })
    },
    // 지난 1년 연월 구하기
    getLastYearMonths (year) {
      if (year == null) {
        const lastYearMonths = [];
          const today = new Date();
          for (let i = 11; i >= 0; i--) {
            const lastYearMonth = new Date(today.getFullYear(), today.getMonth() - i);
            if (lastYearMonth.getMonth() === 0) {
              lastYearMonths.push((lastYearMonth.getFullYear()-1) * 100 + 12);
            } else {
              lastYearMonths.push(lastYearMonth.getFullYear() * 100 + lastYearMonth.getMonth());
            }
          }
        this.monthLabel = lastYearMonths;        
      } else {
        const lastYearMonths = [];
          for (let i = 1; i <= 12; i++) {
            const date = i<10 ? `${year}0${i}` : `${year}${i}`
            lastYearMonths.push(date);
          }
        this.monthLabel = lastYearMonths;   
      }
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
