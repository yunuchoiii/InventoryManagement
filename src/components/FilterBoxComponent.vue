<template>
  <v-app>
    <div class="title-box">
      <div class="flex-center" style="display: relative">
        <button @click="reload()"><span>{{title}}</span></button>
        <div v-if="this.register_name === '입고' || this.register_name === '출고' || this.register_name === '상품'" style="margin: 3px 0 0 10px; display: absolute;" class="flex-center">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="#a0a0a0"
                dark
                size="1.5rem"
                v-bind="attrs"
                v-on="on"
              >
                mdi-information-outline
              </v-icon>
            </template>
            <ul>
              <li>등록 버튼을 {{ register_name }} 항목을 등록할 수 있습니다.</li>
              <li v-if="this.register_name === '입고' || this.register_name === '출고'">표의 항목을 클릭하면 수정과 삭제가 가능합니다.</li>
              <li v-else>표의 항목을 클릭하면 상품 정보 수정이 가능합니다.</li>
              <li v-if="this.register_name === '입고' || this.register_name === '출고'">재고 마감이 완료된 상태에서는 입출고 등록 및 수정이 불가합니다.</li>
            </ul>
          </v-tooltip>
        </div>
      </div>

      <!-- 입출고, 상품 등록 팝업 -->
      <div v-if="register && !isLiveStockClosed" data-aos="fade-left">
        <RegisterDialog
        :register_name="register_name"/>
      </div>
    </div>

    <div class="filter-head">
      <div v-if="close_show && isLiveStockClosed" style="margin-right: 1rem; border-radius: 8px; overflow: hidden;">
        <v-btn
          elevation="0"
          height="40px"
          color="#808080"
          data-aos="zoom-in"
          @click="closeRegister()"
        >
          <span class="navBtnText">{{changedMonth}}월 마감 해제</span>
        </v-btn>
      </div>
      <div v-if="close_show && !isLiveStockClosed" style="margin-right: 1rem; border-radius: 8px; overflow: hidden;">
        <v-btn
          elevation="0"
          height="40px"
          color="#c41230"
          data-aos="zoom-in"
          @click="closeRegister()"
        >
          <span class="navBtnText">{{changedMonth}}월 재고 마감</span>
        </v-btn>
      </div>

      <!-- 재고 마감 모달창 -->
      <StockClosingDialog
        v-if="stockClosingDialog === true"
        @CloseDialog="CloseDialogEvent()"
        :year="this.selectedYear"
        :month="this.selectedMonth"
        :type="this.closeType"
        :filterData="filterData"
      />
      <div class="head-box box-shadow" style="flex: 1">
        <div style="display: flex; align-items: center; justify-content: flex-end; height: 5vh;">
          <v-btn
            icon
            color="#254359"
            @click="renewFilter()"
          >
            <v-icon>mdi-cached</v-icon>
          </v-btn>
          <span style="color: #254359; font-size: 1rem; font-weight: 700;">검색 초기화</span>
        </div>
        <div class="filter-box">
          <div v-if="year_show" class="filter-card">
            <div class="flex-center filter-text" style="margin-left: 8px">
              연도
            </div>
            <select v-model="selectedYear" class="filter-select">
              <option value="" disabled selected>Year</option>
              <option v-for="option in years" :value="option" :key="option">
                {{ option }}년
              </option>
            </select>
          </div>
          <div v-if="month_show" class="filter-card" style="margin-right: 20px;">
            <div class="flex-center filter-text">
              월별
            </div>
            <select v-model="selectedMonth" class="filter-select" @change="selectMonth()">
              <option value="" disabled selected>Month</option>
              <option v-for="option in months" :value="option" :key="option">
                {{ option }}월
              </option>
            </select>
          </div>
          <v-divider v-if="month_show || year_show || date_range"
            vertical
            style="margin: 0px 10px"
          ></v-divider>
          <div class="filter-card" style="margin-left: 8px;">
            <div class="flex-center filter-text">
              구분
            </div>
            <select v-model="selectedCategory" class="filter-select" @change="getProductsByCategory()">
              <option value="" disabled selected>Category</option>
              <option v-for="(option, idx) in categories" :value="option.key" :key="idx">
                {{ option.name }}
              </option>
            </select>
          </div>
          <div v-if="register_name == '입고' || register_name == '출고'"
            class="filter-card"
            style="margin-left: 8px;">
            <div class="flex-center filter-text">
              품목
            </div>
            <select v-model="selectedItem" class="filter-select">
              <option value="" disabled selected>Product</option>
              <option v-for="(option, idx) in itemsObjects" :value="option.id" :key="idx">
                {{ option.productName }}
              </option>
            </select>
          </div>
          <div>
            <v-btn
              elevation="0"
              height="30px"
              width="50px"
              color="#254359"
              @click="submitFilter()"
            >
              <span class="navBtnText">조회</span>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
