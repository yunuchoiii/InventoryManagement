<template>
  <body class="flex-center">
    <!-- <div v-if="this.current_page!=1" class="fade-in-1s" style="z-index: 100;"> -->
    <!-- <div class="fade-in-1s" style="z-index: 100;">
      <a @click="toPrevPage()">
        <img src="https://cdn-icons-png.flaticon.com/512/709/709586.png" class="arrow-left-img">
      </a>
      <a @click="toNextPage()">
        <img src="https://cdn-icons-png.flaticon.com/512/709/709586.png" class="arrow-right-img">
      </a>
    </div> -->

    <!-- Page 1 메인페이지-->
    <div v-if="page_1_show" id="page_1">
      <!-- <div class="main-page-div main-page-bg"></div> -->
      <div class="main-section flex-center fade-in-1s">
        <div class="flex-right pr-50">
          <div class="bgImgFrame bg-pan-left">
            <div class="bgImg">
              <img class="kenburns-top" src="@/assets/tutorial_bg_2.png" width="500px">
            </div>
          </div>
        </div>
        <div class="fw-700" style="letter-spacing: -0.1rem;">
          <p class="fade-in-2s" style="font-size: 3.5rem;">안녕하세요.</p>
          <div class="fade-in-3s" style="font-size: 3rem;margin-top: 30px;">
            <span class="orange-gradient">원샷솔브코리아<br></span>
            <span>재고관리시스템 입니다.</span>
          </div>
          <div class="flex-align-center" style="margin-top: 80px;">
            <span class="fade-in-4s" style="font-size: 3.5rem; margin-right: 20px;">시작하기</span>
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
        <div class="tut-left-box tx-center fade-in-1s flex-right pr-50">
          <div class="tut-screen-lg">
            <div style="padding:30px 30px 0px 30px" class="flex-center-between">
              <div v-for="i in 4" :key="i" class="box-shadow flex-center tut-screen-lg-menu">
                <div></div>
                <img src="https://cdn-icons-png.flaticon.com/512/7711/7711100.png">
              </div>
            </div>
            <div style="padding: 30px 30px 0px 30px; flex-wrap: wrap; " class="flex-center-between">
              <div class="box-shadow flex-center tut-screen-lg-chart font-blue fw-700">
                <div class="w-30 flex-column flex-between flex-center slide-in-blurred-bottom-2s">
                  <span style="margin-bottom: 10px;">Best</span>
                  <img src="https://cdn-icons-png.flaticon.com/512/8465/8465733.png" alt="" width="50%">
                </div>
                <div class="w-30 flex-column flex-between slide-in-blurred-bottom-2s">
                  <span style="margin-bottom: 13px;">Today</span>
                  <span style="font-size: 1.8rem; color: #f8972a;">300</span>
                </div>
                <div class="w-30 flex-column flex-between flex-center slide-in-blurred-bottom-2s">
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
        <div class="fade-in-3s w-500">
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
            <v-btn
              text
              icon
              color="#fd4b5a"
              width="60px"
              height="60px"
              @click="toPrevPage()"
              class="box-shadow"
            >
              <v-icon size="60px">mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              text
              icon
              color="#fd4b5a"
              width="60px"
              height="60px"
              @click="toNextPage()"
              class="box-shadow ml-20"
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
        <div class="tut-left-box tx-center flex-center flex-column flex-between pr-50">
          <div style="height: 488px; width: 650px; position: relative;">
            <div class="tut-screen-sm box-shadow swing-in-top-fwd-1s" style="top: 0%; left: 0%;">
              <div class="fw-700 tut-screen-sm-title font-gray">
                월간 재고 현황
              </div>
              <div class="flex-center-between flex-column flex-between" style="padding: 10px 0px;">
                <div class="tut-table-row box-shadow flex-center-between">
                  <span class="fa fa-refresh"></span>
                  <div class="flex-center-between">
                    <div class="br-5" style="margin-right: 10px; background-color: #eeeeee; width: 100px; height: 23px;"></div>
                    <span class="fa fa-search"></span>
                  </div>
                </div>
              </div>
              <div class="br-10 box-shadow size-100 bg-white flex-center-evenly flex-column flex-between" style="height:70%">
                <div v-for="i in 7" :key="i" class="tut-divider"></div>
              </div>
            </div>
            <div class="tut-screen-sm box-shadow swing-in-top-fwd-1200ms" style="top: 10%; left: 10%;">
              <div class="fw-700 tut-screen-sm-title font-gray">
                월간 입고 현황
              </div>
              <div class="flex-center-between flex-column flex-between" style="padding: 10px 0px;">
                <div class="tut-table-row box-shadow flex-center-between">
                  <span class="fa fa-refresh"></span>
                  <div class="flex-center-between">
                    <div class="br-5" style="margin-right: 10px; background-color: #eeeeee; width: 100px; height: 23px;"></div>
                    <span class="fa fa-search"></span>
                  </div>
                </div>
              </div>
              <div class="br-10 box-shadow size-100 bg-white flex-center-evenly flex-column flex-between" style="height:70%">
                <div v-for="i in 7" :key="i" class="tut-divider"></div>
              </div>
            </div>
            <div class="tut-screen-sm box-shadow swing-in-top-fwd-1400ms" style="bottom:10%; right:10%;">
              <div class="fw-700 tut-screen-sm-title font-gray">
                월간 출고 현황
              </div>
              <div class="flex-center-between flex-column flex-between" style="padding: 10px 0px;">
                <div class="tut-table-row box-shadow flex-center-between">
                  <span class="fa fa-refresh"></span>
                  <div class="flex-center-between">
                    <div class="br-5" style="margin-right: 10px; background-color: #eeeeee; width: 100px; height: 23px;"></div>
                    <span class="fa fa-search"></span>
                  </div>
                </div>
              </div>
              <div class="br-10 box-shadow size-100 bg-white flex-center-evenly flex-column flex-between" style="height:70%">
                <div v-for="i in 7" :key="i" class="tut-divider"></div>
              </div>
            </div>
            <div class="tut-screen-sm box-shadow swing-in-top-fwd-1600ms" style="bottom:0; right:0;">
              <div class="fw-700 tut-screen-sm-title font-gray">
                현 재고 현황
              </div>
              <div class="flex-center-between flex-column flex-between" style="padding: 10px 0px;">
                <div class="tut-table-row box-shadow flex-center-between">
                  <span class="fa fa-refresh"></span>
                  <div class="flex-center-between">
                    <div class="br-5" style="margin-right: 10px; background-color: #eeeeee; width: 100px; height: 23px;"></div>
                    <span class="fa fa-search"></span>
                  </div>
                </div>
              </div>
              <div class="br-10 box-shadow size-100 bg-white flex-center-evenly flex-column flex-between" style="height:70%">
                <div v-for="i in 7" :key="i" class="tut-divider"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fade-in-2s w-500">
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
            <v-btn
              text
              icon
              color="#f79928"
              width="60px"
              height="60px"
              @click="toPrevPage()"
              class="box-shadow"
            >
              <v-icon size="60px">mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              text
              icon
              color="#f79928"
              width="60px"
              height="60px"
              @click="toNextPage()"
              class="box-shadow ml-20"
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
        <div class="tut-left-box tx-center fade-in-1s flex-center flex-column flex-between pr-50">
          <div class="tut-screen-lg flex-center" style="overflow: hidden;">
            <div id="grayfilter" class="grayfilter size-100"></div>
            <div id="tut-table" class="flex-center flex-column flex-between size-100" style="padding: 30px;">
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
            <div class="tut-dialog box-shadow scale-in-center-2s flex-center-between flex-column flex-between">
              <div>
                <span class="font-blue fw-700" style="font-size: 1.5rem;">입출고 내역</span>
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
        <div class="fade-in-3s w-500">
          <div class="font-mont tut-title blue-gradient">
            <span>INVENTORY<br>LISTS</span>
          </div>
          <div class="tut-contents">
            <ul>
              <li>입출고 내역과 상품 목록을 확인해보세요.</li>
              <li>새로운 항목의 등록, 수정, 삭제가 가능합니다.</li>
              <li>달이 끝나면 입출고 기록 마감 기능도 제공합니다.</li>
            </ul>
          </div>
          <div class="flex-align-center" style="margin-top: 35px;">
            <v-btn
              text
              icon
              color="#3c7096"
              width="60px"
              height="60px"
              @click="toPrevPage()"
              class="box-shadow"
            >
              <v-icon size="60px">mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              text
              icon
              color="#3d7197"
              width="60px"
              height="60px"
              @click="toNextPage()"
              class="box-shadow ml-20"
            >
              <v-icon size="60px">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Page 5 거의끝-->
    <div v-if="page_5_show" id="page_5">
      <div class="section flex-center">
        <div class="slide-in-blurred-top-1s font-mont">
          <span class="tut-title blue-gradient">거의 다 끝났습니다!</span>
        </div>
      </div>
    </div>

    <!-- Page 6 재고 시작월 등록-->
    <div v-if="page_6_show" id="page_6">
      <div class="main-section flex-center fade-in-1s">
        <div class="flex-right pr-50">
          <div class="bgImgFrame bg-pan-left" style="background-image: linear-gradient(45deg, #1a3a5e, #0eb0d6, #c1e9f2);">
            <div class="bgImg">
              <img class="kenburns-top" src="@/assets/tutorial_bg_1.png" width="500px">
            </div>
          </div>
        </div>
        <div class="fade-in-1s">
          <span class="tut-title blue-gradient">언제부터 재고 기록을<br></span>
          <span class="tut-title blue-gradient">시작하시나요?</span>
          <div style="margin-top: 50px; font-size: 1.7rem;">
            <v-app>
              <v-select
                label="연도"
                solo
                flat
                style="width: 120px; height: 52px; border-radius: 10px; margin-right: 15px;"
                class="box-shadow"
                :items="[2020, 2021, 2022, 2023]"
                v-model="year"
              ></v-select>
              <span>년 </span>
              <v-select
                label="월"
                solo
                flat
                style="width: 80px; height: 52px; border-radius: 10px; margin: 0px 15px 0px 30px;"
                class="box-shadow"
                :items="[1,2,3,4,5,6,7,8,9,10,11,12]"
                v-model="month"
              ></v-select>
              <span>월 부터</span>
            </v-app>
            <p style="margin-top: 10px"><b>재고관리 시스템</b>을 시작합니다.</p>
          </div>
          <div class="flex-align-center" style="margin-top: 50px;">
            <span class="fade-in-2s fw-700 blue-gradient" style="font-size: 2.5rem; margin-right: 20px;">시작하기</span>
            <v-btn
              text
              icon
              color="#1d7498"
              width="70px"
              height="70px"
              style="margin-top:5px; margin-left: 10px;"
              @click="setFirstEnd()"
              class="slide-in-left-3s box-shadow"
            >
              <v-icon size="60px">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Page 7 시작합니다-->
    <div v-if="page_7_show" id="page_7">
      <div class="section flex-center">
        <div class="slide-in-blurred-top-1s font-mont">
          <span class="tut-title blue-gradient">시작합니다.</span>
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
      page_6_show: false,
      page_7_show: false,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
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
        setTimeout(()=>{
          this.page_6_show = true
          document.getElementById("page_5").classList.add("slide-out-left");
          setTimeout(()=>{
            this.page_5_show = false
            this.current_page++
          }, 500)
        }, 3000)
      } else if (this.current_page=== 6) {
        this.page_7_show = true
        document.getElementById("page_6").classList.add("slide-out-left");
        setTimeout(()=>{
          this.page_6_show = false
        }, 500)
        setTimeout(()=>{
          window.location.href="/"
        }, 3000)
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
      } else if (this.current_page=== 7) {
        this.page_6_show = true
        document.getElementById("page_7").classList.add("slide-out-right");
        setTimeout(()=>{
          this.page_7_show = false
        }, 500)
      }

      setTimeout(()=>{
        this.current_page--
      }, 500)
    },
    // 최초 마감월 설정
    setFirstEnd () {
      const lastDay = new Date(this.year, this.month, 0).getDate();
      const date = this.month < 10 ? 
        this.year + '-0' + this.month + '-' + lastDay : 
        this.year + '-' + this.month + '-' + lastDay
      const url = `${process.env.VUE_APP_API}/closing-first/inventory/${date}`;
      this.$axios.post(url
      ).then((res) => {
        this.toNextPage()
      }).catch((error) => {
        console.log(error);
      })
    },
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
.body-padding {
  width: 100% !important;
  margin-left: 0 !important;
}
.v-application--wrap {
  min-height: auto;
  max-width: fit-content;
  flex-direction: row;
  display: flex;
  align-items: center;
}
.v-menu__content {
  border-radius: 10px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.12);
}
.v-label {
  font-size: 1.8rem;
}
.v-input {
  font-size: 20px;
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
</style>