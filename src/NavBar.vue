<template>
  <body style="height: 100%;">
    <div class="navBar">
      <div style="text-align: center">
        <a href="/"><img src="@/assets/logo.png" alt="" width="100%"></a>
        <a href="/"><p class="navText" style="font-size: 15px;">재고관리 시스템</p></a>
      </div>
      <div class="navDivider"></div>
      <div>
        <a href="/status/inventory">
          <p class="navText">재고 현황</p>
        </a>
        <a href="">
          <p class="navText">입고 현황</p>
        </a>
        <a href="">
          <p class="navText">출고 현황</p>
        </a>
      </div>
      <div class="navDivider"></div>
      <div>
        <a href="">
          <p class="navText">입고 리스트</p>
        </a>
        <a href="">
          <p class="navText">출고 리스트</p>
        </a>
      </div>
      <div class="navDivider"></div>
      <div>
        <a href="">
          <p class="navText">상품 등록</p>
        </a>
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