/* eslint-disable */
import RegisterDialog from "@/components/DialogComponents/RegisterDialogComponent.vue"
import StockClosingDialog from "@/components/DialogComponents/StockClosingDialogComponent.vue"
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "FilterBoxComponent",
  components: {RegisterDialog, StockClosingDialog},
  props: {
    title: {
      type: String,
      required: true
    },
    year_show: {
      type: Boolean,
      default: true
    },
    month_show: {
      type: Boolean,
      default: true
    },
    close_show: {
      type: Boolean,
    },
    date_range: {
      type: Boolean,
      default: false
    },
    register: {
      type: Boolean,
      default: false
    },
    register_name: {
      type: String
    },
    tooltip_msg: {
      type: String,
      default: ""
    },
  },
  data () {
    return {
      selectedYear: "",
      years: [],
      selectedMonth: "",
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      startDate: "",
      endDate: "",
      lastEndDate: "",
      selectedCategory: "",
      categories: [],
      selectedItem: "",
      itemsObjects: [],
      items: [],
      last_month: new Date().getMonth(),
      calendarData: {
        dateRange : {
          start: "",
          end: ""
        }
      },
      changedMonth: "",
      filterData: {},
      isLiveStockClosed: null,
      isLastStockClosed: null,
      stockClosingDialog: false,
      closeType:"",
    }
  },
  watch: {
    isLastStockClosed () {
      this.submitClosed()
    }
  },
  setup () {},
  created () {
    if (localStorage.getItem("filterData") != null) {
      const localFilterData = JSON.parse(localStorage.getItem("filterData"));
      this.selectedYear = localFilterData.year
      this.selectedMonth = localFilterData.month
      this.changedMonth = localFilterData.month
    } else {
      if (this.register_name != null) {
        this.selectedYear = new Date().getFullYear()
        this.selectedMonth = new Date().getMonth() + 1
        this.changedMonth = new Date().getMonth() + 1           
      }
    }
    this.selectMonth()
    this.getCategories()
    this.addYearsList()
    this.submitFilter()
  },
  mounted () {
    AOS.init()
  },
  unmounted () {},
  methods: {
    // 카테고리 목록 가져오기
    getCategories () {
      const url = `${process.env.VUE_APP_API}/categories`;
      this.$axios.get(url, {
        params: {},
      }).then((res) => {
        this.categories = res.data
      }).catch((error) => {
        console.log(error);
      })
    },
    // 카테고리별 품목 리스트 구하기
    getProductsByCategory () {
      this.itemsObjects = [
        {productName: '불러오는 중...'}
      ]
      this.$axios.get(`${process.env.VUE_APP_API}/products?categoryCode=${this.selectedCategory}&size=1000`).then((res) => {
        this.itemsObjects = res.data.content
      }).catch((error) => {
        console.log(error);
      })
    },
    // 연도 셀렉트박스 올해까지 추가
    addYearsList () {
      let thisYear = new Date().getFullYear() 
      for (var i=2019; i<=thisYear; i++) {
        this.years.push(i)
      }
    },
    // 월 선택하면 기간 설정
    selectMonth ( ) {
      const firstDay = "01"
      const lastDay = new Date(this.selectedYear, this.selectedMonth, 0).getDate()
      const month = this.selectedMonth < 10 ? "0" + this.selectedMonth : this.selectedMonth
      this.startDate = this.selectedYear + "-" + month + "-" + firstDay
      this.endDate = this.selectedYear + "-" + month + "-" + lastDay
    },
    // 입출고 등록 마감
    closeRegister () {
      this.stockClosingDialog = true
    },
    // 입출고 마감 확인
    checkStockClosed (date) {
      this.$axios.get(`${process.env.VUE_APP_API}/closing/inventory/check/${date||this.endDate}`).then((res) => {
        if (date) {
          this.isLastStockClosed = res.data;
        } else {
          this.isLiveStockClosed = res.data;
          if(res.data === true) {
            this.closeType = "마감 해제"
          } else if (res.data === false) {
            this.closeType = "마감"
          }  
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    CloseDialogEvent(data){
      this.stockClosingDialog = data
    },
    checkClosedHandler () {
      if (this.register_name) {
        this.checkStockClosed()

        // 현재일 기준 지난달 마감 여부 확인
        const year = new Date().getFullYear()
        const month = (new Date().getMonth()) < 10 
              ? "0" + (new Date().getMonth()) 
              : (new Date().getMonth()) === 0 
                  ? '12' 
                  : (new Date().getMonth());
        const lastDay = new Date(year, month, 0).getDate()
        this.lastEndDate = year + "-" + month + "-" + lastDay
        this.checkStockClosed(this.lastEndDate);
      } 
    },
    // 조회버튼 클릭
    submitFilter (year, month) {
      this. checkClosedHandler()

      this.changedMonth = this.selectedMonth
      
      this.filterData = {
        year: year || this.selectedYear,
        month: month || this.selectedMonth,
        categoryCode: this.selectedCategory,
        productId: this.selectedItem,
        startDate: this.startDate,
        endDate: this.endDate,
      }
      this.$emit("filterData", this.filterData)
    },
    // 전월 마감 여부 확인 및 전송
    submitClosed () {
      this.$emit("isLastStockClosed", this.isLastStockClosed)
    },
    // 10 이하면 앞에 0 붙이는 이벤트
    modifyDate () {
      const start_arr = this.calendarData.dateRange.start.split("-")
      const end_arr = this.calendarData.dateRange.end.split("-")

      for (var i=0; i<3; i++) {
        if (start_arr[i].length === 1) {
          start_arr[i] = "0" + start_arr[i]
          this.calendarData.dateRange.start = start_arr[0] + "-" + start_arr[1] + "-" + start_arr[2]
        } else {
          // pass
        }

        if (end_arr[i].length === 1) {
          end_arr[i] = "0" + end_arr[i]
          this.calendarData.dateRange.end = end_arr[0] + "-" + end_arr[1] + "-" + end_arr[2]
        } else {
          // pass
        }        
      }
    },
    // 조회 조건 초기화
    renewFilter () {
      if (this.register_name == '입고' || this.register_name == '출고') {
        this.selectedYear = new Date().getFullYear()
        this.selectedMonth = new Date().getMonth() + 1        
      } else {
        this.selectedYear = ''
        this.selectedMonth = ''
      }
      this.selectedCategory = ""
      this.selectedItem = ""
      this.calendarData = {
        dateRange : {
          start: "",
          end: ""
        }
      }
    },
    reload () {
      location.reload()
    },
  }
}
</script>
<style>
/* eslint-disable */
@import "@/styles/styles.css";
.v-application--wrap {
  min-height: 0vh !important;
}
.theme--light.v-application {
  background: transparent;
}
.v-dialog {
  box-shadow: none !important;
}
.vfc-calendar .vfc-content {
  font-family: Pretendard, -apple-system, "Noto Sans KR", BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.vfc-multiple-input input:first-child, .vfc-multiple-input input:last-child {
  margin-left: 10px;
  height: 4vh;
  border-radius: 5px;
  text-align: center;
  background-color: #f0f0f0;
  width: 10vw;
  color: #757575;
  font-weight: 500;
}
.filter-select {
  color: #757575
}
</style>
