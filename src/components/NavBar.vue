<template>
  <nav class="navbar">
    <div class="navbar-brand">Zettelkasten</div>
    <div class="navbar-links">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/tags">Tags</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f8f8f8;
  height: 50px;
  align-content: center;
}

.navbar-brand {
  font-size: 1.5em;
}

.navbar-links {
  display: flex;
  gap: 10px;
}
</style>
