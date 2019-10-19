import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible';
import './assets/css/base_px.css';
import './assets/css/mui.min.css';
import './assets/css/icons-extra.css';
import { Header, Swipe, SwipeItem, Toast } from 'mint-ui';
import axios from 'axios'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);

Vue.prototype.toast = Toast;
Vue.prototype.axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
