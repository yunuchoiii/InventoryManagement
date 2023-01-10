<template>
  <v-app>
    <div class="box-shadow" style="border-radius: 10px; overflow: hidden">
      <v-simple-table
      fixed-header
      height="79vh"
      :key="this.componentKey">
        <template v-slot:default>
          <thead>
            <tr>
              <th
              v-for="item in headers"
              :key="item"
              style="font-size: 1rem">
                {{item}}
              </th>
            </tr>
          </thead>
          <tbody v-if="register_name == '상품'">
            <tr v-for="(item, index) in datas" :key="index" @click="editItem(index)">
              <td>{{ index + 1 }}</td>
              <td>{{ item.categoryName }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.productCode }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.amount }} {{item.productUnit}}</td>
              <td>{{ item.productStatus }}</td>
              <td>{{ item.memo }}</td>
            </tr>
          </tbody>
          <tbody v-if="register_name == '입고'">
            <tr v-for="(item, index) in datas" :key="index" @click="editItem(index)">
              <td>{{ index + 1 }}</td>
              <td>{{ item.categoryName }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.productCode }}</td>
              <td>{{ item.inStockDate }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.memo }}</td>
            </tr>
          </tbody>
          <tbody v-if="register_name == '출고'">
            <tr v-for="(item, index) in datas" :key="index" @click="editItem(index)">
              <td>{{ index + 1 }}</td>
              <td>{{ item.categoryName }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.productCode }}</td>
              <td>{{ item.outStockDate }}</td>
              <td>{{ item.customer }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.memo }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <EditDialogComponentVue
    v-if="edit_dialog == true"
    @edit_dialog="closeDialog()"
    :register_name="register_name"
    :itemInfo="itemInfo"/>
  </v-app>
</template>
<script>
/* eslint-disable */
import EditDialogComponentVue from '@/components/DialogComponents/EditDialogComponent.vue'

export default {
  name: 'InventoryStatus',
  components: {EditDialogComponentVue},
  props: {
    title : {
      type: String
    },
    register_name: {
      type: String
    },
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
    register_name: {
      type: String
    },
    edit_dialog: {
      type: Boolean
    },
    componentKey: {
      type: Number
    }
  },
  data () {
    return {
      itemInfo: {}
    }
  },
  watch: {},
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    editItem(index) {
      this.itemInfo = this.datas[index]
      if (this.title == '출고 내역' || this.title == '입고 내역' || this.title == '상품 목록') {
        this.edit_dialog = true
      }
    },
    closeDialog (data) {
      this.edit_dialog = data
    }
  }
}
</script>
<style>
/* eslint-disable */
@import '@/styles/styles.css';
.v-application--is-ltr .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-application--is-ltr .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-application--is-ltr .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  text-align: center;
}
</style>
