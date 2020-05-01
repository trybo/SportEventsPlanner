<template>
  <div id="home-container" class="overflow-hidden">
    <Navbar />
    <h1 class="text-center my-4">Your profile</h1>
    <div class="row p-3 mb-2">
      <div class="col-md-5">
        <p><b>Nickname:</b> {{ this.form.nickname }}</p>
        <p><b>Age:</b>{{this.form.age}} </p>
        <p><b>Email:</b> {{ this.form.email }}</p>

        <div class="text-center">
        <button type="button" class="btn text-white my-4">Join</button>
      </div>
      <div class="text-center">
        <button type="button" class="btn text-white my-4" @click="deleteUser">Delete account</button>
      </div>
      </div>
      <div class="col-md-7">
         PHOTO
      </div>
    </div>
    <Footer />
  </div>
  </template>


<script>

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import firebase from "firebase"
import {router} from '../main'
export default {
    components:{
        Navbar,
        Footer
  },
  data() {
    return {
      form: {
        email:"",
        nickname:'',
        age:''
      },
      error: null
    };
  },
  methods: {
    getData() {
      var self=this;
      firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
        const db=firebase.firestore();
        db.collection('users').doc(user.uid).get().then(doc=>{
        self.form.email=user.email;
        self.form.nickname=user.displayName;
        self.form.age=doc.data().age})
        
        }
        else{
          router.push('/login')
        }
  })},
    
  
  deleteUser () {
    if (confirm("Do you want to delete your account?")){
    var user = firebase.auth().currentUser;

user.delete().then(function() {
  router.push('/')
}).catch(function(error) {
  console.log(error)
});
  }
  }
    },
  beforeMount(){
    this.getData();
  }
}
</script>
<style>
#home-container {
  position: relative;
  min-height: 100vh;
}
.btn {
  background-color: #003c8f !important;
  width: 50%;
}
</style>