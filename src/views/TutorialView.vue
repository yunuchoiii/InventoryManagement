<template>
  <body class="flex-center">
    <!-- <div v-if="this.current_page!=1" class="fade-in-1s" style="z-index: 100;"> -->
    <div class="fade-in-1s" style="z-index: 100;">
      <a @click="toPrevPage()">
        <img src="https://cdn-icons-png.flaticon.com/512/709/709586.png" class="arrow-left-img">
      </a>
      <a @click="toNextPage()">
        <img src="https://cdn-icons-png.flaticon.com/512/709/709586.png" class="arrow-right-img">
      </a>
    </div>

    <!-- Page 1 메인페이지-->
    <div v-if="page_1_show" id="page_1">
      <div class="main-page-div main-page-bg"></div>
      <div class="main-section flex-center fade-in-1s">
        <div class="bgImgFrame bg-pan-left w-60">
          <div class="bgImg">
            <img class="kenburns-top" src="@/assets/tutorial_bg_2.png" width="500px">
          </div>
        </div>
        <div class="fw-700 w-40" style="letter-spacing: -0.1rem; padding-left: 50px;">
          <p class="fade-in-2s" style="font-size: 3.2rem;">안녕하세요.</p>
          <div class="fade-in-3s" style="font-size: 2.5rem;margin-top: 30px;">
            <span class="orange-gradient">원샷솔브코리아<br></span>
            <span>재고관리시스템 입니다.</span>
          </div>
          <div class="flex-align-center" style="margin-top: 80px;">
            <span class="fade-in-4s" style="font-size: 3rem; margin-right: 20px;">시작하기</span>
            <v-btn
              text
              icon
              color="#f89929"
              width="70px"
              height="70px"
              style="margin-top:5px; margin-left: 10px;"
              @click="toNextPage()"
              class="slide-in-left-5s box-shadow"
            >
              <v-icon size="60px">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Page 2 홈 대시보드-->
    <div v-if="page_2_show" id="page_2">
      <div class="section flex-center">
        <div class="tut-left-box w-60 tx-center fade-in-1s flex-center">
          <div class="tut-screen-lg">
            <div style="padding:30px 30px 0px 30px" class="flex-center-between">
              <div v-for="i in 4" :key="i" class="box-shadow flex-center tut-screen-lg-menu">
                <div></div>
                <img src="https://cdn-icons-png.flaticon.com/512/7711/7711100.png">
              </div>
            </div>
            <div style="padding: 30px 30px 0px 30px; flex-wrap: wrap; " class="flex-center-between">
              <div class="box-shadow flex-center tut-screen-lg-chart font-blue fw-700">
                <div class="w-30 flex-column flex-center slide-in-blurred-bottom-2s">
                  <span style="margin-bottom: 10px;">Best</span>
                  <img src="https://cdn-icons-png.flaticon.com/512/8465/8465733.png" alt="" width="50%">
                </div>
                <div class="w-30 flex-column slide-in-blurred-bottom-2s">
                  <span style="margin-bottom: 13px;">Today</span>
                  <span style="font-size: 1.8rem; color: #f8972a;">300</span>
                </div>
                <div class="w-30 flex-column flex-center slide-in-blurred-bottom-2s">
                  <span style="margin-bottom: 10px;">Sales</span>
                  <img src="https://cdn-icons-png.flaticon.com/512/1420/1420341.png" alt="" width="50%">
                </div>
              </div>
              <div class="box-shadow flex-center tut-screen-lg-chart">
                <img class="slide-in-blurred-bottom-2s" src="@/assets/tutorial_chart_1.png" alt="" width="80%" height="70%">
              </div>
              <div class="box-shadow flex-center tut-screen-lg-chart">
                <img class="slide-in-blurred-bottom-2s" src="@/assets/tutorial_chart_2.png" alt="" width="80%" height="70%" style="border-radius: 10px;">
              </div>
              <div class="box-shadow tut-screen-lg-chart flex-row flex-center-evenly">
                <img class="slide-in-blurred-bottom-2s" src="https://cdn-icons-png.flaticon.com/512/7711/7711100.png" height="30%">
                <img class="slide-in-blurred-bottom-2s" src="@/assets/tutorial_chart_3.png" height="70%">
              </div>
            </div>
          </div>
        </div>
        <div class="w-40 fade-in-3s">
          <div class="font-mont tut-title red-gradient">
            <span>HOME DASHBOARD</span>
          </div>
          <div class="tut-contents">
            <ul>
              <li>홈에서 메뉴 버튼과 각종 차트를 확인할 수 있습니다.</li>
              <li>현 재고량, 입출고 추이, 상품 매출액 등<br>여러가치 차트와 정보를 확인해보세요.</li>
            </ul>
          </div>
          <div class="flex-align-center" style="margin-top: 60px;">
            <span class="font-mont tut-next red-gradient">NEXT</span>
            <v-btn
              text
              icon
              color="#bc3640"
              width="60px"
              height="60px"
              @click="toNextPage()"
              class="box-shadow"
            >
              <v-icon size="60px">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Page 3 현황-->
    <div v-if="page_3_show" id="page_3">
      <div class="section flex-center">
        <div class="tut-left-box w-60 tx-center flex-center flex-column">
          <div style="height: 486px; width: 646px; position: relative;">
            <div class="tut-screen-sm box-shadow swing-in-top-fwd-1s" style="top: 0%; left: 0%;">
              <div class="fw-700 tut-screen-sm-title font-gray">
                월간 재고 현황
              </div>
              <div class="flex-center-between flex-column" style="padding: 10px 0px;">
                <div class="tut-table-row box-shadow flex-center-between">
                  <span class="fa fa-refresh"></span>
                  <div class="flex-center-between">
                    <div class="br-5" style="margin-right: 10px; background-color: #eeeeee; width: 100px; height: 23px;"></div>
                    <span class="fa fa-search"></span>
                  </div>
                </div>
              </div>
              <div class="br-10 box-shadow size-100 bg-white flex-center-evenly flex-column" style="height:70%">
                <div v-for="i in 7" :key="i" class="tut-divider"></div>
              </div>
            </div>
            <div class="tut-screen-sm box-shadow swing-in-top-fwd-1200ms" style="top: 10%; left: 10%;">
              <div class="fw-700 tut-screen-sm-title font-gray">
                월간 입고 현황
              </div>
              <div class="flex-center-between flex-column" style="padding: 10px 0px;">
                <div class="tut-table-row box-shadow flex-center-between">
                  <span class="fa fa-refresh"></span>
                  <div class="flex-center-between">
                    <div class="br-5" style="margin-right: 10px; background-color: #eeeeee; width: 100px; height: 23px;"></div>
                    <span class="fa fa-search"></span>
                  </div>
                </div>
              </div>
              <div class="br-10 box-shadow size-100 bg-white flex-center-evenly flex-column" style="height:70%">
                <div v-for="i in 7" :key="i" class="tut-divider"></div>
              </div>
            </div>
            <div class="tut-screen-sm box-shadow swing-in-top-fwd-1400ms" style="bottom:10%; right:10%;">
              <div class="fw-700 tut-screen-sm-title font-gray">
                월간 출고 현황
              </div>
              <div class="flex-center-between flex-column" style="padding: 10px 0px;">
                <div class="tut-table-row box-shadow flex-center-between">
                  <span class="fa fa-refresh"></span>
                  <div class="flex-center-between">
                    <div class="br-5" style="margin-right: 10px; background-color: #eeeeee; width: 100px; height: 23px;"></div>
                    <span class="fa fa-search"></span>
                  </div>
                </div>
              </div>
              <div class="br-10 box-shadow size-100 bg-white flex-center-evenly flex-column" style="height:70%">
                <div v-for="i in 7" :key="i" class="tut-divider"></div>
              </div>
            </div>
            <div class="tut-screen-sm box-shadow swing-in-top-fwd-1600ms" style="bottom:0; right:0;">
              <div class="fw-700 tut-screen-sm-title font-gray">
                현 재고 현황
              </div>
              <div class="flex-center-between flex-column" style="padding: 10px 0px;">
                <div class="tut-table-row box-shadow flex-center-between">
                  <span class="fa fa-refresh"></span>
                  <div class="flex-center-between">
                    <div class="br-5" style="margin-right: 10px; background-color: #eeeeee; width: 100px; height: 23px;"></div>
                    <span class="fa fa-search"></span>
                  </div>
                </div>
              </div>
              <div class="br-10 box-shadow size-100 bg-white flex-center-evenly flex-column" style="height:70%">
                <div v-for="i in 7" :key="i" class="tut-divider"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-40 fade-in-2s">
          <div class="font-mont tut-title orange-gradient">
            <span>INVENTORY STATUS</span>
          </div>
          <div class="tut-contents">
            <ul>
              <li>다양한 기준으로 재고 현황을 확인해보세요.</li>
              <li>이 달의 재고, 입고, 출고를 한 눈에 확인할 수 있습니다.</li>
              <li>1년 단위로 재고와 입출고를 각각 확인할 수도 있습니다.</li>
            </ul>
          </div>
          <div class="flex-align-center" style="margin-top: 35px;">
            <span class="font-mont tut-next orange-gradient">NEXT</span>
            <v-btn
              text
              icon
              color="#ff631a"
              width="60px"
              height="60px"
              @click="toNextPage()"
              class="box-shadow"
            >
              <v-icon size="60px">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Page 4 목록-->
    <div v-if="page_4_show" id="page_4">
      <div class="section flex-center">
        <div class="tut-left-box w-60 tx-center fade-in-1s flex-center flex-column">
          <div class="tut-screen-lg flex-center" style="overflow: hidden;">
            <div id="grayfilter" class="grayfilter size-100"></div>
            <div id="tut-table" class="flex-center flex-column size-100" style="padding: 30px;">
              <div class="tut-table-row box-shadow"></div>
              <div class="tut-table-line"></div>
              <div class="tut-table-row box-shadow"></div>
              <div class="tut-table-row box-shadow"></div>
              <div style="width: 100%; height: 35px;" class="flex-center">
                <div id="tut-table-row" class="tut-table-row box-shadow"></div>
              </div>
              <div class="tut-table-row box-shadow"></div>
              <div class="tut-table-row box-shadow"></div>
              <div class="tut-table-row box-shadow"></div>
              <div class="tut-table-row box-shadow"></div>
            </div>
            <div class="tut-dialog box-shadow scale-in-center-2s flex-center-between flex-column">
              <div>
                <span class="font-blue fw-700" style="font-size: 1.5rem;">입고 내역 등록</span>
              </div>
              <div class="flex-center flex-center-evenly tut-dialog-box size-100">
                <div v-for="i in 6" :key="i" class="tut-dialog-blank box-shadow"></div>
                <div class="tut-dialog-blank box-shadow" style="width: 91%"></div>
              </div>
              <div style="width: 100%; height: 50px;" class="flex-center">
                <div class="font-red flex-center" style="width:100px; height: 100%; border-radius: 100px; margin-right: 20px; border: 1px solid #c41230;">
                  삭제
                </div>
                <div class="bg-blue font-white flex-center fw-700" style="width:100px; height: 100%; border-radius: 100px;">
                  저장
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-40 fade-in-3s">
          <div class="font-mont tut-title blue-gradient">
            <span>INVENTORY LIST</span>
          </div>
          <div class="tut-contents">
            <ul>
              <li>입출고 내역과 상품 목록을 확인해보세요.</li>
              <li>새로운 항목의 등록, 수정, 삭제가 가능합니다.</li>
              <li>달이 끝나면 입출고 기록 마감 기능도 제공합니다.</li>
            </ul>
          </div>
          <div class="flex-align-center" style="margin-top: 35px;">
            <span class="font-mont tut-next blue-gradient">NEXT</span>
            <v-btn
              text
              icon
              color="#3d7197"
              width="60px"
              height="60px"
              @click="toNextPage()"
              class="box-shadow"
            >
              <v-icon size="60px">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Page 5 재고 시작월 등록-->
    <div v-if="page_5_show" id="page_5">
      <div class="section flex-center">
        <div class="slide-in-blurred-top-1s font-mont">
          <span class="tut-title blue-gradient">거의 다 끝났습니다!</span>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
