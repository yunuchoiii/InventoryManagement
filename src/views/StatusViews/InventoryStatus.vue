<template>
  <body class="body-padding">
    <StatusFilterBox @filterData="filterEvent"></StatusFilterBox>
    <InventoryStatus :filterData="filterData"></InventoryStatus>
  </body>
</template>

<script>
import StatusFilterBox from '@/components/StatusFilterBox.vue'
import InventoryStatus from '@/components/StatusComponents/InventoryStatus.vue'

export default {
  components: {
    StatusFilterBox,
    InventoryStatus
  },
  data () {
    return {
      filterData: {}
    }
  },
  methods: {
    filterEvent (data) {
      this.filterData = data
    }
  }
}
</script>
