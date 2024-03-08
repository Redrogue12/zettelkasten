<template>
  <div class="container">
    <div class="login-container">
      <h1>Login</h1>
      <form
        class="form-group d-flex flex-column"
        @submit.prevent="loginSequence(loginForm)"
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
    };
  },
  methods: {
    ...mapActions(userStore, ["setUser", "login"]),
    async loginSequence(loginForm) {
      const { email, password } = loginForm;
      await this.login(email, password);
      this.$router.push("/");
    },
  },
};
</script>
