<template>
  <body style="height: 100%;">
    <div class="navBar">
      <div style="text-align: center">
        <a href="/"><img src="@/assets/logo.png" alt="" width="70%"></a>
        <a href="/">
          <p class="navText">재고 관리 시스템</p>
        </a>
      </div>
      <div class="navDivider"></div>
      <div style="display: inline-grid;">
        <v-btn text tile width="190" class="navBtn" href="/status/inventory/">
          <img src="https://cdn-icons-png.flaticon.com/512/2769/2769160.png" alt="" class="nav-icon">
          현 재고 현황
        </v-btn>
        <v-btn text tile width="190" class="navBtn" href="/status/months/">
          <img src="https://cdn-icons-png.flaticon.com/512/2401/2401234.png" alt="" class="nav-icon">
          월간 재고 현황
        </v-btn>
        <v-btn text tile width="190" class="navBtn" href="">
          <img src="https://cdn-icons-png.flaticon.com/512/8944/8944312.png" alt="" class="nav-icon">
          입고 현황
        </v-btn>
        <v-btn text tile width="190" class="navBtn" href="">
          <img src="https://cdn-icons-png.flaticon.com/512/8944/8944313.png" alt="" class="nav-icon">
          출고 현황
        </v-btn>
      </div>
      <div class="navDivider"></div>
      <div style="display: inline-grid;">
        <v-btn text tile width="190" class="navBtn" href="/list/input/">
          <img src="https://cdn-icons-png.flaticon.com/512/4211/4211448.png" alt="" class="nav-icon">
          입고 리스트
        </v-btn>
        <v-btn text tile width="190" class="navBtn" href="">
          <img src="https://cdn-icons-png.flaticon.com/512/4211/4211448.png" alt="" class="nav-icon">
          출고 리스트
        </v-btn>
      </div>
      <div class="navDivider"></div>
      <div style="display: inline-grid;">
        <v-btn text tile width="190" class="navBtn" href="">
          <img src="https://cdn-icons-png.flaticon.com/512/8572/8572537.png" alt="" class="nav-icon">
          상품 리스트
        </v-btn>
      </div>
      <div class="icon-box">
        <a href=""><img src="@/assets/setting_icon.png" alt="" width="25px" style="filter: invert(90%);"></a>
        <a href=""><img src="@/assets/logout_icon.png" alt="" width="25px" style="filter: invert(90%);"></a>
      </div>
    </div>
    <router-view></router-view>
  </body>

</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
@import "@/styles/styles.css";
</style>
