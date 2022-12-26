<template>
  <v-app>
    <div class="box-shadow" style="border-radius: 10px; overflow: hidden">
      <v-simple-table
      fixed-header
      height="79vh">
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
            <tr @click="editItem()">
              <td v-for="item in datas" :key="item">{{ item }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <EditDialogComponentVue
    v-if="edit_dialog == true"
    @edit_dialog="closeDialog()"
    :register_name="register_name"/>
  </v-app>
</template>
<script>
/* eslint-disable */
import EditDialogComponentVue from './EditDialogComponent.vue'

export default {
  name: 'InventoryStatus',
  components: {EditDialogComponentVue},
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
    register_name: {
      type: String
    },
    edit_dialog: {
      type: Boolean
    }
  },
  data () {
    return {}
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
    editItem() {
      this.edit_dialog = true
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
