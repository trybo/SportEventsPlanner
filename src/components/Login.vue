<template>
  <div id="home-container" class="overflow-hidden">
    <Navbar />
    <div>
      <div class="container d-flex vh-100 text-white justify-content-center align-items-center">
        <div class="col-sm-6 col-12 text-center">
          <div class="card" id="login">
            <div class="card-body">
              <div class="h3 text-center">Sign in</div>
              <br />
              <div v-if="error" class="alert alert-danger">{{error}}</div>
              <div class="d-flex flex-column align-items-center">
                <button class="btn bg-primary text-white mb-3" @click="facebookLogin">
                  Sign in with Facebook
                </button>
                <button class="btn bg-danger text-white mb-3" @click="googleLogin">
                  Sign in with Google
                </button>
              </div>

              <div class="h6 text-center mb-3">or</div>
              <form action="#" @submit.prevent="submit">
                <div class="form-group row">
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    class="form-control mx-4"
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
                    placeholder="Password"
                    type="password"
                    class="form-control mx-4"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>

                <div class="text-center mb-3">
                  <button type="submit" class="btn">Sign in</button>
                </div>
                <p>
                  Forgot your password?
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
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
        email: "",
        password: ""
      },
      error: null
    };
  },

  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          router.push("/profile");
        })

        .catch(err => {
          this.error = err.message;
        });
    },
    async facebookLogin() {
      try {
        const provider = new firebase.auth.FacebookAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        this.$router.push("/");
        console.log(result.user);
      } catch (error) {
        console.log(error.message);
      }
    },
    async googleLogin() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        this.$router.push("/");
        console.log(result.user);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
</script>

<style>
#home-container {
  position: relative;
  min-height: 100vh;
}
.btn {
  background-color: #003c8f !important;
  color: white !important;
}
</style>