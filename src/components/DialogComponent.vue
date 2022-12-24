<template>
<div class="flex-center">
  <span style="font-size: 22px; font-weight:700; line-height: 14px; margin-right: 15px;">{{ register_name }} 등록</span>
  <v-app>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
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
                  sm="6"
                >
                <v-text-field
                    dense
                    outlined
                    label="품목 코드"
                    hint="빈칸으로 저장시 자동생성됩니다."
                    persistent-hint
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
                  sm="5"
                >
                  <v-text-field
                    dense
                    outlined
                    label='용량'
                    type="number"
                    v-model="product_info.capacity"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="1">
                  {{ product_info.unit == '' ? '단위' : product_info.unit }}
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
      unit: ['L', 'mL', '박스', '통']
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
  padding: 22px 5px
}
</style>