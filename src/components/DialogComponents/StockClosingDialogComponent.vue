<template>
<div class="flex-center">
  <v-form>
    <div class="text-center" style="margin-bottom: 5px">
      <v-dialog
        v-model="dialog"
        persistent
        width="600"
      >
        <v-alert
          v-model="alert"
          close-text="Close Alert"
          :color=alertType.color
          :type=alertType.type
          alertType.background
          :style="{top: alertHeight}"
          class="slide-in-blurred-top dialog-alert"
        >
          {{ alertType.msg }}
        </v-alert>
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
                {{ year }}년 {{ month }}월 입출고 등록을 {{ type }}하시겠습니까?
              </span>
            </div>
            <div class="tx-center close-lower">
              <ul v-if="type==='마감'">
                <li>
                  마감하신 이후에는 해당 월에 더 이상 입출고 등록 및 수정을 할 수 없습니다.
                </li>
                <li>
                  수정과 등록을 위해서는 해당 월 마감을 해제해야 합니다.
                </li>
              </ul>
              <ul v-if="type==='마감 해제'">
                <li>
                  마감을 해제하시면 해당 월에 입출고 등록 및 수정이 가능합니다.
                </li>
                <li>
                  필요한 작업을 마친 후에는 해당 월 입출고 마감을 다시 완료해주세요.
                </li>
              </ul>
            </div>

          <div class="flex-center" style="height:100px">
            <v-btn
            v-if="type==='마감'"
            width="130"
            height="50"
            color="#254359"
            rounded
            dark
            @click="closeStock()">
              <mini-loader-component v-if="inRequest"/>
              <span v-else style="font-size: 1.2rem">마감</span>
            </v-btn>
            <v-btn
            v-else
            width="180"
            height="50"
            color="#254359"
            rounded
            dark
            @click="CancelCloseStock()">
              <mini-loader-component v-if="inRequest"/>
              <span v-else style="font-size: 1.2rem">마감 해제</span>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </v-form>
</div>
</template>

<script>
import MiniLoaderComponent from '../MiniLoaderComponent.vue'
/* eslint-disable */
export default {
  name: 'StockClosingDialog',
  components: {MiniLoaderComponent},
  props: {
    year: {
      type: Number
    },
    month: {
      type: Number
    },
    type: {
      type: String
    },
    filterData: {
      type: Object
    },
  },
  watch: {},
  data () {
    return {
      dialog: true,
      alert: false,
      alertType: {
        msg: "알림",
        type : "error",
        background : "dark",
        color : "#254359"
      },
      alertHeight: window.innerHeight/2 - 234 + 'px',
      inRequest: false
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
      localStorage.setItem("filterData", JSON.stringify(this.filterData))
      this.inRequest = true;

      const lastDay = new Date(this.year, this.month, 0).getDate();
      const month = this.month < 10 ? "0"+this.month : this.month
      const date = this.year + "-" + month + "-" + lastDay
      this.$axios.post(`${process.env.VUE_APP_API}/closing/inventory/${date}`).then((res) => {
        this.alertType = {
          msg: `${this.year}년 ${this.month}월 재고 마감이 완료되었습니다.`,
          type : "success",
          background : "light",
          color : "green"
        }
        this.alert = true
        setTimeout(() => {
          this.dialog = false
          window.location.reload()
        }, 1500);
      }).catch((error) => {
        console.log(error);
        this.alertType.color="#c41230"
        this.alertType.msg=error.response.data.message
        this.alert=true
        this.inRequest=false
      })
    },
    // 마감 해제
    CancelCloseStock () {
      localStorage.setItem("filterData", JSON.stringify(this.filterData))
      this.inRequest = true
      
      const lastDay = new Date(this.year, this.month, 0).getDate();
      const month = this.month < 10 ? "0"+this.month : this.month
      const date = this.year + "-" + month + "-" + lastDay
      this.$axios.delete(`${process.env.VUE_APP_API}/closing/inventory/${date}`).then((res) => {
        this.alertType = {
          msg: `${this.year}년 ${this.month}월 재고 마감이 해제되었습니다.`,
          type : "success",
          background : "light",
          color : "green"
        }
        this.alert = true
        setTimeout(() => {
          this.dialog = false
          window.location.reload()
        }, 1500);
      }).catch((error) => {
        console.log(error);
        this.alertType.color="#c41230"
        this.alertType.msg=error.response.data.message
        this.alert=true
        this.inRequest=false
      })
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