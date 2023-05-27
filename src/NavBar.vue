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
        <a href="/">
          <p class="navText">재고 <br class="break"/>관리 <br class="break"/>시스템</p>
        </a>
      </div>
      <div class="navDivider"></div>
      <div class="w-100" style="display: inline-grid;">
        <v-btn text tile class="navBtn" href="/status/inventory">
          <img src="https://cdn-icons-png.flaticon.com/512/2312/2312686.png" alt="" class="nav-icon">
          <div>현 재고 현황</div>
        </v-btn>
        <v-btn text tile class="navBtn" href="/status/monthly">
          <img src="https://cdn-icons-png.flaticon.com/512/4227/4227865.png" alt="" class="nav-icon">
          <div>월간 재고 현황</div>
        </v-btn>
        <v-btn text tile class="navBtn" href="/status/inbound">
          <img src="https://cdn-icons-png.flaticon.com/512/8901/8901382.png" alt="" class="nav-icon">
          <div>월간 입고 현황</div>
        </v-btn>
        <v-btn text tile class="navBtn" href="/status/outbound">
          <img src="https://cdn-icons-png.flaticon.com/512/8901/8901383.png" alt="" class="nav-icon">
          <div>월간 출고 현황</div>
        </v-btn>
      </div>
      <div class="navDivider"></div>
      <div class="w-100" style="display: inline-grid;">
        <v-btn text tile class="navBtn" href="/list/inbound">
          <img src="https://cdn-icons-png.flaticon.com/512/7794/7794603.png" alt="" class="nav-icon">
          <div>입고 내역</div>
        </v-btn>
        <v-btn text tile class="navBtn" href="/list/outbound">
          <img src="https://cdn-icons-png.flaticon.com/512/7794/7794607.png" alt="" class="nav-icon">
          <div>출고 내역</div>
        </v-btn>
        <v-btn text tile class="navBtn" href="/list/product">
          <img src="https://cdn-icons-png.flaticon.com/512/8572/8572537.png" alt="" class="nav-icon">
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
    ...mapActions(['toggleNav']),
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
      } else {
        navBar.classList.remove('closed')
      }

      bodyPadding.style.marginLeft = isOpened ? "200px" : "62px";
      bodyPadding.style.width = isOpened ? "calc(100% - 200px)" : "100%";
    },
    toggleMenu() {
      this.toggleNav();

      const navBar = document.getElementById("navBar");
      const bodyPadding = document.querySelectorAll(".body-padding");
      const navBtnText = document.querySelectorAll('.navBtn div');
      const navFooter = document.querySelector('.nav-footer');

      const isOpened = navBar.classList.contains("closed");

      // 메뉴 열기/닫기에 따른 스타일 변경
      navBar.classList.toggle("closed");

      bodyPadding.forEach(body => {
        body.style.marginLeft = isOpened ? "200px" : "62px";
        body.style.width = isOpened ? "calc(100% - 200px)" : "100%";
      });

      navBtnText.forEach(text => {
        // text.classList.toggle("hidden", !isOpened);
        // text.classList.toggle("slide-in-right", isOpened);
        // text.classList.toggle("slide-out-right", !isOpened);
      });

      // navFooter.classList.toggle("slide-in-right", isOpened);
      // navFooter.classList.toggle("slide-out-right", !isOpened);

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
.closed .v-btn:not(.v-btn--round).v-size--default:hover, .closed .clicked{
  width: 41px !important;
}
#navBar .theme--light.v-btn:hover::before {
  opacity: 0;
}
.break {
  display: none;
}
.closed .break {
  display: block;
}
</style>
