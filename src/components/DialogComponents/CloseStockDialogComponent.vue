<template>
<div class="flex-center">
  <v-form>
    <div class="text-center" style="margin-bottom: 5px">
      <v-dialog
        v-model="dialog"
        persistent
        width="500"
      >
        <v-card style="border-radius: 20px">
          <div class="flex-center dialog-titlebox">
            재고 {{type}}
          </div>
          <div style="position: absolute; top: 10px; right: 10px;" >
            <v-btn
              icon
              dark
              @click="closeDialog()"
            >
              <v-icon color="black">mdi-close</v-icon>
            </v-btn>
          </div>

            <div class="tx-center close-upper">
              <span>
                {{ year }}년 {{ month }}월 {{ title }} 등록을 {{ type }}하시겠습니까?
              </span>
            </div>
            <div class="tx-center close-lower">
              <ul v-if="type==='마감'">
                <li>
                  마감하신 이후에는 해당 월에 더 이상 {{ title }} 등록 및 수정을 할 수 없습니다.
                </li>
                <li>
                  수정과 등록을 위해서는 해당 월 마감을 해제하여야 합니다.
                </li>
              </ul>
              <ul v-if="type==='마감 해제'">
                <li>
                  마감을 해제하시면 해당 월에 {{ title }} 등록 및 수정이 가능합니다.
                </li>
                <li>
                  필요한 작업을 마친 후에는 해당 월 {{ title }} 마감을 다시 완료해주세요.
                </li>
              </ul>
            </div>

          <div class="flex-center" style="height:100px">
            <v-btn
            width="130"
            height="40"
            color="#254359"
            rounded
            dark
            @click="closeStock()">
              <span style="font-size: 1.2rem">마감</span>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </v-form>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'CloseStockDialog',
  components: {},
  props: {
    title: {
      type: String
    },
    year: {
      type: Number
    },
    month: {
      type: Number
    },
    type: {
      type: String
    },
  },
  watch: {},
  data () {
    return {
      dialog: true,
    }
  },
  setup () {},
  created () {
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 모달창 닫기
    closeDialog(){
      this.dialog = false
      this.$emit("CloseDialog", false)
      setTimeout(()=>{this.dialog = true}, 300)
    },
    // 마감 등록
    closeStock () {
      
    }
  }
}
</script>
<style>
.v-dialog > .v-card > .v-card__text {
  padding: 20px 24px 0px;
}
.v-application ul, .v-application ol {
    padding-left: 0;
}
li {
  list-style: none;
}
.close-upper {
  padding: 20px 0px;
  font-size: 1.1rem;
}
.close-lower {
  padding: 10px 00px;
  font-size: 0.9rem;
  line-height: 1.8rem;
}
</style>