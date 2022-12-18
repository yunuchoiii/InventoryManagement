<template>
  <body>
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
        <a href="/status/inventory" class="box-shadow menu-card btn mr-2per homebox">
          <div class="flex-center">
            <img src="@/assets/inventory_status_icon.png" alt="현 재고 현황" width="50px" height="50px">
          </div>
          <div class="flex-center menu-card-title">
            <span>현 재고 현황</span>
            <span class="menu-card-title2"><br>현재 재고 확인 및 조회</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn mr-2per homebox">
          <div class="flex-center">
            <img src="@/assets/month_status_icon.png" alt="월간 재고 현황" width="50px" height="50px">
          </div>
          <div class="flex-center menu-card-title">
            <span>월별 재고 현황</span>
            <span class="menu-card-title2"><br>월별 재고 확인 및 조회</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn mr-2per homebox">
          <div class="flex-center">
            <img src="@/assets/input_icon.png" alt="입고 현황" width="60px" height="60px">
          </div>
          <div class="flex-center menu-card-title">
            <span>입고 현황</span>
            <span class="menu-card-title2"><br>월별 입고량 확인 및 조회</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn homebox">
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
        <a href="" class="box-shadow menu-card btn mr-2per homebox">
          <div class="flex-center">
            <img src="@/assets/input_list_icon.png" alt="입고 리스트" width="50px" height="50px">
          </div>
          <div class="flex-center menu-card-title">
            <span>입고 리스트</span>
            <span class="menu-card-title2"><br>입고 기록 조회 및 등록</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn mr-2per homebox">
          <div class="flex-center">
            <img src="@/assets/output_list_icon.png" alt="출고 리스트" width="50px" height="50px">
          </div>
          <div class="flex-center menu-card-title">
            <span>출고 리스트</span>
            <span class="menu-card-title2"><br>출고 기록 조회 및 등록</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn mr-2per homebox">
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
    <div class="box-shadow homebox mb-22px"  data-aos="fade-up">
      <div class="fw-700 homebox-titlebox">
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
    <div data-aos="fade-up">
      <div class="flex-between mb-22px">
        <div class="box-shadow homebox homebox-w2">
          <div class="homebox-titlebox">
            <span class="homebox-title1">월별 입고 현황</span>
            <span class="homebox-title2">최근 1년</span>
          </div>
          <div style="height: 300px">
            <InputBarChart
            :labels="this.inputChart.labels"
            :data="this.inputChart.data"/>
          </div>
        </div>
        <div class="box-shadow homebox homebox-w2">
          <div class="homebox-titlebox">
            <span class="homebox-title1">월별 출고 현황</span>
            <span class="homebox-title2">최근 1년</span>
          </div>
          <div style="height: 300px">
            <OutputBarChart
            :labels="this.outputChart.labels"
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
          <div style="height: 300px;">
          <AnnualLineChart
          :labels="this.annualChart.labels"
          :data="this.annualChart.data"/>
        </div>
      </div>
    </div>
    <div data-aos="fade-up">
      <div class="flex-between mb-22px">
        <div class="box-shadow homebox homebox-w2">
          <div class="homebox-titlebox homebox-title1">재고 카테고리 비율</div>
          <div class="flex">
            <div class="flex-leftcenter" style="width: 20%;">
              <div class="legend-box-l">
                <div class="color-circle" style="background-color:#3f5473"></div>
                <div style="font-size: 20px">{{itemChart.labels[0]}}</div>
              </div>
              <div class="legend-box-l">
                <div class="color-circle" style="background-color:#47A8BD"></div>
                <div style="font-size: 20px">{{itemChart.labels[1]}}</div>
              </div>
              <div class="legend-box-l">
                <div class="color-circle" style="background-color:#F5E663"></div>
                <div style="font-size: 20px">{{itemChart.labels[2]}}</div>
              </div>
              <div class="legend-box-l">
                <div class="color-circle" style="background-color:#f89929"></div>
                <div style="font-size: 20px">{{itemChart.labels[3]}}</div>
              </div>
              <div class="legend-box-l">
                <div class="color-circle" style="background-color:#c41230"></div>
                <div style="font-size: 20px">{{itemChart.labels[4]}}</div>
              </div>
            </div>
            <div class="flex-rightcenter" style="width: 10%;">
              <div class="legend-box-l">
                <div style="font-size: 20px">{{itemChart.data[0]}}</div>
              </div>
              <div class="legend-box-l">
                <div style="font-size: 20px">{{itemChart.data[1]}}</div>
              </div>
              <div class="legend-box-l">
                <div style="font-size: 20px">{{itemChart.data[2]}}</div>
              </div>
              <div class="legend-box-l">
                <div style="font-size: 20px">{{itemChart.data[3]}}</div>
              </div>
              <div class="legend-box-l">
                <div style="font-size: 20px">{{itemChart.data[4]}}</div>
              </div>
            </div>
            <div style="height: 300px; padding: 15px 0px; width: 70%;">
              <ItemDoughnutChart
              :labels="this.itemChart.labels"
              :data="this.itemChart.data"
              :colors="this.itemChart.colors"/>
            </div>
          </div>
        </div>
        <div class="box-shadow homebox homebox-w2">
          <div class="homebox-titlebox homebox-title1">Coming Soon</div>
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
        colors: ['#3f5473', '#47A8BD', '#F5E663', '#f89929', '#c41230']
      },
    }
  },
  setup () {},
  created () {
    AOS.init();
  },
  mounted () {},
  unmounted () {},
  methods: {}
}
</script>
<style>
@import "@/styles/styles.css";