/* eslint-disable */
export default {
  name: 'TutorialDialog',
  components: {},
  props: {},
  data () {
    return {
      dialog: true,
      current_page: 1,
      page_1_show: true,
      page_2_show: false,
      page_3_show: false,
      page_4_show: false,
      page_5_show: false,
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    toNextPage () {
      if (this.current_page=== 1) {
        this.page_2_show = true
        document.getElementById("page_1").classList.add("slide-out-left");
        setTimeout(()=>{
          this.page_1_show = false
        }, 500)
      } else if (this.current_page=== 2) {
        this.page_3_show = true
        document.getElementById("page_2").classList.add("slide-out-left");
        setTimeout(()=>{
          this.page_2_show = false
        }, 500)
      } else if (this.current_page=== 3) {
        this.page_4_show = true
        document.getElementById("page_3").classList.add("slide-out-left");
        setTimeout(()=>{
          const table_row = document.getElementById("tut-table-row");
          table_row.style.backgroundColor="#e0e0e0";
          table_row.style.width="98%";
          table_row.style.height="30px";
        }, 2000)
        setTimeout(()=>{
          const table_row = document.getElementById("tut-table-row");
          table_row.style.backgroundColor="white";
          table_row.style.width="100%";
          table_row.style.height="35px";
          const grayfilter = document.getElementById("grayfilter");
          grayfilter.style.backgroundColor="rgb(0 0 0 / 30%)";
        }, 2500)
        setTimeout(()=>{
          this.page_3_show = false
        }, 500)
      } else if (this.current_page=== 4) {
        this.page_5_show = true
        document.getElementById("page_4").classList.add("slide-out-left");
        setTimeout(()=>{
          this.page_4_show = false
        }, 500)
      } else if (this.current_page=== 5) {
        this.page_6_show = true
        document.getElementById("page_5").classList.add("slide-out-left");
        setTimeout(()=>{
          this.page_5_show = false
        }, 500)
      }

      setTimeout(()=>{
        this.current_page++
      }, 500)
    },
    toPrevPage () {
      if (this.current_page=== 2) {
        this.page_1_show = true
        document.getElementById("page_2").classList.add("slide-out-right");
        setTimeout(()=>{
          this.page_2_show = false
        }, 500)
      } else if (this.current_page=== 3) {
        this.page_2_show = true
        document.getElementById("page_3").classList.add("slide-out-right");
        setTimeout(()=>{
          this.page_3_show = false
        }, 500)
      } else if (this.current_page=== 4) {
        this.page_3_show = true
        document.getElementById("page_4").classList.add("slide-out-right");
        setTimeout(()=>{
          this.page_4_show = false
        }, 500)
      } else if (this.current_page=== 5) {
        this.page_4_show = true
        document.getElementById("page_5").classList.add("slide-out-right");
        setTimeout(()=>{
          const table_row = document.getElementById("tut-table-row");
          table_row.style.backgroundColor="#e0e0e0";
          table_row.style.width="98%";
          table_row.style.height="30px";
        }, 2000)
        setTimeout(()=>{
          const table_row = document.getElementById("tut-table-row");
          table_row.style.backgroundColor="white";
          table_row.style.width="100%";
          table_row.style.height="35px";
          const grayfilter = document.getElementById("grayfilter");
          grayfilter.style.backgroundColor="rgb(0 0 0 / 30%)";
        }, 2500)
        setTimeout(()=>{
          this.page_5_show = false
        }, 500)
      } else if (this.current_page=== 6) {
        this.page_5_show = true
        document.getElementById("page_6").classList.add("slide-out-right");
        setTimeout(()=>{
          this.page_6_show = false
        }, 500)
      }

      setTimeout(()=>{
        this.current_page--
      }, 500)
    }
  }
}
</script>
<style>
body {
  background-color: white;
}
li {
  list-style: none;
  height: 40px;
}
.fa-search {
  color:#ef882e
}
.fa-refresh {
  color:#ef882e
}
/* .main-page-bg {
  background-image: url(@/assets/tutorial_bg_2.png);
  background-size: 150%;
  background-position: center;
  filter: blur(100px);
} */
.size-100 {
  width: 100%;
  height: 100%;
}
.main-page-div {
  width: 150%;
  height: 150%;

  position: absolute;
  top: -25%;
  left: -25%;
}
.main-section {
  height: 100vh; 
  width: 100vw;
}
.section {
  height: 100vh; 
  width: 100vw;
  padding: 90px;
}
.bgImgFrame {
  width: 510px; 
  height: 510px; 
  padding: 15px; 
  border-radius: 500px; 
  margin-left: 70px; 
  background-image: linear-gradient(45deg, #322420, #ef882e, #ffecd0);
  background-size: 600% 100%;
}
.bgImg {
  height:480px; 
  width: 480px;
  border-radius: 300px;
  overflow: hidden;
}
.arrow-right-img {
  width: 50px;
  position: fixed;
  right: 30px;
  cursor : pointer;
  z-index: 1;
}
.arrow-left-img {
  width: 50px;
  position: fixed;
  left: 30px;
  transform: scaleX(-1);
  cursor : pointer;
  z-index: 1;
}
.tut-title {
  font-weight:700; 
  font-size: 3.3rem; 
  margin-bottom: 30px;
  letter-spacing: -0.1rem;
}
.tut-contents {
  font-weight:700; 
  font-size: 1.4rem; 
  color: #494949;
  white-space: nowrap;
}
.tut-chart-img {
  border-radius: 10px;
  overflow: hidden;
  width: 400px;
}
.tut-next {
  font-size:2.7rem; 
  letter-spacing: -0.1rem;
  margin-right: 30px;
}
.tut-screen-lg {
  width: 700px; 
  height: 488px; 
  border: 3px solid #cdcdcd; 
  border-radius: 30px;
  background-color: #f3f3f3;
  position: relative;
}
.tut-screen-lg-menu {
  width: 22%; 
  height: 70px; 
  border-radius: 15px;
  background-color: white;
}
.tut-screen-lg-menu div {
  width: 25%;
  height: 50%;
  background-color: #d2d2d4;
  border-radius: 10px;
  margin-right: 10px;
}
.tut-screen-lg-menu img {
  width:50%;
  height:50%;
}
.tut-screen-lg-chart {
  width: 48%; 
  height: 150px; 
  border-radius: 15px;
  background-color: white;
  margin-bottom: 25px;
}
.tut-screen-sm {
  width: 70%;
  height: 70%;
  border-radius: 30px;
  border: 3px solid #ffffff; 
  background-color: #f3f3f3;
  position: absolute;
  padding: 10px 20px;
}
.tut-screen-sm-title{
  font-size: 1.2rem; 
  text-align: left;
}
#tut-table-row {
  transition: background-color 0.5s ease;
  transition: width 0.5s ease;
  transition: height 0.5s ease;
}
.tut-table-row {
  width: 100%; 
  height: 35px; 
  background-color: white; 
  border-radius: 10px;
  padding: 0px 10px
}
.tut-table-line {
  width: 100%; 
  height: 3px; 
  background-color: #707070;
}
.tut-dialog {
  width: 500px; 
  height: 400px; 
  border-radius: 30px; 
  position: absolute; 
  top: 40px; 
  background-color: white;
  padding: 20px 40px;
}
.tut-dialog-box {
  flex-wrap: wrap; 
  border: 1px solid #3d7197; 
  border-radius: 20px; 
  margin: 20px; 
  padding: 11px 0px;
  background-color: #e0f0f6;
}
.tut-dialog-blank {
  width: 43%; 
  height: 40px; 
  border-radius: 10px;
  background-color: white;
}
.grayfilter {
  background-color: transparent; 
  position: absolute;
  transition: background-color 0.5s ease;
}
.tut-divider {
  width: 95%;
  height: 2px;
  background-color: #f3f3f3;
}
</style>