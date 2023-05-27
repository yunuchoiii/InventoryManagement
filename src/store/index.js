import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isClosed: null
  },
  mutations: {
    toggleNav(state) {
      state.isClosed = !state.isClosed
    }
  },
  actions: {
    toggleNav({ commit }) {
      commit('toggleNav')
    }
  },
  modules: {
  }
})
