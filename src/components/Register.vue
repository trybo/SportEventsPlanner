<template>
  <div id="reg-container" class="overflow-hidden">
    <Navbar />
    <div>
      <div class="container d-flex justify-content-center align-items-center">
        <div class="card-deck text-center mt-3">
          <div class="card">
            <div class="card-body">
              <div class="h3 text-center">Sign up</div>
              <br />
              <div v-if="error" class="alert alert-danger">{{error}}</div>

              <form action="#" @submit.prevent="submit">
                <div class="form-group row">
                  <input
                    id="email"
                    type="email"
                    class="form-control mx-4"
                    placeholder="Email"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>

                <div class="form-group row">
                  <input
                    id="password"
                    type="password"
                    class="form-control mx-4"
                    placeholder="Password"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
                <div class="form-group row">
                  <input
                    id="password2"
                    type="password"
                    class="form-control mx-4"
                    placeholder="Confirm Password"
                    name="password2"
                    required
                    v-model="form.password2"
                  />
                </div>
                <div class="form-group row">
                  <input
                    id="name"
                    type="text"
                    class="form-control mx-4"
                    placeholder="Name"
                    name="text"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
                <div class="form-group row">
                  <input
                    id="age"
                    type="date"
                    class="form-control mx-4"
                    placeholder="Date of birth"
                    name="age"
                    value
                    required
                    autofocus
                    v-model="form.age"
                  />
                </div>

                <div class="text-center mb-3">
                  <button type="submit" class="btn">Sign up</button>
                </div>
              </form>
              <p>
                If you have an account yet, please
                <router-link to="/login">
                  <b>Sign in</b>.
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>


<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import firebase from "firebase";
import { router } from "../main";

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password2: "",
        dateOfBirth: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      if (this.form.password == this.form.password2) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            data.user.updateProfile({
              displayName: this.form.name
            });
            const db = firebase.firestore();
            var user = firebase.auth().currentUser;
            db.collection("users")
              .doc(user.uid)
              .set({
                age: this.form.age
              })

              .then(() => {
                router.push("/profile");
              });
          })
          .catch(err => {
            this.error = err.message;
          });
      } else {
        this.error = "Passwords must be the same";
      }
    }
  },
  beforeMount(){
          firebase.auth().onAuthStateChanged(function(user) {
          
        if (user) {
          router.push("/");
        } 
      });
  }
};
</script>
<style>
#reg-container {
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
 display: block;
  position: relative;
  padding-bottom: 100px;
}
.btn {
  background-color: #003c8f !important;
  color: white !important;
  width: 50%;
}
</style>
