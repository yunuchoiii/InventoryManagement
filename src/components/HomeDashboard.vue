<template>
  <body style="padding-bottom: 2vh">
    <v-app>
      <div style="font-size: 2.3rem; font-weight: 700; padding-top: 25px;">
        <span style="color: #c41230">원샷솔브코리아 </span>
        <span>재고 관리 시스템</span>
      </div>

      <!-- 현황 메뉴 모음 -->
      <div>
        <div class="menu-divider">
          <div class="menu-divider-title">현황</div>
          <hr class="dashed-line">
        </div>
        <div class="d-flex" data-aos="zoom-in" style="flex-wrap: wrap;">
          <a href="/status/inventory" class="menu-card mr-2per homebox">
            <div class="flex-center">
              <img src="@/assets/inventory_status_icon.png" alt="현 재고 현황" width="50px" height="50px">
            </div>
            <div class="flex-center menu-card-title">
              <span>현 재고 현황</span>
              <span class="menu-card-title2"><br>현재 재고 확인 및 조회</span>
            </div>
          </a>
          <a href="/status/monthly" class="menu-card mr-2per homebox">
            <div class="flex-center">
              <img src="@/assets/month_status_icon.png" alt="월간 재고 현황" width="50px" height="50px">
            </div>
            <div class="flex-center menu-card-title">
              <span>월간 재고 현황</span>
              <span class="menu-card-title2"><br>월별 재고 확인 및 조회</span>
            </div>
          </a>
          <a href="/status/inbound" class="menu-card mr-2per homebox" style="padding-left: 10px">
            <div class="flex-center">
              <img src="@/assets/input_icon.png" alt="입고 현황" width="60px" height="60px">
            </div>
            <div class="flex-center menu-card-title">
              <span>월간 입고 현황</span>
              <span class="menu-card-title2"><br>월별 입고량 확인 및 조회</span>
            </div>
          </a>
          <a href="/status/outbound" class="menu-card homebox" style="padding-left: 10px">
            <div class="flex-center">
              <img src="@/assets/output_icon.png" alt="출고 현황" width="60px" height="60px">
            </div>
            <div class="flex-center menu-card-title">
              <span>월간 출고 현황</span>
              <span class="menu-card-title2"><br>월별 출고량 확인 및 조회</span>
            </div>
          </a>
        </div>
      </div>

      <!-- 리스트 메뉴 모음 -->
      <div>
        <div class="menu-divider">
          <div class="menu-divider-title">리스트</div>
          <hr class="dashed-line">
        </div>
        <div class="d-flex" data-aos="zoom-in" style="flex-wrap: wrap;">
          <a href="/list/inbound" class="menu-card mr-2per homebox">
            <div class="flex-center">
              <img src="@/assets/input_list_icon.png" alt="입고 리스트" width="50px" height="50px">
            </div>
            <div class="flex-center menu-card-title">
              <span>입고 내역</span>
              <span class="menu-card-title2"><br>입고 기록 조회 및 등록</span>
            </div>
          </a>
          <a href="/list/outbound" class="menu-card mr-2per homebox">
            <div class="flex-center">
              <img src="@/assets/output_list_icon.png" alt="출고 리스트" width="50px" height="50px">
            </div>
            <div class="flex-center menu-card-title">
              <span>출고 내역</span>
              <span class="menu-card-title2"><br>출고 기록 조회 및 등록</span>
            </div>
          </a>
          <a href="/list/product" class="menu-card mr-2per homebox">
            <div class="flex-center">
              <img src="@/assets/item_list_icon.png" alt="상품 리스트" width="60px" height="60px">
            </div>
            <div class="flex-center menu-card-title">
              <span>상품 목록</span>
              <span class="menu-card-title2"><br>상품 조회 및 등록</span>
            </div>
          </a>
        </div>
      </div>
      <div class="home-divider"></div>

      <!-- 각종 통계 모음 -->
      <div data-aos="fade-up">
        <div class="box-shadow homebox mb-25px">
          <div class="fw-700 homebox-titlebox homebox-title1">
            <span>{{this.today_year + '년 ' + this.today_month + '월 ' + this.today_date + '일'}}</span>
          </div>
          <div class="d-flex">
            <div class="d-flex numbox numbox-divider">
              <div class="flex-center numbox-txtbox">
                <p class="numbox-today1">오늘 재고</p>
                <p class="numbox-today2">240</p>
              </div>
              <div class="flex-center numbox-txtbox">
                <p class="numbox-yesterday1">어제 재고</p>
                <p class="numbox-yesterday2">235</p>
              </div>
            </div>
            <div class="d-flex numbox numbox-divider">
              <div class="flex-center numbox-txtbox">
                <p class="numbox-today1">오늘 입고</p>
                <p class="numbox-today2">3</p>
              </div>
              <div class="flex-center numbox-txtbox">
                <p class="numbox-yesterday1">어제 입고</p>
                <p class="numbox-yesterday2">6</p>
              </div>
            </div>
            <div class="d-flex numbox">
              <div class="flex-center numbox-txtbox">
                <p class="numbox-today1">오늘 출고</p>
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
        <div class="flex-between mb-25px">
          <a href="/list/product" class="box-shadow homebox homebox-w2">
            <div class="homebox-titlebox homebox-title1">재고 카테고리 비율</div>
            <div class="">
              <div style="height: 35vh; padding-bottom: 15px;">
                <ItemDoughnutChart
                :labels="this.itemChart.labels"
                :data="this.itemChart.data"
                :colors="this.itemChart.colors"/>
              </div>
            </div>
          </a>
          <div class="homebox-w2 flex-column">
            <div class="box-shadow homebox homebox-h3 flex-center-between">
              <div class="homebox-title3 flex-center">
                <img src="https://cdn-icons-png.flaticon.com/512/1670/1670341.png" alt="" class="home-icon">
                재고 금액
              </div>
              <div class="numbox-today2 fs-22">
                ₩12,932,970
              </div>
            </div>
            <div class="box-shadow homebox homebox-h3 flex-center-between">
              <div class="homebox-title3 flex-center">
                <img src="https://cdn-icons-png.flaticon.com/512/567/567600.png" alt="" class="home-icon">
                출고 금액
              </div>
              <div class="numbox-today2 fs-22">
                ₩15,752,700
              </div>
            </div>
            <div class="box-shadow homebox homebox-h3 flex-center-between">
              <div class="homebox-title3 flex-center">
                <img src="https://cdn-icons-png.flaticon.com/512/3712/3712196.png" alt="" class="home-icon">
                인기 제품
              </div>
              <div class="numbox-today2 fs-22">
                원샷광택제
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-aos="fade-up">
        <div class="flex-between mb-25px">
          <a href="/status/inbound" class="box-shadow homebox homebox-w2">
            <div class="homebox-titlebox">
              <span class="homebox-title1">월별 입고 현황</span>
              <span class="homebox-title2">최근 1년</span>
            </div>
            <div style="height: 35vh">
              <InBoundBarChart
                v-if="this.graphRender"
                :labels="this.inBoundChart.labels"
                :data="this.inBoundChart.data"
              />
            </div>
          </a>
          <a href="/list/outbound" class="box-shadow homebox homebox-w2">
            <div class="homebox-titlebox">
              <span class="homebox-title1">월별 출고 현황</span>
              <span class="homebox-title2">최근 1년</span>
            </div>
            <div style="height: 35vh">
              <OutBoundBarChart
                v-if="this.graphRender"
                :labels="this.outBoundChart.labels"
                :data="this.outBoundChart.data"
              />
            </div>
          </a>
        </div>
      </div>
      <div data-aos="fade-up">
        <a href="/status/monthly">
          <div class="box-shadow homebox mb-25px">
            <div class="homebox-titlebox">
              <span class="homebox-title1">연간 재고 현황</span>
              <span class="homebox-title2">최근 1년</span>
            </div>
            <div style="height: 35vh;">
              <AnnualLineChart
                v-if="this.graphRender"
                :labels="this.annualChart.labels"
                :data="this.annualChart.data"
              />
            </div>
          </div>
        </a>
      </div>
      <!-- <TutorialDialog
      v-if="tutorial"
      /> -->
    </v-app>
  </body>
