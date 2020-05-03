<template>
  <div id="home-container" class="overflow-hidden">
    <Navbar />
    <h1 class="text-center my-4">Event</h1>

    <div class="row p-3 mb-2">
    <div class="col-md-6 px-5">
    <button class="btn" v-if="isUser" @click.prevent="JoinEvent()">Join</button>
    <button class="btn" style=width: v-if="isUser2" @click.prevent="LeaveEvent()">Leave Event</button>
    <div v-if="getDateTime!=null">
    <p><img :src="`https://www.weatherbit.io/static/img/icons/${getDateTime.weather.icon}.png`"></p>
    <p>{{getDateTime.weather.description}}</p>
    <p><b>Max Temp:</b> {{getDateTime.max_temp}}</p>
    </div>
    <br>
    <p><b>Type:</b> {{event.type}}</p>
    <p><b>Level:</b> {{event.level}}</p>
    <p><b>Date:</b> {{event.date}}</p>
    <p><b>Hour:</b> {{event.time}}</p>
    <p><b>Location:</b> {{event.location}}</p>
    <p><b>Slots:</b> {{event.slots}}</p>
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
import {router} from '../main';
import axios from 'axios'
import{ApiKey1} from '../main';

export default {
    components:{
        Navbar,  
        Footer
  },
  data() {
    return {
      isUser:'',
      isUser2:'',
      event: {
        date:"",
        slots:'',
        users:[],
        usersNickname:[],
        location:'',
        time:'',
        level:'' ,
        admin:''
      },
        center: {  },
      markers: [],
      places: [],
      currentPlace: null,
      
      error: null,
      info:'',
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
        self.event.level=doc.data().level;
        self.event.time=doc.data().time;
        self.event.location=doc.data().location;
        self.markers=doc.data().markers;
        self.center=self.markers[0].position;
        self.event.usersNickname=doc.data().usersNickname;
        self.event.users=doc.data().users;
        self.event.admin=doc.data().admin;
        self.isUser=!(self.event.users.includes(firebase.auth().currentUser.uid))
        self.isUser2=self.event.users.includes(firebase.auth().currentUser.uid)
        
        if (self.isUser==true){
          if(self.event.users.length+1>self.event.slots){
            self.isUser=false;
          }
        }
        
        
      axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${self.markers[0].position.lat}&lon=${self.markers[0].position.lng}&key=${ApiKey1}`)
    .then(response => ( self.info=response.data.data));
   
      
    

        



})
    },

    
    JoinEvent(){
      var self=this;
      self.event.users.push(firebase.auth().currentUser.uid)
      self.event.usersNickname.push(firebase.auth().currentUser.displayName)
      const db1=firebase.firestore();
      db1.collection('events').doc(self.$route.params.id).update({
          users:self.event.users,
          usersNickname:self.event.usersNickname
        })
      router.push('/Events')
      
      
        console.log('error');
      
    },
    LeaveEvent(){
      if(confirm('Do you want to leave this event?')){
        
        
          if (this.event.admin==firebase.auth().currentUser.uid){
            
            alert('Admin cannot leave event')
          }
          else{
             var DeleteIndex=(this.event.users.indexOf(firebase.auth().currentUser.uid))
             this.event.users.splice(DeleteIndex,1);
             this.event.usersNickname.splice(DeleteIndex,1);
              const db1=firebase.firestore();
             db1.collection('events').doc(this.$route.params.id).update({
              users:this.event.users,
              usersNickname:this.event.usersNickname
              
        })
router.push('/YourEvents')
            
          }

      }

  }
  },
  computed:{
    getDateTime: function (){
      var thisDate
      for(var element of this.info){
        if (element.datetime==this.event.date){
          
          thisDate=element;
        }

      }
      return thisDate;
      }
      
    

  },
 
  beforeMount(){

    this.getData()
    
},

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