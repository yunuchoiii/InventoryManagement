<template>
  <body class="body-padding">
    <FilterBoxComponent
    @filterData="filterEvent"
    :title="title"
    :year_show="false"
    :month_show="false" />
    <TableComponent
    :title="title"
    :headers="headers"
    :datas="datas"
    :filterData="filterData"/>
  </body>
</template>
<script>
/* eslint-disable */
import FilterBoxComponent from '@/components/FilterBoxComponent.vue'
import TableComponent from '@/components/TableComponent.vue'
export default {
  name: 'InventoryStatus',
  components: {FilterBoxComponent, TableComponent},
  props: {},
  data () {
    return {
      title: '현 재고 현황',
      headers: ['구분', '품목', '품목코드', '전월 입고', '전월 출고', '전월 재고', '이달 입고', '이달 출고', '이달 재고'],
      datas: [],
      dataSet: [this.lastInBound, this.lastOutBound, this.lastInventory, this.thisInBound, this.thisOutBound, this.thisInventory],
      filterData: {},
      lastMonth: '',
      thisMonth: '',
      lastInBound: 0,
      lastOutBound: 0,
      lastInventory: 0,
      thisInBound: 0,
      thisOutBound: 0,
      thisInventory: 0,
    }
  },
  watch: {},
  setup () {},
  created () {
    this.getMonths();
  },
  mounted () {},
  unmounted () {},
  methods: {
    filterEvent (data) {
      this.filterData = data
    },
    // 전월, 이달 연월 구하기
    getMonths () {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      let prevMonth = currentMonth - 1;
      let prevYear = currentYear;
      if (prevMonth === 0) {
        prevMonth = 12;
        prevYear = currentYear - 1;
      }
      this.thisMonth = `${currentYear}${currentMonth < 10 ? '0' : ''}${currentMonth}`;
      this.lastMonth = `${prevYear}${prevMonth < 10 ? '0' : ''}${prevMonth}`;
      this.getDataSet();
    },
    getDataSet() {
      this.getLastInventory();
    },
    // 전월 입고
    getLastInventory (url) {
      url = `http://localhost:8080/monthly/inventory`
      this.$axios.get(url).then((res) => {
        console.log(res.data)
        for (let i=0; i<res.data.length; i++) {
          const data = res.data[i]
          console.log(data.monthlyQuantityList)
        } 
      }).catch((error) => {
        console.log(error);
      })
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
