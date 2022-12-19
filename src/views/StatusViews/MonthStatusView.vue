<template>
  <body class="body-padding">
    <MonthStatus :filterData="filterData"></MonthStatus>
  </body>
</template>

<script>
import MonthStatus from '@/components/StatusComponents/MonthStatus.vue'

export default {
  components: {
    MonthStatus
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
