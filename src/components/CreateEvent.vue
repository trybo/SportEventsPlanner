<template>

  <div id="create-container" class="overflow-hidden">
   <Navbar />
   <h1 class="text-center my-4">Create Event</h1>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card" id="reg" style="width:800px; margin:0 auto;">
          <div class="card-body">
            <div style="color:red" v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">


              <div class="form-group row">
                <label for="date" class="col-md-4 col-form-label text-md-right">Date</label>

                <div class="col-md-6">
                  <input
                    id="date"
                    type="date"
                    class="form-control"
                    name="date"
                    value
                    required
                    autofocus
                    v-model="form.date"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="date" class="col-md-4 col-form-label text-md-right">Hour</label>

                <div class="col-md-6">
                  <input
                    id="hour"
                    type="time"
                    class="form-control"
                    name="time"
                    value
                    required
                    autofocus
                    v-model="form.time"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="type" class="col-md-4 col-form-label text-md-right">Type</label>

                <div class="col-md-6">
                  <input
                    id="type"
                    type="text"
                    class="form-control"
                    name="type"
                    required
                    v-model="form.type"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="type" class="col-md-4 col-form-label text-md-right">Level</label>

                <div class="col-md-6">
                  <select id='level' v-model="form.level" class="form-control">
                    <option value="Low">Low</option>
                     <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="slots" class="col-md-4 col-form-label text-md-right">Slots</label>

                <div class="col-md-6">
                  <input
                    id="slots"
                    type="number"
                    class="form-control"
                    name="slots"
                    required
                    v-model="form.slots"
                  />
                </div>
              </div>
                <div class="form-group row">
                 <label for="location" class="col-md-4 col-form-label text-md-right">Location</label>

                <div class="col-md-6">
                        
                  
                    
                  <gmap-autocomplete id="location" class="form-control"
          @place_changed="setPlace"  >
        </gmap-autocomplete>
        <button class="btn my-4" @click.prevent="addMarker">Add</button>
                </div>
              </div>
              
            <div>
                <gmap-map
      :center="center"
      :zoom="12"
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

              <div class="form-group row mb-0">
                
                  <div class="text-center">
                  <button type="submit" class="btn mt-4 btn-create">Create Event</button>
                
                </div>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>
    <div><Footer></Footer></div>
  </div>
  
</template>


<script>
import firebase from "firebase";
import{router} from '../main';




            
            
export default {
    components:{
        Navbar,
        Footer,
        
  },
  data() {
    return {
      form: {
        date:'',
        type:'',
        slots:'',
        location:'',
        time:'',
        level:'',
        
        users:[

        ],
        usersNickname:[

        ]
       

      },
      error: null,
                    center: { lat: 45.508, lng: -73.587 },
      markers: [{lat:53.1233959,leng:23.0863406
}],
      places: [],
      currentPlace: null,
    };
  },
  methods: {
    submit() {
          if (this.form.location=='') {
            this.error='You need to select location';
          }
        else{

          this.form.usersNickname[0]=firebase.auth().currentUser.displayName;
          this.form.users[0]=firebase.auth().currentUser.uid;
            
            const db=firebase.firestore();
            db.collection('events').doc().set({
              date: this.form.date,
              slots:this.form.slots,
              type:this.form.type,
              location:this.form.location,
              users:this.form.users,
              markers:this.markers,
              level:this.form.level,
              time:this.form.time,

              admin:firebase.auth().currentUser.uid,
              usersNickname:this.form.usersNickname
            })
        
            .then(() => {
              router.push('/profile')
            })
        
        .catch(err => {
          this.error = err.message;
        });
    
    
    }}, setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      this.markers=[];
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    this.form.location=document.getElementById('location').value
    },
  },
    beforeMount(){
          firebase.auth().onAuthStateChanged(function(user) {
          
        if (!user) {
          router.push("/");
        } 
      });
  }


};
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

</script>
<style>
#create-container {
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
 display: block;
  position: relative;
  padding-bottom: 100px;
}
.btn {
  background-color: #003c8f !important;
  color: white !important;
}
.btn-create{
  width: 50%;
  margin-left: 45%;
}
#reg{
    width: 50%;
    margin-left:45%;
    margin-top:10%;
}
</style>
