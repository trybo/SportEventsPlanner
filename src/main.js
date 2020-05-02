import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as firebase from 'firebase';
import * as VueGoogleMaps from "vue2-google-maps";
import './registerServiceWorker'

var firebaseConfig = {
  apiKey: "AIzaSyAO7wjG_KgdfONU9xQOIIgZ2ig4kKd7jBQ",
  authDomain: "sporteventsplanner-a1a88.firebaseapp.com",
  databaseURL: "https://sporteventsplanner-a1a88.firebaseio.com",
  projectId: "sporteventsplanner-a1a88",
  storageBucket: "sporteventsplanner-a1a88.appspot.com",
  messagingSenderId: "324303317328",
  appId: "1:324303317328:web:dda21a0258cab2b3a82455",
  measurementId: "G-T6HJRV285E"
};
firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBV0SpZO9MW1cTHYq7FHKAuYhDaVOwc0vA",
    libraries: "places" // necessary for places input
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export{router};
