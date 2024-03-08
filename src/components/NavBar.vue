<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-brand">Zettelkasten</router-link>
    <div class="navbar-links">
      <router-link v-if="!user" to="/signup">Sign-up</router-link>
      <router-link v-if="!user" to="/login">Login</router-link>
      <router-link v-if="user" to="/tags">Tags</router-link>
      <router-link v-if="user" @click="logout" to="/login">Logout</router-link>
    </div>
  </nav>
</template>

<script>
import { useUserStore as userStore } from "../stores/userStore";
import { mapState, mapActions } from "pinia";
export default {
  name: "NavBar",
  computed: {
    ...mapState(userStore, { user: "getUser" }),
  },
  methods: {
    ...mapActions(userStore, ["logout"]),
  },
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
