import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './premission'
import './index.css'
// import 'lib-flexible/flexible';
import JsonExcel from 'js-table2excel'
import { Notify, Toast } from "vant";
Vue.prototype.$JsonExcel = JsonExcel;
Vue.prototype.$Notify = Notify;
Vue.prototype.$Toast = Toast;
import './utils/rem'
import elementUi from './utils/elementUi'
Vue.use(elementUi)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
