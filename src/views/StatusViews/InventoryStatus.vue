<template>
  <body class="body-padding">
    <StatusFilterBox></StatusFilterBox>
    <InventoryStatus></InventoryStatus>
  </body>
</template>

<script>
import StatusFilterBox from '@/components/StatusFilterBox.vue'
import InventoryStatus from '@/components/StatusComponents/InventoryStatus.vue'

export default {
  components: {
    StatusFilterBox,
    InventoryStatus
  }
}
</script>
