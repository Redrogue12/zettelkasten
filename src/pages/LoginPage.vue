<template>
  <div class="container">
    <div class="login-container">
      <h1>Login</h1>
      <form class="form-group d-flex flex-column" @submit.prevent="login">
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
    ...mapActions(userStore, ["setUser"]),
    async login() {
      const { email, password } = this.loginForm;
      if (!email || !password) {
        alert("Please fill out all fields");
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.loginForm),
        });

        if (!response.ok) {
          console.error("Error logging in");
          return;
        }

        const { user, token } = await response.json();
        this.setUser(user, token);

        this.$router.push("/");
      } catch (error) {
        console.error("Error logging in");
      }
    },
  },
};
</script>
