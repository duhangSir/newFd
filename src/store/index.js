import Vue from "vue";
import Vuex from "vuex";
import cookies from 'vue-cookies'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: cookies.get('userInfoA') || {}
  },
  getters: {},
  mutations: {
    async SET_USERINFO(state, userInfo) {
      await cookies.set("userInfoA", userInfo, -1)
      state.userInfo = userInfo
    },
    async LOGOUT(state) {
      cookies.remove('userInfoA')
      state.userInfo = {}
    }
  },
  actions: {},
  modules: {},
});
