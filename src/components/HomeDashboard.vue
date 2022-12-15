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
        <a href="/status/inventory" class="box-shadow menu-card btn mr-2 home-box">
          <div class="flex-center">
            <img src="@/assets/now_status_icon.png" alt="현 재고 현황" width="50px" height="50px">
          </div>
          <div class="flex-center menu-card-title">
            <span>현 재고 현황</span>
            <span class="menu-card-title2"><br>현재 재고 확인 및 조회</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn mr-2 home-box">
          <div class="flex-center">
            <img src="@/assets/month_status_icon.png" alt="월간 재고 현황" width="50px" height="50px">
          </div>
          <div class="flex-center menu-card-title">
            <span>월별 재고 현황</span>
            <span class="menu-card-title2"><br>월별 재고 확인 및 조회</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn mr-2 home-box">
          <div class="flex-center">
            <img src="@/assets/input_icon.png" alt="입고 현황" width="60px" height="60px">
          </div>
          <div class="flex-center menu-card-title">
            <span>입고 현황</span>
            <span class="menu-card-title2"><br>월별 입고량 확인 및 조회</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn home-box">
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
        <a href="" class="box-shadow menu-card btn mr-2 home-box">
          <div class="flex-center">
            <img src="@/assets/input_list_icon.png" alt="입고 리스트" width="50px" height="50px">
          </div>
          <div class="flex-center menu-card-title">
            <span>입고 리스트</span>
            <span class="menu-card-title2"><br>입고 기록 조회 및 등록</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn mr-2 home-box">
          <div class="flex-center">
            <img src="@/assets/output_list_icon.png" alt="출고 리스트" width="50px" height="50px">
          </div>
          <div class="flex-center menu-card-title">
            <span>출고 리스트</span>
            <span class="menu-card-title2"><br>출고 기록 조회 및 등록</span>
          </div>
        </a>
        <a href="" class="box-shadow menu-card btn mr-2 home-box">
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
    <div class="box-shadow home-box">
      <div class="fw-700" style="font-size: 1.5rem;">
        <span>{{this.today_year + '년 ' + this.today_month + '월 ' + this.today_date + '일'}}</span>
      </div>
      <div class="flex">
        <div style="width: 33%; height: 120px;">
          <h1>sdfkj</h1>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
/* eslint-disable */
export default {
  name: 'HomeDashboard',
  components: {},
  data () {
    return {
      today_year: new Date().getFullYear(),
      today_month: new Date().getMonth()+1,
      today_date: new Date().getDate(),
    }
  },
  setup () {},
  created () {},
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
.flex-center {
  height: 100%;
}
.dashed-line {
  border: 1px dashed #A9A9A9;
  width: 100%;
}
.home-box {
  background-color: #ffffff; 
  border-radius: 10px; 
  padding: 20px;
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
.mr-2 {
  margin-right: 2%;
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
</style>
