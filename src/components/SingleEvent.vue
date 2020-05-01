<template>
  <div id="home-container" class="overflow-hidden">
    <Navbar />
    <h1 class="text-center my-4">Event</h1>
    <p>Type: {{event.type}}</p>
    <p>Date: {{event.date}}</p>
    <p>Location: {{event.location}}</p>
    <p>Slots: {{event.slots}}</p>

    <p> </p>
    <Footer />
  </div>
  
</template>


<script>

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import firebase from "firebase"
//import {router} from '../main'
export default {
    components:{
        Navbar,  
        Footer
  },
  data() {
    return {
      event: {
        date:"",
        slots:'',
        users:[],
        location:''
      },
      error: null
    }
  },
  methods: {
    getData() {
      var self=this;
        const db=firebase.firestore();
        db.collection('events').doc(self.$route.params.id).get().then(doc=>{
        self.event.date=doc.data().date;
        self.event.slots=doc.data().slots;
        self.event.type=doc.data().type;
        self.event.users=doc.data().users;
        self.event.location=doc.data().location

    })
  

    
  }
  },
  
  beforeMount(){
    this.getData()
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