<template>
<div></div>
</template>

<script>
import firebase from "firebase";
import{router} from '../main'

export default {

  data() {
    return {

     
    };
  },
  methods: {
logout(){
firebase.auth().signOut()
  .then(function() {
    router.push('/login')
  })
  .catch(function() {
    // An error happened
  });}
  },
  beforeMount(){
    this.logout();
  }
}

</script>
<style>

</style>