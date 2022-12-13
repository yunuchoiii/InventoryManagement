<template>
  <body style="display: flex">
    <div v-if="clicked == true" style="width: 80%">
      <h1>그래프</h1>
    </div>
    <div style="width: 100%">
      <v-simple-table
      fixed-header
      height="500px">
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
            <tr>
              <td v-for="item in datas"
              :key="item" @click="showGraph()">{{ item }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </body>
</template>
<script>
/* eslint-disable */
export default {
  name: 'InventoryStatus',
  components: {},
  props: {
    filterData: Object
  },
  data () {
    return {
      clicked: false,
      headers: ['구분', '물품', '물품코드', '전월 재고', '현 재고'],
      datas: ['세제', 'EV-1',	1,	6,	-19]
    }
  },
  watch: {
    filterData () {
      console.log(this.filterData)
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    showGraph () {
      this.clicked = true
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
