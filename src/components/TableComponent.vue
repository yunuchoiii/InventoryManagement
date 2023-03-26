<template>
  <v-app>
    <div class="box-shadow" style="border-radius: 10px; overflow: hidden;">
      <v-simple-table
      fixed-header
      :height="this.tableHeight">
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
              <td class="memo">{{ item.memo }}</td>
            </tr>
          </tbody>
          <tbody v-if="register_name == '입고'">
            <tr v-for="(item, index) in datas" :key="index" @click="editItem(index)">
              <td>{{ index + 1 }}</td>
              <td>{{ item.categoryName }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.productCode }}</td>
              <td>{{ item.inBoundDate }}</td>
              <td>{{ item.quantity }}</td>
              <td class="memo">{{ item.memo }}</td>
            </tr>
          </tbody>
          <tbody v-if="register_name == '출고'">
            <tr v-for="(item, index) in datas" :key="index" @click="editItem(index)">
              <td>{{ index + 1 }}</td>
              <td>{{ item.categoryName }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.productCode }}</td>
              <td>{{ item.outBoundDate }}</td>
              <td>{{ item.customer }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.quantity }}</td>
              <td class="memo">{{ item.memo }}</td>
            </tr>
          </tbody>
          <tbody v-if="title == '현 재고 현황' && render === true">
            <tr v-for="(item, index) in datas" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ item.categoryName }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.productCode }}</td>
              <!-- <td v-for="data in item.quantity" :key="data">{{ data }}</td> -->
              <td v-for="data in item.quantity" :key="data">{{ data }}</td>
            </tr>
          </tbody>
          <tbody v-if="title == '월간 재고 현황'">
            <tr v-for="(item, index) in datas" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ item.categoryName }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.productCode }}</td>
              <td v-for="data in monthData[index]" :key="data">{{ data }}</td>
            </tr>
          </tbody>
          <tbody v-if="title == '월간 입고 현황' || title == '월간 출고 현황'">
            <tr v-for="(item, index) in datas" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ item.categoryName }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.productCode }}</td>
              <td v-for="data in monthData[index]" :key="data">{{ data }}</td>
            </tr>
          </tbody>
          <!-- 더 보기 버튼 -->
          <tr v-if="register_name == '입고' || register_name == '출고'">
            <td colspan='20'>
              <v-btn
                v-if="!isEmpty"
                text
                color="#346181"
                @click="emitPaging()">
                more
              </v-btn>
              <div v-else class="flex-center" style="height: 50px">
                <span style="color:rgba(0, 0, 0, 0.5); font-size: 0.8rem">
                  더 이상 검색 결과가 없습니다.
                </span>
              </div>
            </td>
          </tr>
        </template>
      </v-simple-table>
    </div>
    <EditDialogComponentVue
    v-if="edit_dialog == true"
    @edit_dialog="closeDialog()"
    :register_name="register_name"
    :itemInfo="itemInfo"
    :filterData="filterData"
    />
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
    monthData: {
      type: Array,
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
    isEmpty : {
      type: Boolean,
      default: false
    },
    render: {
      type: Boolean
    },
  },
  data () {
    return {
      itemInfo: {},
      paging: 0,
      tableHeight: (window.innerHeight - 150) + "px"
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
    },
    emitPaging () {
      this.paging ++
      this.$emit("paging", this.paging)
    },
    getCategoryName(categoryCode) {
      switch (categoryCode) {
        case '00':
          return '세제';
        case '01':
          return '방향제';
        case '02':
          return '광택제';
        case '03':
          return '말통';
        case '04':
          return '박스';
        default:
          return '';
      }
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
.memo {
  white-space: nowrap;
    max-width: 5vw;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
