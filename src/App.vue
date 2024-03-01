<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import router from "./router";
import { useUserStore as userStore } from "./stores/userStore";
import { mapActions } from "pinia";
import "./assets/styles.css";

export default {
  router,
  components: {
    NavBar,
  },
  async mounted() {
    const token = localStorage.getItem("zettelkasten_token");
    const valid = await this.validateToken(token);
    if (!valid?.valid) {
      router.push("/login");
    }
  },
  methods: {
    ...mapActions(userStore, ["validateToken"]),
  },
};
</script>
