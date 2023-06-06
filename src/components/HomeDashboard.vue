<template>
  <body style="padding-bottom: 2vh; min-width: 900px;">
    <v-app>
      <div style="font-size: 2.3rem; font-weight: 700; padding-top: 15px;">
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
      <div id="infobox" class="box-shadow homebox flex-column" style="margin-bottom: 3vh;">
        <div class="fw-700 homebox-titlebox homebox-title1">
          <span>{{this.today_year + '년 ' + this.today_month + '월 ' + this.today_date + '일'}}</span>
        </div>
        <div v-if="isLoading">
          <v-row>
            <v-col cols="4">
              <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                max-height="120"
                type="article"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="4">
              <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                max-height="120"
                type="article"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="4">
              <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                max-height="120"
                type="article"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </div>
        <div v-else class="h-100 pos-rel">
          <div class="d-flex contents h-100">
            <div class="d-flex numbox numbox-divider">
              <div class="numbox-icon flex-center">
                <img src="@/assets/nav-1.png">
              </div>
              <div class="flex-center numbox-txtbox">
                <p class="numbox-today1">오늘 재고</p>
                <p class="numbox-today2">{{today_inventory}}</p>
              </div>
              <div class="flex-center numbox-txtbox">
                <p class="numbox-yesterday1">어제 재고</p>
                <p class="numbox-yesterday2">{{yesterday_inventory}}</p>
              </div>
            </div>
            <div class="d-flex numbox numbox-divider">
              <div class="numbox-icon flex-center">
                <img src="@/assets/nav-3.png">
              </div>
              <div class="flex-center numbox-txtbox">
                <p class="numbox-today1">오늘 입고</p>
                <p class="numbox-today2">{{today_inbound}}</p>
              </div>
              <div class="flex-center numbox-txtbox">
                <p class="numbox-yesterday1">어제 입고</p>
                <p class="numbox-yesterday2">{{yesterday_inbound}}</p>
              </div>
            </div>
            <div class="d-flex numbox">
              <div class="numbox-icon flex-center">
                <img src="@/assets/nav-4.png">
              </div>
              <div class="flex-center numbox-txtbox">
                <p class="numbox-today1">오늘 출고</p>
                <p class="numbox-today2">{{today_outbound}}</p>
              </div>
              <div class="flex-center numbox-txtbox">
                <p class="numbox-yesterday1">어제 출고</p>
                <p class="numbox-yesterday2">{{yesterday_outbound}}</p>
              </div>
            </div>
          </div>
          <div class="change-box w-100 flex-between">
            <div class="change-unit tx-center">
              <div class="flex-center" v-if="today_inventory != yesterday_inventory">
                <div class="d-flex" :class="today_inventory > yesterday_inventory ? 'green-filter' : 'red-filter'">
                  <img v-if="today_inventory > yesterday_inventory" src="@/assets/up-arrow.png" alt="">
                  <img v-else src="@/assets/down-arrow.png" alt="">
                </div>
                <span class="change-text-1">
                  {{ Math.abs(today_inventory - yesterday_inventory) }}
                </span>
                <span class="change-text-2">
                  {{ yesterday_inventory != 0 ? `(${Math.round((today_inventory - yesterday_inventory) / yesterday_inventory * 100)}%)` : null }}
                </span>
              </div>
            </div>
            <div class="change-unit tx-center">
              <div class="flex-center" v-if="today_inbound != yesterday_inbound">
                <div class="d-flex" :class="today_inbound > yesterday_inbound ? 'green-filter' : 'red-filter'">
                  <img v-if="today_inbound > yesterday_inbound" src="@/assets/up-arrow.png" alt="">
                  <img v-else src="@/assets/down-arrow.png" alt="">
                </div>
                <span class="change-text-1">
                  {{ Math.abs(today_inbound - yesterday_inbound) }}
                </span>
                <span class="change-text-2">
                  {{ yesterday_inbound != 0 ? `(${Math.round((today_inbound - yesterday_inbound) / yesterday_inbound * 100)}%)` : null }}
                </span>
              </div>
            </div>
            <div class="change-unit tx-center">
              <div class="flex-center" v-if="today_outbound != yesterday_outbound">
                <div class="d-flex" :class="today_outbound > yesterday_outbound ? 'green-filter' : 'red-filter'">
                  <img v-if="today_outbound > yesterday_outbound" src="@/assets/up-arrow.png" alt="">
                  <img v-else src="@/assets/down-arrow.png" alt="">
                </div>
                <span class="change-text-1">
                  {{ Math.abs(today_outbound - yesterday_outbound) }}
                </span>
                <span class="change-text-2">
                  {{ yesterday_outbound != 0 ? `(${Math.round((today_outbound - yesterday_outbound) / yesterday_outbound * 100)}%)` : null }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-aos="fade-up">
        <div class="flex-between">
          <a href="/list/product" class="box-shadow homebox homebox-w2">
            <div class="homebox-titlebox homebox-title1">재고 카테고리 비율</div>
            <div class="w-100 d-flex">
              <div class="w-30 flex-center">
                <div class="flex-between flex-column" style="height: 196px; margin-top: 3px;">
                  <div class="circle" style="background-color: #c41230"></div>
                  <div class="circle" style="background-color: #fa7b00"></div>
                  <div class="circle" style="background-color: #f1bb07"></div>
                  <div class="circle" style="background-color: #439cb0"></div>
                  <div class="circle" style="background-color: #244257"></div>
                </div>
                <div class="flex-between flex-column" style="height: 200px;">
                  <div>세제</div>
                  <div>방향제</div>
                  <div>말통</div>
                  <div>광택제</div>
                  <div>박스</div>
                </div>
              </div>
              <div class="w-70 pos-rel" style="height: 32vh; margin-bottom: 15px;">
                <ItemDoughnutChart
                :labels="this.itemChart.labels"
                :data="this.itemChart.data"
                :colors="this.itemChart.colors"/>
                <span class="doughnut-label">
                  총 1000개
                </span>
              </div>
            </div>
          </a>
          <div class="homebox-w2 flex-column flex-between">
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
        <div class="flex-between">
          <a href="/status/inbound" class="box-shadow homebox homebox-w2">
            <div class="homebox-titlebox p-0">
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
            <div class="homebox-titlebox p-0">
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
      <div data-aos="fade-up" style="margin-bottom: 2vh;">
        <a href="/status/monthly">
          <div class="box-shadow homebox">
            <div class="homebox-titlebox p-0">
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
      today_inventory: 0,
      today_inbound: 0,
      today_outbound: 0,
      yesterday_inventory: 0,
      yesterday_inbound: 0,
      yesterday_outbound: 0,
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
      graphRender: false,
      isLoading: false,
      scrollY: window.scrollY
    }
  },
  watch: {
    scrollY () {
      console.log(this.scrollY)
    }
  },
  setup () {},
  created () {
    AOS.init()
    // this.getMonthsList()
    this.getTutorial()
  },
  mounted () {
    this.getDaysSummary()
    this.getYearSummary()
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted () {},
  methods: {
    //서비스 시작 여부 확인
    getTutorial () {
      //최초 여부 url 확인
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
    // 어제 오늘 입출고, 재고량
    async getDaysSummary () {
      this.isLoading = true
      try {
        const res = await this.$axios.get(`${process.env.VUE_APP_API}/dashboard/summary/days`);
        const dataSet = res.data;

        const [yesterday, today] = dataSet.sort((a, b) => new Date(a.date) - new Date(b.date));

        this.today_inventory = today.inventory;
        this.today_inbound = today.inbound;
        this.today_outbound = today.outbound*(-1);

        this.yesterday_inventory = yesterday.inventory;
        this.yesterday_inbound = yesterday.inbound;
        this.yesterday_outbound = yesterday.outbound*(-1);
        this.isLoading = false;
      } catch (error) {
        console.error()
      }
    },
    // 최근 12개월간 입고,출고,재고 내역 조회
    async getYearSummary() {
      try {
        const res = await this.$axios.get(`${process.env.VUE_APP_API}/dashboard/summary/year`);
        const dataSet = res.data;

        const updateChart = (list, chart) => {
          for (const element of list) {
            const month = String(element.days).slice(-2) + "월";
            chart.labels.push(month);
            chart.data.push(element.quantity);
          }
        };

        updateChart(dataSet.inBoundList.sort((a, b) => a.days - b.days), this.inBoundChart);
        updateChart(dataSet.outBoundList.sort((a, b) => a.days - b.days), this.outBoundChart);
        updateChart(dataSet.inventoryList.sort((a, b) => a.days - b.days), this.annualChart);

        this.graphRender = true

      } catch (error) {
        console.log(error);
      }
    },
    handleScroll() {
      var scrollPosition = window.scrollY;
      if (scrollPosition > 65) {
        document.getElementById('infobox').classList.add('expanded')
      } else {
        document.getElementById('infobox').classList.remove('expanded')
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
  filter: invert(21%) sepia(45%) saturate(634%) hue-rotate(162deg) brightness(92%) contrast(87%);
}
.circle {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin-right: 10px;
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
#infobox {
  height: 28vh;
  transition: all 0.5s ease;
}
#infobox.expanded {
  height: 45vh;
}
#infobox .contents {
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}
#infobox.expanded .contents {
  padding-bottom: 15px;
}
.doughnut-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.1rem;
}
.change-box {
  display: flex;
  opacity: 0;
  position: absolute;
  bottom: 15px;
  transition: all 0.5s ease
}
.expanded .change-box {
  opacity: 1;
}
.change-unit {
  width: 33.3%;
}
.change-unit img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.change-text-1 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #3a3a3a;
  margin-right: 5px;
}
.change-text-2 {
  font-size: 1rem;
  font-weight: 300;
  color: #5e5e5e
}
.red-filter {
  filter: invert(37%) sepia(65%) saturate(2566%) hue-rotate(331deg) brightness(102%) contrast(96%);
}
.green-filter {
  filter: invert(74%) sepia(56%) saturate(3376%) hue-rotate(115deg) brightness(90%) contrast(104%);
}
.numbox-icon {
  width: 80px;
  height: 80px;
  margin-right: 20px;
  border-radius: 100px;
  background: linear-gradient(145deg, #f0f0f0, #f3f3f3);
  box-shadow:  20px 20px 60px #d3d3d3,
             -20px -20px 60px #ffffff;
}
.numbox-icon img {
  width: 50%;
  height: 50%;
  filter: invert(74%) sepia(4%) saturate(54%) hue-rotate(314deg) brightness(84%) contrast(80%);
}
</style>
