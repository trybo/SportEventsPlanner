<template>
  <div id="home-container" class="overflow-hidden">
    <Navbar />
    <h1 class="text-center my-4">All events</h1>
    <div class="card-columns m-4 ">
        <EventCard v-for="event in events" :key="event.id" v-bind:type="event.type" v-bind:location="event.location" v-bind:date="event.date"></EventCard>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import firebase from "firebase";

export default {
  components: {
    Navbar,
    EventCard,
    Footer
  },
  data() {
    return {
      events: []
    };
  },
  methods: {
    getEvents() {
      const db = firebase.firestore();
      db.collection("events").get().then(querrySnapshot => {
          querrySnapshot.forEach(doc => {
            this.events.push(doc.data());
          });
        });
    }
  },
  beforeMount() {
    this.getEvents();
  }
};
</script>

<style>
#home-container {
  position: relative;
  min-height: 100vh;
}
</style>