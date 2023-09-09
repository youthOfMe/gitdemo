import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from "vue-router"
import store from './store'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "@/comment/reset.css"
import "@/comment/rule.css"
import "./mock/mock"
import "@/router/gurad"

Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
