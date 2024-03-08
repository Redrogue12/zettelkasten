import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useNotesStore } from "./notesStore";
import { useTagsStore } from "./tagsStore";
import { http } from "./http";

import { mapActions } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: localStorage.zettelkasten_user
      ? JSON.parse(localStorage.zettelkasten_user)
      : null,
    userError: false,
    router: useRouter(),
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
        const { data } = await http.post(`/signup`, {
          username,
          email,
          password,
        });

        const { user, token } = data;

        this.setUser(user, token);

        this.router.push("/");
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
        const { data } = await http.post(`/login`, { email, password });
        const { user, token } = data;
        this.setUser(user, token);

        this.router.push("/");
      } catch (error) {
        console.log("error:", error);
        console.error("Error logging in");
      }
    },
    async validateToken() {
      const token = localStorage.zettelkasten_token;
      if (token) {
        try {
          const { data } = await http.post(`/validate`, {
            token,
          });
          return data;
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
