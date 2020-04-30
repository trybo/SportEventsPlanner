<template>
  <div id="home-container" class="overflow-hidden">
    <Navbar />
    <h1 class="text-center my-4">Your profile</h1>
    
        <p>{{ this.form.email }}</p>
        <p>{{ this.form.nickname }}</p>
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
      console.log('jest')
        const db=firebase.firestore();
        db.collection('users').doc(user.uid).get().then(doc=>{
        self.form.email=user.email;
        self.form.nickname=doc.data().nickname})
        }
        else{
          router.push('/login')
        }
  })
    }
  },
  beforeMount(){
    this.getData();
  }
};
</script>
<style>
#home-container {
  position: relative;
  min-height: 100vh;
}
</style>