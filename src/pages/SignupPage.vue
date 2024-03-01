<template>
  <div class="container">
    <div class="login-container">
      <h1>Sign-up</h1>
      <form class="form-group d-flex flex-column" @submit.prevent="signup">
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
    ...mapActions(userStore, ["setUser"]),
    async signup() {
      const { username, email, password } = this.signupForm;
      if (!username || !email || !password) {
        alert("Please fill out all fields");
        return;
      }
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.signupForm),
      });

      if (!response.ok) {
        console.error("Error signing up");
        return;
      }

      const { user, token } = await response.json();

      this.setUser(user, token);

      alert("Signup successful");
      this.$router.push("/");
    },
  },
};
</script>
