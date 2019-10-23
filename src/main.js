import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible';
import './assets/css/base_px.css';
import './assets/css/mui.min.css';
import './assets/css/icons-extra.css';
import moment from 'moment'
import axios from 'axios'
import { Header, Swipe, SwipeItem, Toast, Loadmore, Button } from 'mint-ui';
Vue.component(Button.name, Button);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);

Vue.prototype.$toast = Toast;
axios.defaults.timeout = 5000;
Vue.prototype.axios = axios;
Vue.config.productionTip = false
//格式化时间
Vue.filter('dateFormat', (dateStr, pattern = "YYYY-MM-DD hh:mm:ss") => {
  return moment(dateStr).format(pattern);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
