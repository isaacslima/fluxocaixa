import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import './firebase'
import money from 'v-money'
Vue.use(money, { precision: 2 })

import router from './router';

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function () {
  if (!app) {
    app = new Vue({
      firebase,
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
