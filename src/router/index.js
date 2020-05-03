import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login';
import Profile from '../components/Profile';
import Register from '../components/Register';
import Logout from '../components/Logout';
import Events from '../views/Events.vue';
import Create from '../components/CreateEvent';
import YourEvents from '../components/YourEvents';
import SingleEvent from '../components/SingleEvent';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/YourEvents',
    name: 'YourEvents',
    component: YourEvents
  },
  {
    path:'/SingleEvent/:id',
    name:'SingleEvent',
    component:SingleEvent
  }
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
