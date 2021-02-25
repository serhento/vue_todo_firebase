import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import firebase from 'firebase/app';
import 'firebase/database';

import 'firebase/database';

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyA46ny7BX8qlbIsEzVl9m0vcr88TeYDmnQ",
  authDomain: "vuetodo-c70ae.firebaseapp.com",
  databaseURL: "https://vuetodo-c70ae-default-rtdb.firebaseio.com",
  projectId: "vuetodo-c70ae",
  storageBucket: "vuetodo-c70ae.appspot.com",
  messagingSenderId: "602529207452",
  appId: "1:602529207452:web:3a500a6f6958d7e9354959"
});

export const db = firebase.database();
export const listsRef = db.ref('lists')
export const colorsRef = db.ref('colors')

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
