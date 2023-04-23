<template>
  <body class="body-padding">
    <FilterBoxComponent
    @filterData="filterEvent"
    @isLastStockClosed="closedEvent"
    :register="true"
    :register_name="register_name"
    :title="title"
    :month_show="true"
    :year_show="true"
    :close_show="true"
    :date_range="false"
    :handleMonth="handleMonth"
    :closedYear="closedYear"
    :closedMonth="closedMonth"/>
    <TableComponent
    @paging="pagingEvent"
    :title="title"
    :headers="headers"
    :datas="datas"
    :filterData="filterData"
    :register_name="register_name"
    :isEmpty="isEmpty"/>
    <div class="flex-center stockCloseAlertBox slide-in-blurred-bottom">
      <v-alert
      v-model="alertClose"
      close-text="Close Alert"
      color="#c41230"
      class="stockCloseAlert"
      style="background-color: white !important; "
      outlined
      dense
      dismissible
      @click="handleAlert()"
      >
        {{filterData.month-1 === 0 ? 12 : filterData.month-1}}월 입출고 등록을 마감해주세요
      </v-alert>
    </div>
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
      checkedMonths: [],
      alertClose: true,
      handleMonth: false,
      closedYear: null,
      closedMonth: null
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
    closedEvent (data) {
      this.alertClose = !data
    },
    handleAlert() {

    },
    pagingEvent () {
      this.pageable.page ++
      this.getDataList()
    },
    getDataList () {
      const url = `${process.env.VUE_APP_API}/inbound?${this.querys.join('&')}`
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
