<template>
  <body style="padding-bottom: 10px">
    <div class="head-box">
      <div class="title-box">
        <span>{{title}}</span>
      </div>
      <div class="filter-box">
        <div v-if="yearShow==true" class="filter-card">
          <div class="flex-center filter-text" style="margin-left: 8px">
            연도
          </div>
          <select v-model="selectedYear" class="filter-select">
            <option value="" disabled selected>Year</option>
            <option v-for="option in years" :value="option" :key="option">
              {{ option }}년
            </option>
          </select>
        </div>
        <div v-if="monthShow == true" class="filter-card" style="margin-right: 20px;">
          <div class="flex-center filter-text">
            월별
          </div>
          <select v-model="selectedMonth" class="filter-select">
            <option value="" disabled selected>Month</option>
            <option v-for="option in months" :value="option" :key="option">
              {{ option }}월
            </option>
          </select>
        </div>
        <v-divider v-if="monthShow == true || yearShow == true"
          vertical
        ></v-divider>
        <div class="filter-card" style="margin-left: 8px;">
          <div class="flex-center filter-text">
            구분
          </div>
          <select v-model="selectedCategory" class="filter-select">
            <option value="" disabled selected>Category</option>
            <option v-for="option in categories" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="filter-card">
          <div class="flex-center filter-text">
            품목
          </div>
          <select v-model="selectedItem" class="filter-select">
            <option value="" disabled selected>Item</option>
            <option v-for="option in items" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div>
          <v-btn
            elevation="2"
            height="30px"
            width="50px"
            color="#3F5473"
            @click="submitFilter()"
          >
            <span style="color: white; font-size: 15px; font-weight:700; margin-left: 5px;">조회</span>
          </v-btn>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
/* eslint-disable */
export default {
  name: 'StatusFilterBox',
  components: {},
  props: {
    title: {
      type: String,
      required: true
    },
    yearShow: {
      type: Boolean,
      default: true
    },
    monthShow: {
      type: Boolean,
      default: true
    },
  },
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
      filterData: {}
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
      this.filterData = {
        year: this.selectedYear,
        month: this.selectedMonth,
        category: this.selectedCategory,
        item: this.selectedItem
      }
      this.$emit('filterData', this.filterData)
    }
  }
}
</script>
<style>
/* eslint-disable */
@import '@/styles/styles.css';
</style>
