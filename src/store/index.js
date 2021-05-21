import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: "",
    path: ""
  },
  mutations: {
    setUser: (state, data) => {
      state.user = data;
    },
    setPath: (state, data) => {
      state.path = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
