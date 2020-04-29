<template>
  <div id="home-container" class="overflow-hidden">
    <Navbar />
    <EventCard />
    <Footer />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
export default {
  components: {
    Navbar,
    EventCard,
    Footer
  }
};
</script>

<style>
#home-container {
  position: relative;
  min-height: 100vh;
}
</style>