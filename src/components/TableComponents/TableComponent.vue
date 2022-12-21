<template>
  <body>
    <div class="box-shadow" style="border-radius: 10px; overflow: hidden">
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
            <tr>
              <td v-for="item in datas" :key="item">{{ item }}</td>
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
  name: 'InventoryStatus',
  components: {StatusFilterBox},
  props: {
    headers: {
      type: Array,
      required: true
    },
    datas: {
      type: Array,
      required: true
    },
    filterData: {
      type: Object
    },
  },
  data () {
    return {
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
      console.log(this.filterData)
    },
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
