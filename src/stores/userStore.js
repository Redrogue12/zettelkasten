import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: localStorage.zettelkasten_user
      ? JSON.parse(localStorage.zettelkasten_user)
      : null,
    userError: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getError: (state) => state.userError,
  },
  actions: {
    async signup(username, email, password) {
      if (!username || !email || !password) {
        alert("Please fill out all fields");
        return;
      }
      try {
        const response = await fetch(`${process.env.VUE_APP_SERVER}/signup`, {
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
      } catch (error) {
        console.error("Error signing up", error);
      }
    },
    async login(email, password) {
      if (!email || !password) {
        alert("Please fill out all fields");
        return;
      }
      try {
        const response = await fetch(`${process.env.VUE_APP_SERVER}/login`, {
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
    async validateToken() {
      const token = localStorage.zettelkasten_token;
      if (token) {
        try {
          const response = await fetch(
            `${process.env.VUE_APP_SERVER}/validate`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to validate token");
          }
          return response.json();
        } catch (error) {
          console.error("Error:", error);
        }
      }
    },
    setUser(user, token) {
      localStorage.setItem("zettelkasten_token", token);
      localStorage.setItem("zettelkasten_user", JSON.stringify(user));
      this.user = user;
    },
    logout() {
      localStorage.removeItem("zettelkasten_token");
      localStorage.removeItem("zettelkasten_user");
      this.user = null;
    },
  },
});
