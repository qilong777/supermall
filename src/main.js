import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base_px.css';
import './assets/css/mui.min.css'
import 'amfe-flexible'
import { Header, Tabbar, TabItem } from 'mint-ui';
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Header.name, Header)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
