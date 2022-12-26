<template>
<div class="flex-center">
  <span style="font-size: 22px; font-weight:700; margin-right: 15px;">{{ register_name }} 등록</span>
  <v-app>
    <div class="text-center" style="margin-bottom: 5px">
      <v-dialog
        v-model="dialog"
        persistent
        width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mx-2"
            small
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
              @click="dialog = false"
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
                    v-model="product_info.category"
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
                    v-model="product_info.product"
                  ></v-text-field>
                </v-col>

              <!-- 품목코드 입력 -->
                <v-col
                  cols="12"
                  sm="1"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-help-circle-outline
                      </v-icon>
                    </template>
                    <span>빈칸으로 저장시 코드가 자동생성됩니다.</span>
                  </v-tooltip>
                </v-col>
                <v-col
                  cols="12"
                  sm="5"
                >
                <v-text-field
                    dense
                    outlined
                    label="품목 코드"
                    v-model="product_info.product_code"
                  ></v-text-field>
                </v-col>

              <!-- 판매단가 입력 -->
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    dense
                    outlined
                    label="판매단가"
                    type="number"
                    v-model="product_info.price"
                  ></v-text-field>
                </v-col>

                <!-- 용량, 단위 입력 -->
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
                    v-model="product_info.unit"
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    dense
                    outlined
                    label='용량'
                    type="number"
                    v-model="product_info.capacity"
                  ></v-text-field>
                </v-col>

              <!-- 비고 입력 -->
                <v-col
                  cols="12"
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

          <div class="flex-center" style="height:100px">
            <v-btn
            width="130"
            height="40"
            color="#3F5473"
            rounded
            dark
            @click="dialog = false">
              <span style="font-size: 1.2rem">저장</span>
            </v-btn>
          </div>
        </v-card>

        <!------------------------------------------------------------------------------------>
        <!-- 입출고 등록 -->
        <v-card v-else style="border-radius: 20px">
          <div class="flex-center dialog-titlebox">
            {{ register_name }} 등록
          </div>
          <div style="position: absolute; top: 10px; right: 10px;" >
            <v-btn
              icon
              dark
              @click="dialog = false"
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
                    v-model="register_info.category"
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
                    v-model="register_info.product"
                  ></v-autocomplete>
                </v-col>

                <!-- 날짜 선택 -->
                <v-col
                  cols="12"
                  sm="6"
                >
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="register_info.date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="register_info.date"
                      dense
                      readonly
                      outlined
                      label='* 일자'
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="register_info.date"
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
                      @click="$refs.menu.save(register_info.date)"
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
                    v-model="register_info.quantity"
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
                    v-model="register_info.memo"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <div class="flex-center" style="height:100px">
            <v-btn
            width="130"
            height="40"
            color="#3F5473"
            rounded
            dark
            @click="dialog = false">
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
  name: 'RegisterDialog',
  components: {},
  props: {
    register_name: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      default: ['세제', '방향제', '말통', '광택제', '박스']
    },
    items: {
      type: Array
    }
  },
  data () {
    return {
      dialog: false,
      register_info: {
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        category: '',
        product: '',
        quantity: null,
        memo: ''
      },
      product_info: {
        category: '',
        product: '',
        product_code: '',
        price: null,
        unit: '',
        capacity: null,
        memo: ''
      },
      menu: false,
      modal: false,
      menu2: false,
      unit: ['L', 'mL', 'kg', 'g']
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {}
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
</style>