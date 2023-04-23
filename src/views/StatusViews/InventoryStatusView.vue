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
    :filterData="filterData"
    :render="render"/>
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
      headers: ['순번', '구분', '품목', '품목코드', '전월 입고', '전월 출고', '전월 재고', '이달 입고', '이달 출고', '이달 재고'],
      datas: [],
      render: false,
      filterData: {},
      categoryQuery: '',
      lastMonth: '',
      lastMonthStart: '',
      lastMonthEnd: '',
      thisMonth: '',
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
      this.filterData = data;
      if (data.categoryCode != "") {
        this.categoryQuery = `categoryCode=${data.categoryCode}`;
      }
      this.getDataSet()
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
      this.lastMonth = `${prevYear}-${prevMonth < 10 ? '0' : ''}${prevMonth}`;
      this.lastMonthStart = `${prevYear}-${prevMonth < 10 ? '0' : ''}${prevMonth}-01`;
      this.lastMonthEnd = `${prevYear}-${prevMonth < 10 ? '0' : ''}${prevMonth}-${new Date(prevYear, prevMonth, 0).getDate()}`;
    },
    async getDataSet() {
      this.render = false;
      this.datas = [];
      try {
        await this.getLiveInventory();
        await this.getlastInventory();
        await this.getLiveInbound();
        await this.getLiveOutbound();
        await this.getLastInbound();
        await this.getLastOutbound();
      } catch (error) {
        console.log(error);
      }
    },
    // 이달 재고
    getLiveInventory () {
      const url = `${process.env.VUE_APP_API}/live/inventory?${this.categoryQuery}`
      this.$axios.get(url).then((res) => {
        res.data.forEach((data)=>{
          this.datas.push(
            {
              categoryName: data.categoryName,
              productName: data.productName,
              productCode: data.productCode,
              quantity: [0, 0, 0, 0, 0, data.quantity]
            }
          )
        })
      }).catch((error) => {
        console.log(error);
      })
    },
    // 이달 입고
    getLiveInbound () {
      const url = `${process.env.VUE_APP_API}/live/inbound?${this.categoryQuery}`
      this.$axios.get(url).then((res) => {
        res.data.forEach((data)=>{
          for(let i=0; i<this.datas.length; i++) {
            if(this.datas[i].productCode === data.productCode) {
              this.datas[i].quantity[3] = data.quantity;
            }
          }
        })
      }).catch((error) => {
        console.log(error);
      })
    },
    // 이달 출고
    getLiveOutbound () {
      const url = `${process.env.VUE_APP_API}/live/outbound?${this.categoryQuery}`
      this.$axios.get(url).then((res) => {
        res.data.forEach((data)=>{
          for(let i=0; i<this.datas.length; i++) {
            if(this.datas[i].productCode === data.productCode) {
              this.datas[i].quantity[4] = data.quantity*(-1);
            }
          }
        })
      }).catch((error) => {
        console.log(error);
      })
    },
    // 전월 재고
    getlastInventory () {
      const url = `${process.env.VUE_APP_API}/monthly/inventory?startDate=${this.lastMonthStart}&endDate=${this.lastMonthEnd}&${this.categoryQuery}`
      this.$axios.get(url).then((res) => {
        res.data.forEach((data) => {
          const index = this.datas.findIndex((d) => d.productCode === data.productCode);
          if (index !== -1) {
            this.datas[index].quantity[2] = data.monthlyQuantityList[0].quantity;
          } else {
            this.datas.push({
              categoryName: data.categoryName,
              productName: data.productName,
              productCode: data.productCode,
              quantity: [0, 0, data.monthlyQuantityList[0].quantity, 0, 0, 0]
            });
          }
        });
      }).catch((error) => {
        console.log(error);
      })
    },
    // 전월 입고
    getLastInbound () {
      const url = `${process.env.VUE_APP_API}/monthly/inbound?startDate=${this.lastMonthStart}&endDate=${this.lastMonthEnd}&${this.categoryQuery}`
      this.$axios.get(url).then((res) => {
        res.data.forEach((data)=>{
          for(let i=0; i<this.datas.length; i++) {
            if(this.datas[i].productCode === data.productCode) {
              this.datas[i].quantity[0] = data.monthlyQuantityList[0].quantity;
            }
          }
        })
      }).catch((error) => {
        console.log(error);
      })
    },
    // 전월 입고
    getLastOutbound () {
      const url = `${process.env.VUE_APP_API}/monthly/outbound?startDate=${this.lastMonthStart}&endDate=${this.lastMonthEnd}&${this.categoryQuery}`
      this.$axios.get(url).then((res) => {
        res.data.forEach((data)=>{
          for(let i=0; i<this.datas.length; i++) {
            if(this.datas[i].productCode === data.productCode) {
              this.datas[i].quantity[1] = data.monthlyQuantityList[0].quantity;
            }
          }
        })
        setTimeout(()=>{
          this.render = true
        }, 120)
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
