<template>
  <div id="profile-container" class="overflow-hidden">
    <Navbar />

    <h1 class="text-center my-4">Your profile</h1>

    <div class="container d-flex justify-content-center align-items-center">
       
    
    <div class="row">
      <div class="col-md-5 mx-4">
        <p>
          <b>Nickname:</b>
          {{ this.form.nickname }}
        </p>
        <p>
          <b>Date of birth:</b>
          {{ this.form.age }}
        </p>
        <p>
          <b>Email:</b>
          {{ this.form.email }}
        </p>

        <form action="#" @submit.prevent="updatePassword" id="form-change-password">
          <div class="form-row">
            <div class="col">
              <input
                id="password"
                type="password"
                class="form-control"
                placeholder="New password"
                name="password"
                required
                v-model="form.password"
              />
            </div>
            <div class="col">
              <input
                id="password2"
                type="password"
                class="form-control"
                placeholder="Confirm password"
                name="password2"
                required
                v-model="form.password2"
              />
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn text-white my-4">Change password</button>
          </div>
        </form>

        <div class="text-center">
          <button type="button" class="btn text-white my-4" @click="deleteUser">Delete account</button>
        </div>
      </div>
      <div class="col-md-6 text-center mb-4">
        <p><img id="avatar" class="rounded-circle" style="width:200px;height:200px;object-fit:cover;"></p>
        <input type="file" @change.prevent="onFileSelected">
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
        email: "",
        nickname: "",
        age: "",
        password: "",
        password2: ""
      },
      error: null
    };
  },
  methods: {
    getData() {
      var self = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const db = firebase.firestore();
          db.collection("users")
            .doc(user.uid)
            .get()
            .then(doc => {
              self.form.email = user.email;
              self.form.nickname = user.displayName;
              self.form.age = doc.data().age;
            });
        } else {
          router.push("/login");
        }
      });
    },
    updatePassword() {
      if (this.form.password == this.form.password2) {
        var user = firebase.auth().currentUser;
        var passForm = document.getElementById("form-change-password");

        user
          .updatePassword(this.form.password)
          .then(function() {
            // Update successful.
            alert("Password has been updated!");
            passForm.reset();
          })
          .catch(function(error) {
            // An error happened.
            console.log(error);
            alert(`${error}`);
          });
      } else {
        alert("Passwords are not the same!");
      }
    },
    deleteUser() {
      if (confirm("Do you want to delete your account?")) {
        var user = firebase.auth().currentUser;
                const db = firebase.firestore();
        db.collection("users").doc(user.uid).delete();

        user
          .delete()
          .then(function() {
            router.push("/");
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    onFileSelected(e) {
            var self=this;
       firebase.auth().onAuthStateChanged(function(user) {
          
        if (user) {
   
    self.uid = user.uid;
     let file = e.target.files[0];
     var storageRef = firebase.storage().ref('/profilepicture/'+ self.uid);
     storageRef.put(file);
      
         
        } 
      })
     router.go()
    },
    fileLoad(){
      var self=this;
       firebase.auth().onAuthStateChanged(function(user) {
          
        if (user) {
                self.uid = user.uid;
      
      var storageReference = firebase.storage();
      storageReference.ref('profilepicture/' + self.uid).getDownloadURL().then(function(url) {
        document.getElementById("avatar").src = url;
        
      })
         
        } 
      })
      
    },
    showPhoto() {
     
      this.fileLoad();
      
    }
  
  },
  beforeMount() {
     firebase.auth().onAuthStateChanged(function(user) {
          
        if (!user) {
          router.push("/");
        } 
      })
      this.getData();
    this.showPhoto();
    
  }
};
</script>
<style>
#profile-container {
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
 display: block;
  position: relative;
  padding-bottom: 100px;
}
.btn {
  background-color: #003c8f !important;
  width: 50%;
}
</style>