</template>
<script>
/* eslint-disable */
import AOS from 'aos';
import 'aos/dist/aos.css';
import InBoundBarChart from '@/components/ChartComponents/InBoundBarChart.vue'
import OutBoundBarChart from '@/components/ChartComponents/OutBoundBarChart.vue'
import AnnualLineChart from '@/components/ChartComponents/AnnualLineChart.vue'
import ItemDoughnutChart from '@/components/ChartComponents/ItemDoughnutChart.vue'
// import TutorialDialog from './DialogComponents/TutorialDialogComponent.vue';

export default {
  name: 'HomeDashboard',
  components: {InBoundBarChart, OutBoundBarChart, AnnualLineChart, ItemDoughnutChart},
  data () {
    return {
      tutorial: true,
      today_year: new Date().getFullYear(),
      today_month: new Date().getMonth()+1,
      today_date: new Date().getDate(),
      last_year: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getFullYear(),
      last_month: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getMonth()+1,
      monthsList: [],
      inBoundChart: {
        labels: [],
        data: [],
      },
      outBoundChart: {
        labels: [],
        data: [],
      },
      annualChart: {
        labels: [],
        data: [],
      },
      itemChart: {
        labels: ['세제', '방향제', '말통', '광택제', '박스'],
        data: [13,22,45,24,36],
        colors: ['#c41230', '#fb7b00', '#F2BB05', '#47A8BD', '#254359']
      },
      graphRender: false
    }
  },
  setup () {},
  created () {
    AOS.init()
    // this.getMonthsList()
    this.getTutorial()
    this.getYearSummary()
  },
  mounted () {},
  unmounted () {},
  methods: {
    //서비스 시작 여부 확인
    getTutorial () {
      //TODO: 최초 여부 url 확인
      this.$axios.get(`${process.env.VUE_APP_API}/inventory/check/isnew`).then((res) => {
        this.tutorial = res.data
        if (this.tutorial) {
          window.location.href="/tutorial"
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    //일년치 월 리스트 구하기
    getMonthsList () {
      let month = new Date(new Date().setMonth(new Date().getMonth() + 1)).getMonth() == 0 ? 12 : new Date(new Date().setMonth(new Date().getMonth() + 1)).getMonth()
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
    },
    // 최근 12개월간 입고,출고,재고 내역 조회
    async getYearSummary() {
      try {
        const res = await this.$axios.get(`${process.env.VUE_APP_API}/dashboard/summary/year`);
        const dataSet = res.data;

        const updateChart = (list, chart) => {
          for (const element of list) {
            const month = String(element.month).slice(-2) + "월";
            chart.labels.push(month);
            chart.data.push(element.quantity);
          }
        };

        updateChart(dataSet.inBoundList.sort((a, b) => a.month - b.month), this.inBoundChart);
        updateChart(dataSet.outBoundList.sort((a, b) => a.month - b.month), this.outBoundChart);
        updateChart(dataSet.inventoryList.sort((a, b) => a.month - b.month), this.annualChart);

        this.graphRender = true

      } catch (error) {
        console.log(error);
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
.fs-22 {
  font-size: 2.2rem;
}
.v-application {
  background-color: transparent !important;
  box-shadow: none !important;
}
.v-application a {
  color: black;
}
</style>
