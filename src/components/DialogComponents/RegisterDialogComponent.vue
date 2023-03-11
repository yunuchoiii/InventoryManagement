<template>
<div class="flex-center">
  <span style="font-size: 1.3rem; font-weight:700; margin-right: 8px;">{{ register_name }} 등록</span>
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
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mx-2"
            height="2rem"
            width="2rem"
            fab
            dark
            color="#f89929"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>

        <!-- 상품 등록 -->
        <v-card v-if="register_name == '상품'" style="border-radius: 20px">
          <div class="flex-center dialog-titlebox">
            {{ register_name }} 등록
          </div>
          <div style="position: absolute; top: 10px; right: 10px;" >
            <v-btn
              icon
              dark
              @click="dialog = false; alert = false;"
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

                <!-- 판매 상태 -->
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
                  sm="6"
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
                  sm="6"
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

              <!-- 비고 입력 -->
                <v-col
                  cols="12"
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

          <div class="flex-center" style="height:100px">
            <v-btn
            width="130"
            height="40"
            color="#254359"
            rounded
            dark
            @click="Register()">
              <span style="font-size: 1.2rem">저장</span>
            </v-btn>
          </div>
        </v-card>

        <!------------------------------------------------------------------------------------>
        <!-- 입고 등록 -->
        <v-card v-if="register_name == '입고'" style="border-radius: 20px">
          <div class="flex-center dialog-titlebox">
            {{ register_name }} 내역 등록
          </div>
          <div style="position: absolute; top: 10px; right: 10px;" >
            <v-btn
              icon
              dark
              @click="dialog = false; alert = false;"
            >
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
                    :items="items"
                    dense
                    required
                    outlined
                    label='* 품목'
                    aria-required=""
                    v-model="selectedItem"
                    @change="getProductId()"
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
                  auto-grow
                  outlined
                  rows="3"
                  dense
                  v-model="inStock_info.memo"
                ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <div class="flex-center" style="height:100px">
            <v-btn
            width="130"
            height="40"
            color="#254359"
            rounded
            dark
            @click="Register()">
              <span style="font-size: 1.2rem">저장</span>
            </v-btn>
          </div>
        </v-card>

        <!------------------------------------------------------------------------------------>
        <!-- 출고 등록 -->
        <v-card v-if="register_name == '출고'" style="border-radius: 20px">
          <div class="flex-center dialog-titlebox">
            {{ register_name }} 내역 등록
          </div>
          <div style="position: absolute; top: 10px; right: 10px;" >
            <v-btn
              icon
              dark
              @click="dialog = false; alert = false;"
            >
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
                    :items="items"
                    dense
                    required
                    outlined
                    label='* 품목'
                    aria-required=""
                    v-model="selectedItem"
                    @change="getProductId()"
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

          <div class="flex-center" style="height:100px">
            <v-btn
            width="130"
            height="40"
            color="#254359"
            rounded
            dark
            @click="Register()">
              <span style="font-size: 1.2rem">저장</span>
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
  name: 'RegisterDialog',
  components: {},
  props: {
    register_name: {
      type: String,
      required: true
    },
  },
  data () {
    return {
      dialog: false,
      alert: false,
      alertType: {
        msg: "알림",
        type : "error",
        background : "dark",
        color : "#254359"
      },
      dialogHeight: null,
      alertHeight: null,
      categories: [],
      selectedCategory: "",
      itemsObjects: [],
      items: [],
      selectedItem: "",
      inStock_info: {
        inBoundDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        productId: null,
        quantity: null,
        memo: ''
      },
      outStock_info: {
        outBoundDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        productId: null,
        quantity: null,
        customer: '',
        price: null,
        memo: ''
      },
      product_info: {
        categoryName: '',
        productName: '',
        productStatus: '',
        price: null,
        productUnit: '',
        amount: null,
        memo: ''
      },
      menu: false,
      modal: false,
      menu2: false,
      unit: ['L', 'mL', 'kg', 'g'],
      status: ['판매 예정', '판매 중', '판매 중단']
    }
  },
  watch : {
    dialog (value) {
      if (value) {
        setTimeout(()=>{
            const dialogContent = document.querySelectorAll(".v-dialog.v-dialog--active.v-dialog--persistent")[0];
            this.dialogHeight = dialogContent.clientHeight;
            console.log(this.dialogHeight)
        }, 100)
      }
    },
    dialogHeight (value) {
      this.alertHeight = (window.innerHeight - value)/2 - 65 + 'px'
    }
  },
  setup () {},
  created () {
    this.getCategories()
  },
  mounted () {},
  unmounted () {},
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
        this.items = arr
      }).catch((error) => {
        console.log(error);
      })
    },
    getProductId () {
      const idx = this.items.indexOf(this.selectedItem)
      this.inStock_info.productId = this.itemsObjects[idx].id
      this.outStock_info.productId = this.itemsObjects[idx].id
    },
    Register () {
      const url = 
        this.register_name == "상품" ? "http://localhost:8080/products"
        : this.register_name == "입고" ? "http://localhost:8080/inbound" 
        : "http://localhost:8080/outbound";
      this.$axios.post(url, 
        this.register_name == "상품" ? this.product_info 
        : this.register_name == "입고" ? this.inStock_info 
        : this.outStock_info
      ).then((res) => {
        this.alertType = {
          msg: `${this.register_name} 등록이 완료되었습니다.`,
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
        this.alertType.msg=
          this.register_name == "상품" ?'구분과 품목명은 필수 기재 항목입니다.'
          :this.register_name == "입고" ? '품목, 입고일, 수량은 필수 기재 항목입니다.' 
          :'품목, 출고일, 수량, 가격은 필수 기재 항목입니다.'
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
    padding: 10px 0px 10px 20px !important;
}
textarea {
  resize: none;
}
</style>