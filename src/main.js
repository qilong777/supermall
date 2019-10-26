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
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import VuePreview from 'vue-preview'
//图片预览
Vue.use(VuePreview);
Vue.use(MintUI);

axios.defaults.timeout = 5000;
router.beforeEach((to, from, next) => {
  store.commit("CHANGELENGTH", 1);
  next()
});
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
