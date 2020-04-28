<template>
  <nav class="navbar navbar-expand-sm navbar-custom">
    <a class="navbar-brand" href="#">
      <img src="../assets/logo.png" width="200" height="36" alt="Logo" />
    </a>
    <button
      class="navbar-toggler "
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link px-3" href="#">Home</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link px-3" href="#">Events</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link px-3" href="#">Create event</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link px-3" href="#">Your events</a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link px-3" href="#">Sign in</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link px-3" href="#">Sign up</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link px-3" href="#">Profile</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link px-3" href="#">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
</script>

<style>
.navbar-custom {
    background-color: #003c8f;
}
/* change the brand and text color */
.navbar-custom .navbar-brand,
.navbar-custom .navbar-text {
    color: #ffffff;
}
/* change the link color */
.navbar-custom .navbar-nav .nav-link {
    color: rgba(255,255,255,.5);
}
/* change the color of active or hovered links */
.navbar-custom .nav-item.active .nav-link,
.navbar-custom .nav-item:hover .nav-link {
    color: #ffffff;
}

.nav {
  height: 5%;
}
</style>