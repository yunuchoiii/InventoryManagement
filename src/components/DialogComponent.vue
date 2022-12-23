<template>
<div class="flex-center">
  <span style="font-size: 22px; font-weight:700; line-height: 14px; margin-right: 15px;">{{ register_name }} 등록</span>
  <v-app>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="360"
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
        <v-card style="border-radius: 20px">
          <div class="flex-center" style="height: 80px; color: #3f5473;">
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
              <!-- 날짜 선택 -->
              <v-row>
                <v-col
                  cols="3"
                  class="flex-center"
                >
                  <h3>일자</h3>
                </v-col>
                <v-col
                  cols="9"
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
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(register_info.date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
                </v-col>
              </v-row>

              <!-- 구분 선택 -->
              <v-row>
                <v-col
                  cols="3"
                  class="flex-center"
                >
                  <h3>구분</h3>
                </v-col>
                <v-col
                  cols="9"
                >
                  <v-select
                    :items="categories"
                    dense
                    required
                    v-model="register_info.category"
                  ></v-select>
                </v-col>
              </v-row>

              <!-- 물품 선택 -->
              <v-row>
                <v-col
                  cols="3"
                  class="flex-center"
                >
                  <h3>물품</h3>
                </v-col>
                <v-col
                  cols="9"
                >
                <v-autocomplete
                    :items="items"
                    dense
                    required
                    v-model="register_info.product"
                  ></v-autocomplete>
                </v-col>
              </v-row>

              <!-- 수량 입력 -->
              <v-row>
                <v-col
                  cols="3"
                  class="flex-center"
                >
                  <h3>수량</h3>
                </v-col>
                <v-col
                  cols="9"
                >
                  <v-text-field
                    dense
                    type="number"
                    v-model="register_info.quantity"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- 비고 입력 -->
              <v-row>
                <v-col
                  cols="3"
                  class="flex-center"
                >
                  <h3>비고</h3>
                </v-col>
                <v-col
                  cols="9"
                >
                  <v-text-field
                    dense
                    v-model="register_info.memo"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <div class="flex-center" style="height:100px">
            <v-btn
            width="290"
            height="40"
            color="#3f5473"
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
      menu: false,
      modal: false,
      menu2: false,
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {}
}
</script>
