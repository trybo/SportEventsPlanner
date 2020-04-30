<template>

  <div class="overflow-hidden">
  <Navbar />
  <p>{{this.form.email}}</p>
   <p>{{this.form.nickname}}</p>
   <p>{{this.form.date}}</p>
   <Footer />
  </div>
</template>

<script>
import firebase from "firebase";
import{router} from '../main'

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
        date:''
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
        db.collection('users').doc(user.uid).get()
        .then(doc=>{
        self.form.email=user.email;
        self.form.nickname=user.displayName
        self.form.date=doc.data().age})
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
}
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
</script>
<style>

</style>