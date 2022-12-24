<template>
  <body>
    <div class="title-box">
      <button @click="reload()"><span>{{title}}</span></button>
      <!-- 입출고, 상품 등록 팝업 -->
      <div v-if="register" data-aos="fade-left">
        <RegisterDialog
        :register_name="register_name"
        :categories="categories"
        :items="items"/>
      </div>
    </div>
    <div class="head-box box-shadow">
      <div style="display: flex; align-items: center; justify-content: flex-end; height: 5vh; margin-left: 0.7vh">
        <div v-if="register" class="flex-center">
        </div>
        <div v-else>
          뭘로 채우지?
        </div>
      </div>
      <div class="filter-box">
        <div v-if="date_range" class="filter-card">
          <div class="flex-center filter-text" style="margin-left: 8px">
            기간
          </div>
        </div>
        <div v-if="year_show" class="filter-card">
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
        <div v-if="month_show" class="filter-card" style="margin-right: 20px;">
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
        <v-divider v-if="month_show || year_show"
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
            elevation="0"
            height="4vh"
            width="50px"
            color="#3F5473"
            @click="submitFilter()"
          >
            <span style="color: white; font-size: 15px; font-weight:700; line-height: 14px;">조회</span>
          </v-btn>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
/* eslint-disable */
import RegisterDialog from '@/components/DialogComponent.vue'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'FilterBoxComponent',
  components: {RegisterDialog},
  props: {
    title: {
      type: String,
      required: true
    },
    year_show: {
      type: Boolean,
      default: true
    },
    month_show: {
      type: Boolean,
      default: true
    },
    date_range: {
      type: Boolean,
      default: false
    },
    register: {
      type: Boolean,
      default: false
    },
    register_name: {
      type: String
    }
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
      items: ['a','b','c'],
      filterData: {},
    }
  },
  setup () {},
  created () {
    this.selectedYear = new Date().getFullYear()
  },
  mounted () {
    AOS.init()
  },
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
    },
    reload () {
      location.reload()
    }
  }
}
</script>
<style>
/* eslint-disable */
@import '@/styles/styles.css';
.v-application--wrap {
  min-height: 0vh !important;
}
.theme--light.v-application {
  background: transparent;
}
.v-dialog {
  box-shadow: none !important;
}
</style>
