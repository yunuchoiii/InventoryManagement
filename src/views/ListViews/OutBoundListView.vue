<template>
  <body>
    <FilterBoxComponent
    @filterData="filterEvent"
    @isLastStockClosed="closedEvent"
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
    :isEmpty="isEmpty"
    :isLoading="isLoading"/>
    <div class="flex-center stockCloseAlertBox">
      <v-alert
        v-model="alertClose"
        ref="alertClose"
        close-text="Close Alert"
        color="#c41230"
        class="stockCloseAlert box-shadow"
        style="background-color: white !important; "
        outlined
        dense
      >
        <span @click="handleAlert()">
          {{new Date().getMonth() === 0 ? 12 : new Date().getMonth()}}월 입출고 등록을 마감해주세요
        </span>
        <v-btn
          fab
          dark
          x-small
          color="#c41230"
          elevation="0"
          @click="closeAlert()"
        >
          <v-icon dark>
            mdi-close
          </v-icon>
        </v-btn>
      </v-alert>
    </div>
    <StockClosingDialogComponent
      v-if="stockClosingDialog === true"
      @CloseDialog="CloseDialogEvent()"
      :year="this.closedYear"
      :month="this.closedMonth"
      :type="this.closeType"
      :filterData="this.filterData"
    />
  </body>
</template>
<script>
/* eslint-disable */
import StockClosingDialogComponent from '@/components/DialogComponents/StockClosingDialogComponent.vue'
import FilterBoxComponent from '@/components/FilterBoxComponent.vue'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'OutBoundList',
  components: { FilterBoxComponent, TableComponent, StockClosingDialogComponent },
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
      isEmpty: false,
      alertClose: false,
      closedYear: null,
      closedMonth: null,
      closeType: "마감",
      stockClosingDialog: false,
      isLoading: true
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
      this.alertClose = !data;
      this.$refs['alertClose'].$el.classList.add("slide-in-blurred-bottom");
    },
    handleAlert() {
      this.closedMonth = new Date().getMonth() === 0 ? 12 : new Date().getMonth()
      this.closedYear = new Date().getMonth() === 0 ? new Date().getFullYear()-1 : new Date().getFullYear()
      this.stockClosingDialog = true
    },
    CloseDialogEvent(data){
      this.stockClosingDialog = data
    },
    closeAlert() {
      this.$refs['alertClose'].$el.classList.add("slide-out-bottom")
    },
    pagingEvent () {
      this.pageable.page ++
      this.getDataList()
    },
    getDataList () {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/outbound?${this.querys.join('&')}`
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
        this.isLoading = false;
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
.v-alert__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.v-btn--fab.v-size--x-small {
  height: 28px;
  width: 28px;
}
</style>
