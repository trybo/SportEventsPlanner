<template>
  <div class="overflow-hidden">
   <Navbar />
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card" id="reg" style="width:800px; margin:0 auto;">
          <div class="card-header">Create Event</div>
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
                <label for="slots" class="col-md-4 col-form-label text-md-right">Slots</label>

                <div class="col-md-6">
                  <input
                    id="slots"
                    type="slots"
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
                  <input
                    id="location"
                    type="text"
                    class="form-control"
                    name="location"
                    value
                    required
                    autofocus
                    v-model="form.location"
                  />
                </div>
              </div>
 

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Create Event</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
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
        date:'',
        type:'',
        slots:'',
        location:'',
        
        users:[
          {name:''}
          
        ]

      },
      error: null
    };
  },
  methods: {
    submit() {

        
        
          this.form.users[0].name=firebase.auth().currentUser.displayName;

            const db=firebase.firestore();
            db.collection('events').doc('test').set({
              date: this.form.date,
              slots:this.form.slots,
              type:this.form.type,
              location:this.form.location,
              users:this.form.users,
              admin:firebase.auth().currentUser.uid
            })
        
            .then(() => {
              router.push('/profile')
            })
        
        .catch(err => {
          this.error = err.message;
        });
    
    
    }
  }
};
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
</script>
<style>
#reg{
    width: 50%;
    margin-left:45%;
    margin-top:10%;
}
</style>