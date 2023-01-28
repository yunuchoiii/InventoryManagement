<template>
  <v-app>
    <div class="title-box">
      <div class="flex-center">
        <button @click="reload()"><span>{{title}}</span></button>
      </div>
      <!-- 입출고, 상품 등록 팝업 -->
      <div v-if="register" data-aos="fade-left">
        <RegisterDialog
        :register_name="register_name"
        :categories="categories"/>
      </div>
    </div>
    <div class="filter-head">
      <div v-if="register_name == '입고' || register_name == '출고'" style="margin-right: 2vh; border-radius: 8px; overflow: hidden;">
        <v-btn
          elevation="0"
          height="5.4vh"
          color="#c41230"
          data-aos="zoom-in"
          @click="closeRegister()"
        >
          <span class="navBtnText">{{last_month == 0 ? 12 : last_month}}월  {{register_name}} 마감</span>
        </v-btn>
      </div>
      <div class="head-box box-shadow" style="flex: 1">
        <div style="display: flex; align-items: center; justify-content: flex-end; height: 5vh;">
          <v-btn
            icon
            color="#254359"
            @click="emitReRender()"
          >
            <v-icon>mdi-cached</v-icon>
          </v-btn>
          <span style="color: #254359; font-size: 2vh; font-weight: 700;">초기화</span>
        </div>
        <div class="filter-box">
          <div v-if="date_range" class="filter-card">
            <div class="flex-center filter-text" style="margin-left: 8px">
              기간
              <FunctionalCalendar
                v-model="calendarData"
                :configs="calendarConfigs"
              ></FunctionalCalendar>
            </div>
          </div>
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
            <select v-model="selectedMonth" class="filter-select">
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
            <select v-model="selectedCategory" class="filter-select" @change="getCategoryProducts()">
              <option value="" disabled selected>Category</option>
              <option v-for="option in categories" :value="option" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
          <div>
            <v-btn
              elevation="0"
              height="4vh"
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
import RegisterDialog from '@/components/DialogComponents/RegisterDialogComponent.vue'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FunctionalCalendar } from 'vue-functional-calendar';

export default {
  name: 'FilterBoxComponent',
  components: {RegisterDialog, FunctionalCalendar},
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
      default: ''
    }
  },
  data () {
    return {
      selectedYear: new Date().getFullYear(),
      years: [],
      selectedMonth: '',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      selectedCategory: '',
      categories: [],
      last_month: new Date().getMonth(),
      calendarData: {
        dateRange : {
          start: "",
          end: ""
        }
      },
      calendarConfigs: {
          sundayStart: true,
          dateFormat: 'yyyy-mm-dd',
          isDatePicker: false,
          isDateRange: true,
          isModal: true,
          placeholder: 'Date',
          dayNames: ['월', '화', '수', '목', '금', '토', '일'],
          monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
      },
      filterData: {},
      componentKey: 0
    }
  },
  watch: {},
  setup () {},
  created () {
    this.selectedYear = new Date().getFullYear()
    this.getCategories()
    this.addYearsList()
  },
  mounted () {
    AOS.init()
  },
  unmounted () {},
  methods: {
    // 카테고리 목록 가져오기
    getCategories () {
      const arr = [];
      const url = '/categories';
      this.$axios.get(url, {
        params: {},
      }).then((res) => {
        res.data.forEach(function(number) {
          arr.push(number.name)
        })
        this.categories = arr
      }).catch((error) => {
        console.log(error);
      })
    },
    // 카테고리별 품목 리스트 가져오기
    getCategoryProducts () {
      console.log(this.selectedCategory)
    },
    // 연도 셀렉트박스 올해까지 추가
    addYearsList () {
      let thisYear = new Date().getFullYear() 
      for (var i=2019; i<=thisYear; i++) {
        this.years.push(i)
      }
    },
    // 입출고 등록 마감
    closeRegister () {
      if (confirm(this.last_month + '월 ' + this.register_name + ' 등록을 마감하시겠습니까?')) {
        alert(this.last_month + '월 ' + this.register_name + ' 등록이 마감되었습니다.')
      } else {
        //pass
      }
    },
    // 조회버튼 클릭
    submitFilter () {
      if (this.calendarData.dateRange.start != "") {
        this.modifyDate()
        this.emitFilter()        
      } else {
        this.emitFilter()      
      }
    },
    // 10 이하면 앞에 0 붙이는 이벤트
    modifyDate () {
      const start_arr = this.calendarData.dateRange.start.split('-')
      const end_arr = this.calendarData.dateRange.end.split('-')

      for (var i=0; i<3; i++) {
        if (start_arr[i] < 10) {
          start_arr[i] = '0' + start_arr[i]
          this.calendarData.dateRange.start = start_arr[0] + '-' + start_arr[1] + '-' + start_arr[2]
        } else {
          // pass
        }

        if (end_arr[i] < 10) {
          end_arr[i] = '0' + end_arr[i]
          this.calendarData.dateRange.end = end_arr[0] + '-' + end_arr[1] + '-' + end_arr[2]
        } else {
          // pass
        }        
      }
    },
    // 테이블 컴포넌트로 조회 항목 보내기
    emitFilter () {
      this.filterData = {
        year: this.selectedYear,
        month: this.selectedMonth,
        category: this.selectedCategory,
        item: this.selectedItem,
        start_date: this.calendarData.dateRange.start,
        end_date: this.calendarData.dateRange.end
      }
      this.$emit('filterData', this.filterData)
    },
    // 조회 조건 초기화
    emitReRender () {
      this.selectedYear = new Date().getFullYear()
      this.selectedMonth = ''
      this.selectedCategory = ''
      this.selectedItem = ''
      this.calendarData = {
        dateRange : {
          start: "",
          end: ""
        }
      }

      this.componentKey += 1
      this.$emit('componentKey', this.componentKey)
    },
    reload () {
      location.reload()
    },
  }
}
</script>
<style>
/* eslint-disable */
@import '@/styles/styles.css';
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
  font-family: Pretendard, -apple-system, 'Noto Sans KR', BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
