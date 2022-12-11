<template>
  <body style="padding-bottom: 25px">
    <div class="head-box">
      <div class="title-box">
        <span>재고 현황</span>
      </div>
      <div class="filter-box">
        <div class="filter-card">
          <div class="flex-center">
            <span class="filter-text">연도</span>
          </div>
          <select v-model="selectedYear" class="filter-select">
            <option value="" disabled selected>Year</option>
            <option v-for="option in years" :value="option" :key="option">
              {{ option }}년
            </option>
          </select>
        </div>
        <div class="filter-card">
          <div class="flex-center">
            <span class="filter-text">월별</span>
          </div>
          <select v-model="selectedMonth" class="filter-select">
            <option value="" disabled selected>Month</option>
            <option v-for="option in months" :value="option" :key="option">
              {{ option }}월
            </option>
          </select>
        </div>
        <v-divider
          vertical
        ></v-divider>
        <div class="filter-card" style="margin-left: 2%;">
          <div class="flex-center">
            <span class="filter-text">구분</span>
          </div>
          <select v-model="selectedCategory" class="filter-select">
            <option value="" disabled selected>Category</option>
            <option v-for="option in categories" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="filter-card">
          <div class="flex-center">
            <span class="filter-text">물품</span>
          </div>
          <select v-model="selectedItem" class="filter-select">
            <option value="" disabled selected>Item</option>
            <option v-for="option in items" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div style="width: 10%">
          <v-btn
            elevation="2"
            height="30px"
            width="100%"
            color="#3F5473"
            @click="submitFilter()"
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
      selectedYear: new Date().getFullYear(),
      years: [2023, 2022, 2021, 2020, 2019],
      selectedMonth: '',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      selectedCategory: '',
      categories: ['세제', '방향제', '말통', '광택제', '박스'],
      selectedItem: '',
      items: [],
      filterList: {}
    }
  },
  setup () {},
  created () {
    this.selectedYear = new Date().getFullYear()
  },
  mounted () {},
  unmounted () {},
  methods: {
    submitFilter () {
      this.filterList = {
        year: this.selectedYear,
        month: this.selectedMonth,
        category: this.selectedCategory,
        item: this.selectedItem
      }
      this.$emit('filterData', this.filterList)
    }
  }
}
</script>
<style>
/* eslint-disable */
@import '@/styles/styles.css';
</style>
