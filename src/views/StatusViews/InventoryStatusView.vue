<template>
  <body>
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
    :render="render"
    :isLoading="isLoading"/>
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
      isDataSet: 0,
      render: false,
      isLoading: true,
      filterData: {},
      categoryQuery: '',
      lastMonth: '',
      lastMonthStart: '',
      lastMonthEnd: '',
      thisMonth: '',
    }
  },
  watch: {
    isDataSet() {
      if (this.isDataSet == 6) {
        this.isLoading = false;
        this.render = true;
      }
    }
  },
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
      this.datas = [];
      this.render = false;
      this.isLoading = true;
      this.isDataSet = 0;
      try {
        await this.getLiveInventory();
        await this.getLastInventory();
        await this.getLiveInbound();
        await this.getLiveOutbound();
        await this.getLastInbound();
        await this.getLastOutbound();
      } catch (error) {
        console.log(error);
      }
    },
    // 이달 재고
    async getLiveInventory () {
      try {
        const url = `${process.env.VUE_APP_API}/live/inventory?${this.categoryQuery}`
        const res = await this.$axios.get(url)
        await res.data.forEach((data)=>{
          this.datas.push(
            {
              categoryName: data.categoryName,
              productName: data.productName,
              productCode: data.productCode,
              quantity: ['-', '-', '-', '-', '-', data.quantity]
            }
          )
        })
        this.isDataSet++
      } catch (error) {
        console.log(error);
      }
    },

    // 이달 입고
    async getLiveInbound () {
      try {
        const url = `${process.env.VUE_APP_API}/live/inbound?${this.categoryQuery}`
        const res = await this.$axios.get(url)
        await res.data.forEach((data)=>{
          for(let i=0; i<this.datas.length; i++) {
            if(this.datas[i].productCode === data.productCode) {
              this.datas[i].quantity[3] = data.quantity;
            }
          }
        })
        this.isDataSet++
      } catch (error) {
        console.log(error);
      }
    },

    // 이달 출고
    async getLiveOutbound () {
      try {
        const url = `${process.env.VUE_APP_API}/live/outbound?${this.categoryQuery}`
        const res = await this.$axios.get(url)
        await res.data.forEach((data)=>{
          for(let i=0; i<this.datas.length; i++) {
            if(this.datas[i].productCode === data.productCode) {
              this.datas[i].quantity[4] = data.quantity*(-1);
            }
          }
        })
        this.isDataSet++
      } catch (error) {
        console.log(error);
      }
    },

    // 전월 재고
    async getLastInventory () {
      try {
        const url = `${process.env.VUE_APP_API}/monthly/inventory?startDate=${this.lastMonthStart}&endDate=${this.lastMonthEnd}&${this.categoryQuery}`
        const res = await this.$axios.get(url)
        await res.data.forEach((data) => {
          const index = this.datas.findIndex((d) => d.productCode === data.productCode);
          if (index !== -1) {
            this.datas[index].quantity[2] = data.monthlyQuantityList[0].quantity;
          } else {
            this.datas.push({
              categoryName: data.categoryName,
              productName: data.productName,
              productCode: data.productCode,
              quantity: ['-', '-', data.monthlyQuantityList[0].quantity, '-', '-', '-']
            });
          }
        });
        this.isDataSet++
      } catch (error) {
        console.log(error);
      }
    },

    // 전월 입고
    async getLastInbound () {
      try {
        const url = `${process.env.VUE_APP_API}/monthly/inbound?startDate=${this.lastMonthStart}&endDate=${this.lastMonthEnd}&${this.categoryQuery}`
        const res = await this.$axios.get(url)
        await res.data.forEach((data)=>{
          for(let i=0; i<this.datas.length; i++) {
            if(this.datas[i].productCode === data.productCode) {
              this.datas[i].quantity[0] = data.monthlyQuantityList[0].quantity;
            }
          }
        })
        this.isDataSet++
      } catch (error) {
        console.log(error);
      }
    },
    // 전월 출고
    async getLastOutbound () {
      try {
        const url = `${process.env.VUE_APP_API}/monthly/outbound?startDate=${this.lastMonthStart}&endDate=${this.lastMonthEnd}&${this.categoryQuery}`
        const res = await this.$axios.get(url)
        await res.data.forEach((data)=>{
          for(let i=0; i<this.datas.length; i++) {
            if(this.datas[i].productCode === data.productCode) {
              this.datas[i].quantity[1] = data.monthlyQuantityList[0].quantity;
            }
          }
        })
        this.isDataSet++
      } catch(error) {
        console.log(error);
      }
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
