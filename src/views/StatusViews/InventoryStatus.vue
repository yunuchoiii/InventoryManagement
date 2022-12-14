<template>
  <body class="body-padding">
    <StatusFilterBox
    @filterData="filterEvent"
    :title="title"
    :monthShow="true" ></StatusFilterBox>
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
      filterData: {},
      title: '현 재고 현황'
    }
  },
  methods: {
    filterEvent (data) {
      this.filterData = data
    }
  }
}
</script>
