<template>
<div class="flex-center">
  <v-app>
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
          <v-row align="center">
            <v-col class="grow">
              {{ alertType.msg }}
            </v-col>
            <v-col v-if="editConfirm" class="shrink">
              <v-btn
                light
                elevation="0"
                style="border-radius: 10px"
                @click="editItem()">수정</v-btn>
            </v-col>
            <v-col v-if="deleteConfirm" class="shrink">
              <v-btn
                light
                elevation="0"
                style="border-radius: 10px"
                @click="deleteItem()">삭제</v-btn>
            </v-col>
          </v-row>
        </v-alert>
        <!-- 상품 등록 -->
        <v-card v-if="register_name == '상품'" style="border-radius: 20px">
          <div class="flex-center dialog-titlebox">
            {{ register_name }} 정보 수정
          </div>
          <div style="position: absolute; top: 10px; right: 10px;" >
            <v-btn
              icon
              dark
              @click="emitClose()"
            >
              <v-icon color="black">mdi-close</v-icon>
            </v-btn>
          </div>

          <v-card-text>
            <v-container>
              <!-- 구분 선택 -->
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    :items="categories"
                    dense
                    required
                    outlined
                    label="* 구분"
                    v-model="product_info.categoryName"
                  ></v-select>
                </v-col>

              <!-- 품목 선택 -->
                <v-col
                  cols="12"
                  sm="6"
                >
                <v-text-field
                    dense
                    required
                    outlined
                    label="* 품목명"
                    v-model="product_info.productName"
                  ></v-text-field>
                </v-col>

              <!-- 품목코드 입력 -->
                <v-col
                  cols="12"
                  sm="6"
                >
                <v-text-field
                    dense
                    outlined
                    label="품목 코드"
                    v-model="product_info.productCode"
                  ></v-text-field>
                </v-col>

              <!-- 판매단가 입력 -->
                <v-col
                  cols="12"
                  sm="5"
                >
                  <v-text-field
                    dense
                    outlined
                    label="판매단가"
                    type="number"
                    v-model="product_info.price"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="1"
                >
                  <span style="font-size:1.2rem">원</span>
                </v-col>

                <!-- 용량, 단위 입력 -->
                <v-col
                  cols="12"
                  sm="3"
                >
                  <v-text-field
                    dense
                    outlined
                    label='용량'
                    type="number"
                    v-model="product_info.amount"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                >
                  <v-select
                    :items="unit"
                    dense
                    required
                    outlined
                    label='단위'
                    v-model="product_info.productUnit"
                  ></v-select>
                </v-col>

                <!-- 판매상태 -->
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    :items="status"
                    dense
                    required
                    outlined
                    label="판매 상태"
                    v-model="product_info.productStatus"
                  ></v-select>
                </v-col>

              <!-- 비고 입력 -->
                <v-col
                  cols="12"
                  sm="12"
                >
                  <v-textarea
                    label="비고"
                    outlined
                    rows="3"
                    dense
                    v-model="product_info.memo"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <div class="flex-center" style="height:100px;">
            <v-btn
            width="100"
            height="40"
            color="#254359"
            rounded
            dark
            @click="confirmModal(1)">
              <span style="font-size: 1.2rem">수정</span>
            </v-btn>
          </div>
        </v-card>

        <!------------------------------------------------------------------------------------>
        <!-- 입고 수정 -->
        <v-card v-if="register_name == '입고'" style="border-radius: 20px">
          <div class="flex-center dialog-titlebox">
            {{ register_name }} 내역 수정
          </div>
          <div style="position: absolute; top: 10px; right: 10px;" >
            <v-btn
              icon
              dark
              @click="emitClose()"
            >x
              <v-icon color="black">mdi-close</v-icon>
            </v-btn>
          </div>

          <v-card-text>
            <v-container>
              <v-row>

              <!-- 구분 선택 -->
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    :items="categories"
                    dense
                    required
                    outlined
                    label='* 구분'
                    v-model="selectedCategory"
                    @change="getProductsByCategory()"
                  ></v-select>
                </v-col>

              <!-- 품목 선택 -->
                <v-col
                  cols="12"
                  sm="6"
                >
                <v-autocomplete
                    :items="productList"
                    dense
                    required
                    outlined
                    label='* 품목'
                    aria-required=""
                    v-model="selectedProduct"
                    ></v-autocomplete>
                </v-col>

                <!-- 입고일자 선택 -->
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="inStock_info.inBoundDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="inStock_info.inBoundDate"
                        dense
                        readonly
                        outlined
                        label='* 입고일'
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="inStock_info.inBoundDate"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >
                        취소
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(inStock_info.inBoundDate)"
                      >
                        확인
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

              <!-- 수량 입력 -->
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    dense
                    outlined
                    required
                    label='* 수량'
                    type="number"
                    v-model="inStock_info.quantity"
                  ></v-text-field>
                </v-col>

              <!-- 비고 입력 -->
                <v-col
                  cols="12"
                >
                  <v-textarea
                    label="비고"
                    outlined
                    rows="3"
                    dense
                    v-model="inStock_info.memo"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <div v-if="!stockClosedBool" class="flex-center" style="height:100px;">
            <v-btn
            width="100"
            height="40"
            color="#c41230"
            rounded
            outlined
            dark
            style="margin-right: 20px"
            @click="confirmModal(2)">
              <span style="font-size: 1.2rem">삭제</span>
            </v-btn>
            <v-btn
            width="100"
            height="40"
            color="#254359"
            rounded
            dark
            @click="confirmModal(1)">
              <span style="font-size: 1.2rem">수정</span>
            </v-btn>
          </div>
          <div v-if="stockClosedBool" class="flex-center" style="height:100px;">
            <v-btn
            width="100"
            height="40"
            color="#c41230"
            rounded
            outlined
            disabled
            style="margin-right: 20px"
            @click="confirmModal(2)">
              <span style="font-size: 1.2rem">삭제</span>
            </v-btn>
            <v-btn
            width="100"
            height="40"
            color="#254359"
            rounded
            disabled
            @click="confirmModal(1)">
              <span style="font-size: 1.2rem">수정</span>
            </v-btn>
          </div>
        </v-card>

        <!---------------------------------------------------------------->
        <!-- 출고 수정 -->
        <v-card  v-if="register_name == '출고'" style="border-radius: 20px">
          <div class="flex-center dialog-titlebox">
            {{ register_name }} 내역 수정
          </div>
          <div style="position: absolute; top: 10px; right: 10px;" >
            <v-btn
              icon
              dark
              @click="emitClose()"
            >x
              <v-icon color="black">mdi-close</v-icon>
            </v-btn>
          </div>

          <v-card-text>
            <v-container>
              <v-row>

              <!-- 구분 선택 -->
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    :items="categories"
                    dense
                    required
                    outlined
                    label='* 구분'
                    v-model="selectedCategory"
                    @change="getProductsByCategory()"
                  ></v-select>
                </v-col>

              <!-- 품목 선택 -->
                <v-col
                  cols="12"
                  sm="6"
                >
                <v-autocomplete
                    :items="productList"
                    dense
                    required
                    outlined
                    label='* 품목'
                    aria-required=""
                    v-model="selectedProduct"
                  ></v-autocomplete>
                </v-col>

                <!-- 출고일자 선택 -->
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="outStock_info.outBoundDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="outStock_info.outBoundDate"
                        dense
                        readonly
                        outlined
                        label='* 출고일'
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="outStock_info.outBoundDate"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >
                        취소
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(outStock_info.outBoundDate)"
                      >
                        확인
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

              <!-- 고객 입력 -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  dense
                  outlined
                  label='고객'
                  v-model="outStock_info.customer"
                ></v-text-field>
              </v-col>

              <!-- 수량 입력 -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  dense
                  outlined
                  required
                  label='* 수량'
                  type="number"
                  v-model="outStock_info.quantity"
                ></v-text-field>
              </v-col>

              <!-- 가격 입력 -->
              <v-col
                cols="12"
                sm="5"
              >
                <v-text-field
                  dense
                  outlined
                  required
                  label='* 가격'
                  type="number"
                  v-model="outStock_info.price"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="1"
              >
                <span style="font-size:1.2rem">원</span>
              </v-col>

              <!-- 비고 입력 -->
                <v-col
                  cols="12"
                >
                  <v-textarea
                    label="비고"
                    outlined
                    rows="3"
                    dense
                    v-model="outStock_info.memo"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <div v-if="!stockClosedBool" class="flex-center" style="height:100px;">
            <v-btn
            width="100"
            height="40"
            color="#c41230"
            rounded
            outlined
            dark
            style="margin-right: 20px"
            @click="confirmModal(2)">
              <span style="font-size: 1.2rem">삭제</span>
            </v-btn>
            <v-btn
            width="100"
            height="40"
            color="#254359"
            rounded
            dark
            @click="confirmModal(1)">
              <span style="font-size: 1.2rem">수정</span>
            </v-btn>
          </div>
          <div v-if="stockClosedBool" class="flex-center" style="height:100px;">
            <v-btn
            width="100"
            height="40"
            color="#c41230"
            rounded
            outlined
            disabled
            style="margin-right: 20px"
            @click="confirmModal(2)">
              <span style="font-size: 1.2rem">삭제</span>
            </v-btn>
            <v-btn
            width="100"
            height="40"
            color="#254359"
            rounded
            disabled
            @click="confirmModal(1)">
              <span style="font-size: 1.2rem">수정</span>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'EditDialog',
  components: {},
  props: {
    register_name: {
      type: String,
      required: true
    },
    itemInfo: {
      type: Object
    },
    filterData: {
      type: Object
    },
  },
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
      dialogHeight: null,
      alertHeight: null,
      confirm: false,
      editConfirm: false,
      deleteConfirm: false,
      selectedCategory: this.itemInfo.categoryName,
      categories: [],
      selectedProduct: this.itemInfo.productName,
      selectedProductCode: "",
      productList: [],
      itemsObjects: [],
      inStock_info: {
        id: this.itemInfo.id,
        inBoundDate: this.itemInfo.inBoundDate,
        productId: this.itemInfo.productId,
        quantity: this.itemInfo.quantity,
        memo: this.itemInfo.memo
      },
      outStock_info: {
        id: this.itemInfo.id,
        outBoundDate: this.itemInfo.outBoundDate,
        productId: this.itemInfo.productId,
        quantity: this.itemInfo.quantity,
        customer: this.itemInfo.customer,
        price: this.itemInfo.price,
        memo: this.itemInfo.memo
      },
      product_info: {
        id: this.itemInfo.id, 
        categoryCode: this.itemInfo.categoryCode, 
        categoryName: this.itemInfo.categoryName, 
        productCode: this.itemInfo.productCode, 
        productName: this.itemInfo.productName, 
        productUnit: this.itemInfo.productUnit, 
        amount: this.itemInfo.amount, 
        price: this.itemInfo.price, 
        productStatus: this.itemInfo.productStatus,
        memo: this.itemInfo.memo 
      },
      stockClosedBool: null,
      menu: false,
      modal: false,
      menu2: false,
      unit: ['L', 'mL', 'kg', 'g'],
      status: ['판매 예정', '판매 중', '판매 중단']
    }
  },
  watch : {
    selectedProduct () {
      this.getStockId()
    },
    dialogHeight (value) {
      this.alertHeight = (window.innerHeight - value)/2 - 65 + 'px'
    }
  },
  setup () {},
  created () {
    this.getCategories()
    this.getProductsByCategory()
    if (this.register_name === '입고' ||this.register_name === '출고') {
      this.checkStockClosed()
    }
    setTimeout(()=>{
        const dialogContent = document.querySelectorAll(".v-dialog.v-dialog--active.v-dialog--persistent")[0];
        this.dialogHeight = dialogContent.clientHeight;
    }, 100)
  },
  mounted () {},
  unmounted () {},
  computed : {},
  methods: {
    // 카테고리 목록 가져오기
    getCategories () {
      const arr = [];
      const url = 'http://localhost:8080/categories';
      this.$axios.get(url, {
        params: {},
      }).then((res) => {
        res.data.forEach(function(number) {
          arr.push(number.name)
        })
        this.categories = arr
      }).catch((error) => {
        console.log(error);
      })
    },
    // date 가공 & 마감 여부 확인하기
    checkStockClosed () {
      let date = ""
      if (this.register_name === '입고') {
        date = this.inStock_info.inBoundDate
      } else if (this.register_name === '출고') {
        date = this.outStock_info.outBoundDate
      }
      const splitedDate = date.split("-")
      const lastDay = new Date(splitedDate[0], splitedDate[1], 0).getDate();
      date = splitedDate[0] + "-" + splitedDate[1] + "-" + lastDay;

      this.$axios.get(`http://localhost:8080/closing/inventory/check/${date}`).then((res) => {
        this.stockClosedBool = res.data
      }).catch((error) => {
        console.log(error);
      })
    },
    // 카테고리별 품목 리스트 구하기
    getProductsByCategory () {
      const arr = [];
      const categoryCode = this.selectedCategory=="세제" ? "00" 
        : this.selectedCategory=="방향제" ? "01" 
        : this.selectedCategory=="광택제" ? "02" 
        : this.selectedCategory=="말통" ? "03" 
        : "04"
      this.$axios.get(`http://localhost:8080/products?categoryCode=${categoryCode}`).then((res) => {
        this.itemsObjects = res.data.content
        res.data.content.forEach(function(number) {
          arr.push(number.productName)
        })
        this.productList = arr
      }).catch((error) => {
        console.log(error);
      })
    },
    // 입출고내역 id 구하기
    getStockId () {
      const idx = this.productList.indexOf(this.selectedProduct)
      this.inStock_info.productId = this.itemsObjects[idx].id
      this.outStock_info.productId = this.itemsObjects[idx].id
    },
    // 상위 컴포넌트로 모달창 닫는다고 보내기
    emitClose () {
      this.dialog = false
      setTimeout(() => {
        this.$emit('edit_dialog', this.dialog)
      }, "300")
    },
    // 수정,삭제하시겠습니까? 확인창
    confirmModal (idx) {
      if (idx === 1) {
        this.editConfirm = true
        this.deleteConfirm = false
      } else {
        this.editConfirm = false
        this.deleteConfirm = true
      }
      this.alertType = {
        msg : idx === 1 ? "해당 항목을 수정하시겠습니까?" : "해당 항목을 삭제하시겠습니까?",
        type : "info",
        background : "light",
        color : idx === 1 ? "#f89929" : "#c41230"
      }
      this.alert = true
    },
    // 수정 api
    editItem () {
      localStorage.setItem("filterData", JSON.stringify(this.filterData))

      this.editConfirm = false
      this.deleteConfirm = false
      const url = 
        this.register_name === '상품' ? `http://localhost:8080/products/${this.product_info.id}` 
        :this.register_name === '입고' ? `http://localhost:8080/inbound/${this.inStock_info.id}`
        :`http://localhost:8080/outbound/${this.outStock_info.id}`
      this.$axios.put(url, 
        this.register_name === '상품' ? this.product_info
        :this.register_name === '입고' ? this.inStock_info
        :this.outStock_info
      ).then((res) => {
        this.alertType = {
          msg: `${this.register_name} 수정이 완료되었습니다.`,
          type : "success",
          background : "light",
          color : "green"
        }
        this.alert = true
        setTimeout(() => {
          this.emitClose()
          window.location.reload()
        }, 1500);
      }).catch((error) => {
        console.log(error);
        this.alertType = {
          msg: this.register_name == "상품" ?'구분과 품목명은 필수 기재 항목입니다.'
            :this.register_name == "입고" ? '품목, 입고일, 수량은 필수 기재 항목입니다.' 
            :'품목, 출고일, 수량, 가격은 필수 기재 항목입니다.',
          type : "error",
          background : "dark",
          color : "#c41230"
        },
        this.alert=true
      })
    },
    // 삭제 api
    deleteItem () {
      localStorage.setItem("filterData", JSON.stringify(this.filterData))

      this.deleteConfirm = false
      const url = 
        this.register_name === '입고' ? `http://localhost:8080/inbound/${this.inStock_info.id}`
        :`http://localhost:8080/outbound/${this.outStock_info.id}`
      this.$axios.delete(url).then((res) => {
        this.alertType = {
          msg: `해당 항목이 삭제되었습니다.`,
          type : "success",
          background : "light",
          color : "green"
        }
        this.alert = true
        setTimeout(() => {
          this.emitClose()
          window.location.reload()
        }, 1500);
      }).catch((error) => {
        console.log(error);
        this.alertType = {
          msg:'다시 시도해주세요.',
          type : "error",
          background : "dark",
          color : "#c41230"
        },
        this.alert=true
      })
    },
  }
}
</script>
<style>
.col-4 {
  display: flex;
  justify-content: flex-start;
}
.v-dialog > .v-card > .v-card__text {
  padding: 20px 24px 0px;
}
.col-sm-1, .col-1 {
  padding: 10px 0px !important
}

.col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
  padding: 0px 12px;
}
.col-sm-1, .col-1 {
    padding: 7px 0px 10px 0px !important;
}
textarea {
  resize: none;
}
</style>