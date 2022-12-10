<template>
  <div class="navBar">
    <div style="text-align: center">
      <img src="@/assets/oneshot_logo.png" alt="" width="100%">
      <p class="navText" style="font-size: 15px;">재고관리 시스템</p>
    </div>
    <div class="navDivider"></div>
    <div>
      <a href="">
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
</template>

<script>

export default {
  name: 'NavBar',

  data: () => ({
    //
  })
}
</script>
<style>
@import "@/styles/styles.css";

html, body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
</style>
