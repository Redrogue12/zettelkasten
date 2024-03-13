<template>
  <div class="container">
    <div class="login-container">
      <h1>Login</h1>
      <form
        class="form-group d-flex flex-column"
        @submit.prevent="onLogin(loginForm.email, loginForm.password)"
      >
        <label class="mb-3">
          <span>Email:</span>
          <input
            class="form-control"
            v-model="loginForm.email"
            placeholder="Email"
            required
          />
        </label>

        <label class="mb-3">
          <span>Password:</span>
          <input
            class="form-control"
            v-model="loginForm.password"
            placeholder="Password"
            type="password"
            required
          />
        </label>

        <p v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </p>

        <button class="btn btn-primary centered-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore as userStore } from "../stores/userStore";
import { mapActions } from "pinia";
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    ...mapActions(userStore, ["setUser", "login"]),
    async onLogin(email, password) {
      try {
        await this.login(email, password);
        this.$router.push("/");
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>
