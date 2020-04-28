<template>
  <div class="overflow-hidden">
    <Navbar />
    <HomeCards />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import HomeCards from '@/components/HomeCards'
import Footer from '@/components/Footer'

export default {
    components: {
        Navbar,
        HomeCards,
        Footer
    }
}
</script>

<style>
</style>