body {background-color: #f3f3f3;}
.btn:active {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  color: #3e3e3e;
}
.btn:hover {
  background-color: #fafafa;
}
.dashed-line {
  border: 1px dashed #A9A9A9;
  width: 100%;
}
.homebox {
  background-color: #ffffff; 
  border-radius: 10px; 
  padding: 20px;
}
.homebox-w2 {
  width: 49%;
}
.homebox-titlebox {
  height: 50px;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.homebox-title1 {
  font-size: 1.5rem;
  font-weight: 700;
}
.homebox-title2 {
  font-size: 1rem;
  font-weight: 300;
}
.menu-divider {
  display: flex; 
  flex-direction: row; 
  align-items: center; 
  margin: 25px 0px;
}
.menu-divider-title {
  padding: 3px; 
  background-color: #f3f3f3; 
  font-size: 1.5rem; 
  font-weight: 700;
}
.menu-card {
  width: 23.5%; 
  height: 110px;
  display: flex;
  align-items: center;
}
.mr-2per {
  margin-right: 2%;
}
.mb-22px {
  margin-bottom: 22px;
}
.menu-card-title {
  font-size: 1.3rem; 
  width: 100%; 
  text-align: center;
  display: flex;
  flex-direction: column;
}
.menu-card-title2 {
  font-size: 1rem;
  line-height: 1rem;
}
.numbox {
  width: 33.3%; 
  height: 120px;
}
.numbox-divider {
  border-right: 1px solid #f3f3f3;
}
.numbox-txtbox {
  width:50%; 
  flex-direction: column;
}
.numbox-today1 {
  font-size: 1.2rem; 
  font-weight: 700; 
  line-height: 2.5rem;
}
.numbox-today2 {
  font-size: 2.5rem; 
  font-weight: 700; 
  color: #F89829;
}
.numbox-yesterday1 {
  font-size: 1rem; 
  line-height: 2.5rem;
}
.numbox-yesterday2 {
  font-size: 2rem; 
  font-weight: 700; 
  color: #3F5473;
}
.color-circle {
  width: 20px;
  height: 20px;
  border-radius: 30px;
  margin-right: 15px;
}
.flex-leftcenter {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
.flex-rightcenter {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
}
.legend-box-l {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 1vh 0vw 1vh 1vw;
}
</style>
