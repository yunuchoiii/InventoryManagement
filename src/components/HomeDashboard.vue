<template>
  <body style="padding-bottom: 2vh">
    <div style="font-size: 2.3rem; font-weight: 700;">
      <span style="color: #c41230">원샷솔브코리아 </span>
      <span>재고 관리 시스템</span>
    </div>

    <!-- 현황 메뉴 모음 -->
    <div>
      <div class="menu-divider">
        <div class="menu-divider-title" style="width: 55px">현황</div>
        <hr class="dashed-line">
      </div>
      <div class="flex">
        <a href="/status/inventory/" class="box-shadow menu-card btn-shadow mr-2per homebox">
          <div class="flex-center">
            <img src="@/assets/inventory_status_icon.png" alt="현 재고 현황" width="50px" height="50px">
          </div>
          <div class="flex-center menu-card-title">
            <span>현 재고 현황</span>
            <span class="menu-card-title2"><br>현재 재고 확인 및 조회</span>
          </div>
        </a>
        <a href="/status/months" class="box-shadow menu-card btn-shadow mr-2per homebox">
          <div class="flex-center">
            <img src="@/assets/month_status_icon.png" alt="월간 재고 현황" width="50px" height="50px">
          </div>
          <div class="flex-center menu-card-title">
            <span>월별 재고 현황</span>
            <span class="menu-card-title2"><br>월별 재고 확인 및 조회</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn-shadow mr-2per homebox">
          <div class="flex-center">
            <img src="@/assets/input_icon.png" alt="입고 현황" width="60px" height="60px">
          </div>
          <div class="flex-center menu-card-title">
            <span>입고 현황</span>
            <span class="menu-card-title2"><br>월별 입고량 확인 및 조회</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn-shadow homebox">
          <div class="flex-center">
            <img src="@/assets/output_icon.png" alt="출고 현황" width="60px" height="60px">
          </div>
          <div class="flex-center menu-card-title">
            <span>출고 현황</span>
            <span class="menu-card-title2"><br>월별 출고량 확인 및 조회</span>
          </div>
        </a>
      </div>
    </div>

    <!-- 리스트 메뉴 모음 -->
    <div>
      <div class="menu-divider">
        <div class="menu-divider-title" style="width: 80px">리스트</div>
        <hr class="dashed-line">
      </div>
      <div class="flex">
        <a href="/list/input/" class="box-shadow menu-card btn-shadow mr-2per homebox">
          <div class="flex-center">
            <img src="@/assets/input_list_icon.png" alt="입고 리스트" width="50px" height="50px">
          </div>
          <div class="flex-center menu-card-title">
            <span>입고 리스트</span>
            <span class="menu-card-title2"><br>입고 기록 조회 및 등록</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn-shadow mr-2per homebox">
          <div class="flex-center">
            <img src="@/assets/output_list_icon.png" alt="출고 리스트" width="50px" height="50px">
          </div>
          <div class="flex-center menu-card-title">
            <span>출고 리스트</span>
            <span class="menu-card-title2"><br>출고 기록 조회 및 등록</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn-shadow mr-2per homebox">
          <div class="flex-center">
            <img src="@/assets/item_list_icon.png" alt="상품 리스트" width="60px" height="60px">
          </div>
          <div class="flex-center menu-card-title">
            <span>상품 리스트</span>
            <span class="menu-card-title2"><br>상품 조회 및 등록</span>
          </div>
        </a>
      </div>
    </div>
    <div class="home-divider"></div>

    <!-- 각종 통계 모음 -->
    <div data-aos="fade-up">
      <div class="box-shadow homebox mb-22px">
        <div class="fw-700 homebox-titlebox homebox-title1">
          <span>{{this.today_year + '년 ' + this.today_month + '월 ' + this.today_date + '일'}}</span>
        </div>
        <div class="flex">
          <div class="flex numbox numbox-divider">
            <div class="flex-center numbox-txtbox">
              <p class="numbox-today1">총 재고</p>
              <p class="numbox-today2">240</p>
            </div>
            <div class="flex-center numbox-txtbox">
              <p class="numbox-yesterday1">어제 재고</p>
              <p class="numbox-yesterday2">235</p>
            </div>
          </div>
          <div class="flex numbox numbox-divider">
            <div class="flex-center numbox-txtbox">
              <p class="numbox-today1">입고</p>
              <p class="numbox-today2">3</p>
            </div>
            <div class="flex-center numbox-txtbox">
              <p class="numbox-yesterday1">어제 입고</p>
              <p class="numbox-yesterday2">6</p>
            </div>
          </div>
          <div class="flex numbox">
            <div class="flex-center numbox-txtbox">
              <p class="numbox-today1">출고</p>
              <p class="numbox-today2">18</p>
            </div>
            <div class="flex-center numbox-txtbox">
              <p class="numbox-yesterday1">어제 출고</p>
              <p class="numbox-yesterday2">21</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div data-aos="fade-up">
      <div class="flex-between mb-22px">
        <div class="box-shadow homebox homebox-w2">
          <div class="homebox-titlebox homebox-title1">재고 카테고리 비율</div>
          <div class="">
            <div style="height: 35vh; padding-bottom: 15px;">
              <ItemDoughnutChart
              :labels="this.itemChart.labels"
              :data="this.itemChart.data"
              :colors="this.itemChart.colors"/>
            </div>
          </div>
        </div>
        <div class="homebox-w2 flex-column">
          <div class="box-shadow homebox homebox-h3 flex-center-between">
            <div class="homebox-title1 flex-center">
              <img src="https://cdn-icons-png.flaticon.com/512/1670/1670341.png" alt="" class="home-icon">
              재고 금액
            </div>
            <div class="numbox-today2">
              12932원
            </div>
          </div>
          <div class="box-shadow homebox homebox-h3 flex-center-between">
            <div class="homebox-title1 flex-center">
              <img src="https://cdn-icons-png.flaticon.com/512/567/567600.png" alt="" class="home-icon">
              출고 금액
            </div>
            <div class="numbox-today2">
              12932원
            </div>
          </div>
          <div class="box-shadow homebox homebox-h3 flex-center-between">
            <div class="homebox-title1 flex-center">
              <img src="https://cdn-icons-png.flaticon.com/512/3712/3712196.png" alt="" class="home-icon">
              최다 판매
            </div>
            <div class="numbox-today2">
              세제
            </div>
          </div>
        </div>
      </div>
    </div>
    <div data-aos="fade-up">
      <div class="flex-between mb-22px">
        <div class="box-shadow homebox homebox-w2">
          <div class="homebox-titlebox">
            <span class="homebox-title1">월별 입고 현황</span>
            <span class="homebox-title2">최근 1년</span>
          </div>
          <div style="height: 35vh">
            <InputBarChart
            :labels="this.monthsList"
            :data="this.inputChart.data"/>
          </div>
        </div>
        <div class="box-shadow homebox homebox-w2">
          <div class="homebox-titlebox">
            <span class="homebox-title1">월별 출고 현황</span>
            <span class="homebox-title2">최근 1년</span>
          </div>
          <div style="height: 35vh">
            <OutputBarChart
            :labels="this.monthsList"
            :data="this.outputChart.data"/>
          </div>
        </div>
      </div>
    </div>
    <div data-aos="fade-up">
      <div class="box-shadow homebox mb-22px">
        <div class="homebox-titlebox">
            <span class="homebox-title1">연간 재고 현황</span>
            <span class="homebox-title2">최근 1년</span>
          </div>
          <div style="height: 35vh;">
          <AnnualLineChart
          :labels="this.monthsList"
          :data="this.annualChart.data"/>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
