<template>
  <div class="container">
    <div class="login-container">
      <h1>Sign-up</h1>
      <form
        class="form-group d-flex flex-column"
        @submit.prevent="
          signup(signupForm.username, signupForm.email, signupForm.password)
        "
      >
        <label class="mb-3">
          <span>Username:</span>
          <input
            class="form-control"
            v-model="signupForm.username"
            placeholder="Username"
            required
          />
        </label>

        <label class="mb-3">
          <span>Email:</span>
          <input
            class="form-control"
            v-model="signupForm.email"
            placeholder="Email"
            required
          />
        </label>

        <label class="mb-3">
          <span>Password:</span>
          <input
            class="form-control"
            v-model="signupForm.password"
            placeholder="Password"
            type="password"
            required
          />
        </label>

        <button class="btn btn-primary centered-btn" type="submit">
          Sign-up
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
      signupForm: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(userStore, ["setUser", "signup"]),
  },
};
</script>
