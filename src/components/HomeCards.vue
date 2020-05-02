<template>
<div id="home-container" class="container d-flex justify-content-center align-items-center">
  
  <div class="card-columns text-center mt-3">
    <router-link to="/events">
    <div class="card bg-transparent text-white p-2">
      <img class="card-img-top" src="../assets/football.jpg" alt="Card image cap" />
      <div class="card-body">
        <h3 class="card-title">Football</h3>
        <p
          class="card-text"
        >Are you looking for sporting events in your area for sports? This is for you.</p>
      </div>
    </div>
      </router-link>
    <router-link to="/events">
    <div class="card bg-transparent text-white p-2">
      <img class="card-img-top" src="../assets/basketball.jpg" alt="Card image cap" />
      <div class="card-body">
        <h3 class="card-title">Basketball</h3>
        <p
          class="card-text"
        >Are you looking for members to a basketball tournament? Create an event and invite friends.</p>
      </div>
    </div>
    </router-link>
    <router-link to="/events">
    <div class="card bg-transparent text-white p-2">
      <img class="card-img-top" src="../assets/tennis.jpg" alt="Card image cap" />
      <div class="card-body">
        <h3 class="card-title">And more</h3>
        <p
          class="card-text"
        >Select a sport, set the date and venue of the event, invite your friends and enjoy.</p>
      </div>
    </div>
    </router-link>
  </div>
</div>
</template>

<script>
</script>

<style>
.card{
    border: none !important;
    background-color: #1565c0 !important;
}
.home-container {
 min-height: 100vh; /* will cover the 100% of viewport */
 overflow: hidden;
 display: block;
 position: relative;
 padding-bottom: 100px; /* height of your footer */
}
</style>