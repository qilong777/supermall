import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: "",
    historyLength: 0
  },
  mutations: {
    CHANGETITLE(state, title) {
      state.title = title;
    },
    CHANGELENGTH(state, num) {
      state.historyLength += num;
    },

  },
  actions: {
  },
  modules: {
  }
})
