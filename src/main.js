import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './premission'
import './index.css'
// import 'lib-flexible/flexible';
import './utils/rem'
import elementUi from './utils/elementUi'
Vue.use(elementUi)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
