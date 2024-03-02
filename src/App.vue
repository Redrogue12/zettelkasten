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
import { mapState, mapActions } from "pinia";
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
      console.log("Token is not valid");
      router.push("/login");
    } else if (!this.user) {
      console.log("No user found");
      router.push("/login");
    }
  },
  computed: {
    ...mapState(userStore, { user: "getUser" }),
  },
  methods: {
    ...mapActions(userStore, ["validateToken"]),
  },
};
</script>
