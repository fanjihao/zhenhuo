import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './http'
import {get,post} from './http/request'

// 打印
import Print from 'vue-print-nb'

Vue.use(Print);  //注册

Vue.prototype.$get=get;
Vue.prototype.$post=post;

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
