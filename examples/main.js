import Vue from 'vue'
import App from './App.vue'
// import VueComponent from '../packages'
import { PieSvg } from '../packages'

Vue.use(PieSvg)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
