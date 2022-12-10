<template>
  <body class="body-padding">
    <div class="head-box">
      <div class="title-box">
        <span>재고 현황</span>
      </div>
      <div class="filter-box">
        <div class="filter-card">
          <div class="flex-center">
            <span class="filter-text">연도</span>
          </div>
          <select v-model="selectedYear" class="select-box">
            <option value="" disabled selected>Years</option>
            <option v-for="option in years" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="filter-card">
          <div class="flex-center">
            <span class="filter-text">월별</span>
          </div>
          <select v-model="selectedMonth" class="select-box">
            <option value="" disabled selected>Months</option>
            <option v-for="option in months" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="filter-card">
          <div class="flex-center">
            <span class="filter-text">품목 분류</span>
          </div>
          <select v-model="selectedMonth" class="select-box">
            <option value="" disabled selected>Months</option>
            <option v-for="option in months" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="filter-card">
          <div class="flex-center">
            <span class="filter-text">품목명</span>
          </div>
          <select v-model="selectedMonth" class="select-box">
            <option value="" disabled selected>Months</option>
            <option v-for="option in months" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
export default {
  name: 'InventoryStatus',
  components: {},
  data () {
    return {
      selectedYear: '',
      years: ['2022', '2021', '2020', '2019', '2018'],
      selectedMonth: '',
      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
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
/* eslint-disable */
@import '@/styles/styles.css';
.head-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title-box {
  height: 40px;
  font-size: 32px;
  font-weight: 700;
  color: #4a4a4a;
}
.filter-box {
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
}
.filter-card {
  display: flex;
  margin-left: 15px;
}
.filter-text {
  font-size: 18px;
  font-weight: 700;
  color: #3F5473;
}
.select-box {
  margin-left: 10px;
  height: 30px;
  width: 100px;
  border-radius: 5px;
  text-align: center;
  background-color: white;
}
</style>
