import Vue from 'vue'
import App from './App.vue'
import * as firebase from "firebase";
import Router from 'vue-router';
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

Vue.config.productionTip = false;
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

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    }
]
});

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
