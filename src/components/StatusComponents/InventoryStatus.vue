<template>
  <body>
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
            :key="item">{{ item }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
      headers: ['구분', '물품', '총 재고', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      datas: ['세제', 'EV-1',	1,	6,	-19,	11,	-11,	50,	-46,	66,	-11,	20,	-50,	-39,	24]
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
  methods: {}
}
</script>
<style>
/* eslint-disable */
@import '@/styles/styles.css';
td {
  text-align: center;
}
</style>
