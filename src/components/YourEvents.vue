<template>
  <div id="home-container" class="overflow-hidden">
    <Navbar />
    <h1 class="text-center my-4">Your Events</h1>
    <div class="row p-3 mb-2">
      <div class="col-md-12">
        <table class="table table-striped text-white">
        <thead>
        <th>No</th>
        <th> Event type</th>
        <th> Event date</th>
        <th>Event location</th>
        <th></th>
        <th></th>
        </thead>
        <tbody id="show">
        <tr v-for="(event,index) in form.events" :key="index">
        <td>{{event.no}}</td>
        <td>{{event.type}}</td>
        <td>{{event.date}}</td>
        <td>{{event.location}}</td>
        <td><button class="btn" @click.prevent="goEvent(event)">Details</button></td>
        <td v-if="event.isAdmin"><button class="btn" @click.prevent="deleteEvent(event,index)">Delete</button></td>
        <td v-else ></td>
       
        </tr>
        </tbody>
        </table>

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
      form:{
      events:[
       ]},
      error: null
    };
  },
  methods: {
    getData() { 
      var self=this;
      firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var no=1;
      var isAdmin;
      
        const db=firebase.firestore();
        db.collection('events').where("users","array-contains",firebase.auth().currentUser.uid).get()
        .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          isAdmin=false;
          if (doc.data().admin==firebase.auth().currentUser.uid){
            isAdmin=true
          }
          self.form.events.push({'no':no,'location':doc.data().location,'type':doc.data().type,'slots':doc.data().slots,'date':doc.data().date,'isAdmin':isAdmin,'id':doc.id} );

            // doc.data() is never undefined for query doc snapshots
          no+=1
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
        
        }
        else{
          router.push('/login')
        }
  })},
    
  
  goEvent(event){
    router.push('/SingleEvent/'+event.id) 
  },
  deleteEvent(event){
    var self=this;
    if(confirm('Do you want to delete this event?')){
    const db=firebase.firestore();
    db.collection('events').doc(event.id).delete();
    self.form.events=[];
    this.getData();

    
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
  width: 100% !important;
}
</style>