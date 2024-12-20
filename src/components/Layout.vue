<template>
  <div>
    <nav class="navbar">
      <RouterLink to="/" class="navlink">Home</RouterLink>
      <RouterLink to="/stats" class="navlink">Total</RouterLink>
    </nav>
    
    <RouterView />
  </div>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  width: 100%;
  text-align: center;
  position: fixed;
  top:50px;
  left: 0;
}
.navlink {
  font-size: 20px;
  margin-right: 15px;
  text-decoration: none;
  color: blue;
}

.navlink:hover {
  color: red;
}
</style>
