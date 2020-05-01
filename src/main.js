import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import mavonEditor from 'mavon-editor'
import axios from 'axios'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/reset.scss'
import '@/assets/scss/common.scss'
import '@/assets/font/iconfont.css'
import setAxios from './setAxios'
setAxios()
Vue.prototype.$axios=axios
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
