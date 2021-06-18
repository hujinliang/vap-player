import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import { install as installSvg } from './plugins/svg-icon'

import '@/styles/variables/theme-variables.css'
import '@/styles/index.css'
import '@/styles/tailwind.css'

Vue.config.productionTip = false

Vue.use(element)
installSvg(Vue)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
