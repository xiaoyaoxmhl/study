// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import storeConfig from 'STORE/index';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Vuex);

const store = new Vuex.Store(storeConfig)
window.store = store;
router.beforeEach((to, from, next) => {
  if (to.fullPath === '/fileUpload') {
    if (store.getters['user'].user) {
      next();
    }
    else {
      return;
    }
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})

export {store};
