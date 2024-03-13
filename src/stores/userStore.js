import { defineStore } from "pinia";
// import { useRouter } from "vue-router";
import { useNotesStore } from "./notesStore";
import { useTagsStore } from "./tagsStore";

import { mapActions } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: localStorage.zettelkasten_user
      ? JSON.parse(localStorage.zettelkasten_user)
      : null,
    userError: false,
    // router: useRouter(),
  }),
  getters: {
    getUser: (state) => state.user,
    getError: (state) => state.userError,
  },
  actions: {
    ...mapActions(useNotesStore, ["resetNotesStore"]),
    ...mapActions(useTagsStore, ["resetTagsStore"]),
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
          body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
          console.error("Error signing up");
          return;
        }

        const { user, token } = await response.json();
        console.log("user:", user);
        this.setUser(user, token);
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
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          console.error("response:", response);
          return Promise.reject("Error logging in");
        }

        const { user, token } = await response.json();
        this.setUser(user, token);
        return Promise.resolve("Logged in");
      } catch (error) {
        return Promise.reject("Error logging in");
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
    resetUsersStore() {
      this.user = null;
      this.userError = false;
    },
    logout() {
      localStorage.removeItem("zettelkasten_token");
      localStorage.removeItem("zettelkasten_user");
      this.resetUsersStore();
      this.resetNotesStore();
      this.resetTagsStore();
    },
  },
});
