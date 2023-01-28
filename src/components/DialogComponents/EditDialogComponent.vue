<template>
<div class="flex-center">
  <v-app>
    <div class="text-center" style="margin-bottom: 5px">
      <v-dialog
        v-model="dialog"
        persistent
        width="600"
      >

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
                  <v-text-field
                    dense
                    outlined
                    label="비고"
                    v-model="product_info.memo"
                  ></v-text-field>
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
            @click="editItem()">
              <span style="font-size: 1.2rem">저장</span>
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

          {{ this.itemInfo }}
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
                    v-model="this.selectedCategory"
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
                    v-model="this.selectedProduct"
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
                    :return-value.sync="inStock_info.inStockDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="inStock_info.inStockDate"
                        dense
                        readonly
                        outlined
                        label='* 입고일'
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="inStock_info.inStockDate"
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
                        @click="$refs.menu.save(inStock_info.inStockDate)"
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
                  <v-text-field
                    dense
                    outlined
                    label='비고'
                    v-model="inStock_info.memo"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <div class="flex-center" style="height:100px;">
            <v-btn
            width="100"
            height="40"
            color="#c41230"
            rounded
            outlined
            dark
            style="margin-right: 20px"
            @click="deleteItem()">
              <span style="font-size: 1.2rem">삭제</span>
            </v-btn>
            <v-btn
            width="100"
            height="40"
            color="#254359"
            rounded
            dark
            @click="editItem()">
              <span style="font-size: 1.2rem">저장</span>
            </v-btn>
          </div>
        </v-card>

        <!---------------------------------------------------------------->
        <!-- 출고 등록 -->
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

          {{ this.itemInfo }}
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
                    v-model="this.selectedCategory"
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
                    v-model="this.selectedProduct"
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
                    :return-value.sync="outStock_info.outStockDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="outStock_info.outStockDate"
                        dense
                        readonly
                        outlined
                        label='* 출고일'
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="outStock_info.outStockDate"
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
                        @click="$refs.menu.save(outStock_info.outStockDate)"
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
                sm="6"
              >
                <v-text-field
                  dense
                  outlined
                  required
                  label='* 가격'
                  type="number"
                  v-model="outStock_info.quantity"
                ></v-text-field>
              </v-col>

              <!-- 비고 입력 -->
                <v-col
                  cols="12"
                >
                  <v-text-field
                    dense
                    outlined
                    label='비고'
                    v-model="outStock_info.memo"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <div class="flex-center" style="height:100px;">
            <v-btn
            width="100"
            height="40"
            color="#c41230"
            rounded
            outlined
            dark
            style="margin-right: 20px"
            @click="deleteItem()">
              <span style="font-size: 1.2rem">삭제</span>
            </v-btn>
            <v-btn
            width="100"
            height="40"
            color="#254359"
            rounded
            dark
            @click="editItem()">
              <span style="font-size: 1.2rem">저장</span>
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
    productList: {
      type: Array
    },
    itemInfo: {
      type: Object
    }
  },
  data () {
    return {
      selectedCategory: this.itemInfo.categoryName,
      categories: [],
      selectedProduct: this.itemInfo.productName,
      productList: [],
      dialog: true,
      inStock_info: {
        inStockDate: this.itemInfo.inStockDate,
        productId: this.itemInfo.productId,
        quantity: this.itemInfo.quantity,
        memo: this.itemInfo.memo
      },
      outStock_info: {
        outStockDate: this.itemInfo.outStockDate,
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
      menu: false,
      modal: false,
      menu2: false,
      unit: ['L', 'mL', 'kg', 'g'],
      status: ['판매 예정', '판매 중', '판매 중단']
    }
  },
  watch : {
    itemInfo : {
      deep : true,
      handler() {
        console.log(itemInfo)
      }
    }
  },
  setup () {},
  created () {
    this.getCategories()
  },
  mounted () {},
  unmounted () {},
  computed : {},
  methods: {
    // 카테고리 목록 가져오기
    getCategories () {
      const arr = [];
      const url = '/categories';
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
    emitClose () {
      this.dialog = false
      setTimeout(() => {
        this.$emit('edit_dialog', this.dialog)
      }, "300")
    },
    deleteItem () {
      if (this.register_name == '상품') {
        if(confirm('해당 품목을 판매 중지하시겠습니까?')) {
          this.emitClose()
        }
      } else {
        if(confirm('해당 내역을 삭제하시겠습니까?')) {
          this.emitClose()
        }
      }
    },
    editItem () {
      if(confirm('해당 항목을 수정하시겠습니까?')) {
        const url = `/products/${this.product_info.id}`;
        this.$axios.put(url, this.product_info
        ).then((res) => {
          alert('수정이 완료되었습니다.')
          this.emitClose()
          window.location.reload()
        }).catch((error) => {
          console.log(error);
        })
      }
    }
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
</style>