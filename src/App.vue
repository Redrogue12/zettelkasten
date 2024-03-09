<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import router from "./router";

import "./assets/styles.css";

export default {
  router,
  components: {
    NavBar,
  },
};
</script>
