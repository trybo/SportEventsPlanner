<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card" id="reg">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div style="color:red" v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">


              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="password2" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                <div class="col-md-6">
                  <input
                    id="password2"
                    type="password"
                    class="form-control"
                    name="password2"
                    required
                    v-model="form.password2"
                  />
                </div>
              </div>
                <div class="form-group row">
                 <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                <div class="col-md-6">
                  <input
                    id="name"
                    type="text"
                    class="form-control"
                    name="text"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
              </div>
                <div class="form-group row">
                 <label for="age" class="col-md-4 col-form-label text-md-right">Age</label>

                <div class="col-md-6">
                  <input
                    id="age"
                    type="number"
                    class="form-control"
                    name="age"
                    value
                    required
                    autofocus
                    v-model="form.age"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";



            
            
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password2:"",
        age:""
      },
      error: null
    };
  },
  methods: {
    submit() {
        if (this.password==this.password2){

        
        
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
            const db=firebase.firestore();
            var user=firebase.auth().currentUser;
            db.collection('users').doc(user.uid).set({
      nickname: this.form.name,
      age: this.form.age
            })
        
            .then(() => {});
        })
        .catch(err => {
          this.error = err.message;
        });
    }
    }
  }
};
</script>
<style>
#reg{
    width: 50%;
    margin-left:45%;
    margin-top:10%;
}
</style>