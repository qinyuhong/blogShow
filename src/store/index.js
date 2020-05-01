import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signStatus:0, //0 表示未登录 1表示已登录   评论组件是否登录
    token: Cookie.get('token') || ''
  },
  mutations: {
    changeSignStatus(state,n){
      this.state.signStatus=n
    },
    setToken(state,val){
      this.state.token=val
    }
  },
  actions: {
  },
  modules: {
  }
})