/* eslint-disable */
import AOS from 'aos';
import 'aos/dist/aos.css';
import InputBarChart from '@/components/ChartComponents/InputBarChart.vue'
import OutputBarChart from '@/components/ChartComponents/OutputBarChart.vue'
import AnnualLineChart from '@/components/ChartComponents/AnnualLineChart.vue'
import ItemDoughnutChart from '@/components/ChartComponents/ItemDoughnutChart.vue'

export default {
  name: 'HomeDashboard',
  components: {InputBarChart, OutputBarChart, AnnualLineChart, ItemDoughnutChart},
  data () {
    return {
      today_year: new Date().getFullYear(),
      today_month: new Date().getMonth()+1,
      today_date: new Date().getDate(),
      last_year: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getFullYear(),
      last_month: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getMonth()+1,
      monthsList: [],
      inputChart: {
        labels: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        data: [40, 20, 12, 43, 25, 64, 74, 24, 10,24,13,53],
      },
      outputChart: {
        labels: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        data: [13,22,45,24,36,14,12,52,32,13,35,72],
      },
      annualChart: {
        labels: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        data: [13,22,45,24,36,14,12,52,32,13,35,72],
      },
      itemChart: {
        labels: ['세제', '방향제', '말통', '광택제', '박스'],
        data: [13,22,45,24,36],
        colors: ['#c41230', '#fb7b00', '#F2BB05', '#47A8BD', '#3f5473']
      },
    }
  },
  setup () {},
  created () {
    AOS.init()
    this.getMonthsList()
  },
  mounted () {},
  unmounted () {},
  methods: {
    //일년치 월 리스트 구하기
    getMonthsList () {
      var month = new Date(new Date().setMonth(new Date().getMonth() + 1)).getMonth() == 0 ? 12 : new Date(new Date().setMonth(new Date().getMonth() + 1)).getMonth()
      this.monthsList.push(month + '월')
      for (var i=0; i < 11; i++) {
        if(month + 1 == 13) {
          month = 1
          this.monthsList.push(1 + '월')
        } else {
          month = month + 1
          this.monthsList.push(month + '월')
        }
      }
    }
  }
}
</script>
<style>
@import "@/styles/styles.css";

body {background-color: #f3f3f3;}
.home-icon {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
</style>
