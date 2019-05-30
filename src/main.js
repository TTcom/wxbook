import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
import './assets/styles/icon.css'
import './assets/styles/global.scss'
import './utils/boost'
import './utils/create-api'
import './lazy'
import {Button} from 'atom-design';
Vue.component(Button.name, Button);

Vue.config.productionTip = false

new Vue({
  router,
  store,
	i18n,
  render: h => h(App)
}).$mount('#app')
