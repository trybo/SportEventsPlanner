<template>
  <div id="home-container" class="overflow-hidden">
    <Navbar />
    <h1 class="text-center my-4">Event</h1>
    <div class="row p-3 mb-2">
    <div class="col-md-6">
    <p>Type: {{event.type}}</p>
    <p>Date: {{event.date}}</p>
    <p>Location: {{event.location}}</p>
    <p>Slots: {{event.slots}}</p>
    <ul>
    <li v-for="(element,index) in event.usersNickname" :key="index">{{element}}
    </li>
    </ul>
    </div>
    <div class="col-md-6">
                                     <gmap-map
      :center="center"
      
      :zoom="15"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
    </div>
    </div>
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
        usersNickname:[],
        location:'',
      },
        center: {  },
      markers: [],
      places: [],
      currentPlace: null,
      
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
        self.event.location=doc.data().location;
        self.markers=doc.data().markers;
        self.center=self.markers[0].position;
        self.event.usersNickname=doc.data().usersNickname;

        

})



    }

  

    
  

  },
  
  beforeMount(){
    this.getData()
    this.getNicknames()
    
    
         
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