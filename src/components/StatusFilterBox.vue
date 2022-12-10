<template>
  <body style="padding-bottom: 25px">
    <div class="head-box">
      <div class="title-box">
        <span>재고 현황</span>
      </div>
      <div class="filter-box">
        <div class="filter-card">
          <div class="flex-center w-35">
            <span class="filter-text">연도</span>
          </div>
          <select v-model="selectedYear" class="filter-select">
            <option value="" disabled selected>Years</option>
            <option v-for="option in years" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="filter-card">
          <div class="flex-center w-35">
            <span class="filter-text">월별</span>
          </div>
          <select v-model="selectedMonth" class="filter-select">
            <option value="" disabled selected>Months</option>
            <option v-for="option in months" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="filter-card">
          <div class="flex-center w-35">
            <span class="filter-text">품목 분류</span>
          </div>
          <select v-model="selectedMonth" class="filter-select">
            <option value="" disabled selected>Months</option>
            <option v-for="option in months" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="filter-card">
          <div class="flex-center w-35">
            <span class="filter-text">품목명</span>
          </div>
          <select v-model="selectedMonth" class="filter-select">
            <option value="" disabled selected>Months</option>
            <option v-for="option in months" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div style="width: 5%">
          <v-btn
            elevation="2"
            height="30px"
            width="100%"
            color="#3F5473"
          >
            <span style="color: white; font-size: 15px; font-weight:700">조회</span>
          </v-btn>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
export default {
  name: 'StatusFilterBox',
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
</style>
