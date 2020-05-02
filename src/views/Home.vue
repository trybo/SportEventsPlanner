<template>
  <div id="home-container" class="overflow-hidden">
    <Navbar />
    <HomeCards />
    <Footer />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import HomeCards from "@/components/HomeCards";
import Footer from "@/components/Footer";
export default {
  components: {
    Navbar,
    HomeCards,
    Footer
  }
};
</script>

<style>
#home-container {
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
 display: block;
  position: relative;
  padding-bottom: 100px;
}
</style>