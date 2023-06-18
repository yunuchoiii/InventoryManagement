<template>
  <body class="d-flex h-100">
    <div id="navBar" class="navBar" v-if="$route.name !== 'Tutorial'">
      <button id="menuBtn" class="menu-btn flex-center box-shadow" @click="toggleMenu()">
        <img src="../src/assets/double_arrows.png" alt="">
      </button>
      <div class="tx-center pos-rel" style="height: 160px;">
        <a href="/" class="w-100 flex-center">
          <img id="logo" src="@/assets/logo.png" alt="" class="nav-logo">
        </a>
        <div class="pos-rel w-100 navTextBox">
          <p class="navText long">재고 관리 시스템</p>
          <p class="navText short font-mont">Inventory<br/>Service</p>
        </div>
      </div>
      <div class="navDivider"></div>
      <div class="w-100" style="display: inline-grid;">
        <v-btn text tile class="navBtn" href="/status/inventory">
          <img src="@/assets/nav-1.png" alt="" class="nav-icon">
          <div>현 재고 현황</div>
        </v-btn>
        <v-btn text tile class="navBtn" href="/status/monthly">
          <img src="@/assets/nav-2.png" alt="" class="nav-icon">
          <div>월간 재고 현황</div>
        </v-btn>
        <v-btn text tile class="navBtn" href="/status/inbound">
          <img src="@/assets/nav-3.png" alt="" class="nav-icon">
          <div>월간 입고 현황</div>
        </v-btn>
        <v-btn text tile class="navBtn" href="/status/outbound">
          <img src="@/assets/nav-4.png" alt="" class="nav-icon">
          <div>월간 출고 현황</div>
        </v-btn>
      </div>
      <div class="navDivider"></div>
      <div class="w-100" style="display: inline-grid;">
        <v-btn text tile class="navBtn" href="/list/inbound">
          <img src="@/assets/nav-5.png" alt="" class="nav-icon">
          <div>입고 내역</div>
        </v-btn>
        <v-btn text tile class="navBtn" href="/list/outbound">
          <img src="@/assets/nav-6.png" alt="" class="nav-icon">
          <div>출고 내역</div>
        </v-btn>
        <v-btn text tile class="navBtn" href="/list/product">
          <img src="@/assets/nav-7.png" alt="" class="nav-icon">
          <div>상품 목록</div>
        </v-btn>
      </div>
      <div class="nav-footer">
        <span>Copyright 2023.<br>yunuchoiii · cl-kim <br>All Rights Reserved.</span>
      </div>
    </div>
    <div class="body-padding">
      <router-view></router-view>
    </div>
  </body>

</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex';

export default {
  name: 'NavBar', 
  mounted () {
    this.checkPathname()
    this.checkNavClosed()
  },
  created () {},
  data () {
    return {}
  },
  methods: {
    beforeDestroy () {
      localStorage.removeItem('isOpened');
    },
    checkPathname () {
      const pathname = window.location.pathname;
      const btnElements = document.querySelectorAll('.navBtn');

      btnElements.forEach((btnElement) => {
        const href = btnElement.getAttribute('href');
        if (href == pathname) {
          btnElement.classList.add("clicked")
        }
      });
    },
    checkNavClosed () {
      const navBar = document.getElementById("navBar");
      const bodyPadding = document.querySelector(".body-padding");
      
      const isOpened = localStorage.getItem('isOpened') === 'false' ? false : true;

      if (!isOpened) {
        navBar.classList.add('closed')
        bodyPadding.classList.add('closed')
      } else {
        navBar.classList.remove('closed')
        bodyPadding.classList.remove('closed')
      }

    },
    toggleMenu() {
      const navBar = document.getElementById("navBar");
      const bodyPadding = document.querySelector(".body-padding");

      const isOpened = navBar.classList.contains("closed");

      // 메뉴 열기/닫기에 따른 스타일 변경
      navBar.classList.toggle("closed");
      bodyPadding.classList.toggle("closed");

      bodyPadding.style.marginLeft = isOpened ? "200px" : "62px";
      bodyPadding.style.width = isOpened ? "calc(100% - 200px)" : "100%";

      localStorage.setItem('isOpened', isOpened);
    }
  }
}
</script>

<style>
@import "@/styles/styles.css";
.hidden {
  visibility: hidden;
}
#navBar .v-btn:not(.v-btn--round).v-size--default {
  height: auto;
  padding: 8px 18px 11px;
  /* transition: all 0.2s ease; */
  margin-top: 2px;
  margin-bottom: 2px;
  min-width: 0;
}
#navBar .v-btn:not(.v-btn--round).v-size--default:hover {
  background-color: #325c7c;
  border-radius: 10px;
  width: 180px;
  margin: 2px 10px;
  padding: 8px 8px 11px;
  transition: width 0.5s ease, background-color 0.3s ease;
}
#navBar.closed .v-btn:not(.v-btn--round).v-size--default:hover, .closed .clicked{
  width: 41px !important;
}
#navBar .theme--light.v-btn:hover::before {
  opacity: 0;
}
</style>
