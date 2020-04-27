<template>
  <div class="home">
    <img alt="SportEventsPlanner logo" src="../assets/logo.png">
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Footer
  }
}
</script>
