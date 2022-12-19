<template>
  <body>
    <StatusFilterBox
    @filterData="filterEvent"
    :title="title"/>
    <div style="width: 100%;">
      <div style="display: flex; align-items: center; justify-content: flex-end;">
        <span style="font-size: 1.2rem; margin-right: 10px;">입고 등록 </span>
        <v-btn class="mx-2" fab dark small color="#f89929" elevation="0">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </div>
      <v-simple-table
      fixed-header
      height="80vh">
        <template v-slot:default>
          <thead>
            <tr>
              <th
              v-for="item in headers"
              :key="item"
              style="font-size: 1vw">
                {{item}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in datas" :key="item">
              <td>{{ item[0] }}</td>
              <td>{{ item[1] }}</td>
              <td>{{ item[2] }}</td>
              <td>{{ item[3] }}</td>
              <td>{{ item[4] }}</td>
              <td>{{ item[5] }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </body>
</template>
<script>
/* eslint-disable */
import StatusFilterBox from '@/components/StatusFilterBox.vue'
export default {
  name: 'InputList',
  components: {StatusFilterBox},
  props: {},
  data () {
    return {
      title: '입고 리스트',
      clicked: false,
      headers: ['구분', '물품', '물품코드', '날짜', '입고량', '비고'],
      datas: [
        ['세제', 'EV-1',	123048,	'2022-3-16', 20, ''],
      ],
      filterData: {}
    }
  },
  watch: {},
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    filterEvent (data) {
      this.filterData = data
    }
  }
}
</script>
<style>
/* eslint-disable */
@import '@/styles/styles.css';
td {
  text-align: center;
}
</style>
