import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { App } from '@/http/request'
// const store = new Vuex.Store()
// export default store
const store = {
  state: {
    options: null,
  },
  mutations:{
    change(state, data){
      state.options = data
    },
  },
  actions:{
    getConfig({ commit }) {
      const Lo = Vue.prototype.Lo
      let query = Lo.url.parse()
      try {
        if (Lo.isEmpty(query.sn)) {
          query = JSON.parse(localStorage.getItem('query'))
          const parse = location
          const url = `${parse.origin}${parse.pathname}${parse.search ? parse.search +'&' : '?'}${`sn=${query.sn}&default=${query.default}`}`
          location.replace(url)
        }
      } catch (e) {

      }
    },
  },
  getters: {
    options: state => state.options
  },
}

export default new Vuex.Store({
  modules: {
    store
  },
})
