import { defineStore } from "pinia";
import { useNotesStore } from "./notesStore";
import { mapState } from "pinia";

export const useTagsStore = defineStore("Tags", {
  state: () => ({
    tags: [],
    error: false,
  }),
  getters: {
    ...mapState(useNotesStore, ["notes"]),
    getTags: (state) => state.tags,
  },
  actions: {
    async fetchTags(user_id) {
      if (!user_id) return console.error("Invalid user id");
      if (this.tags.length > 0) return;
      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER}/tags/${user_id}`
        );

        if (!response.ok) {
          this.error = true;
          throw new Error("Failed to fetch tags");
        }

        this.tags = await response.json();
      } catch (error) {
        console.error("tags error", error);
        this.error = true;
      }
    },
    async createTag(tag_name, user_id) {
      if (!tag_name || !user_id)
        return Promise.reject("Missing tag name and/or id");
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await fetch(
          `${process.env.VUE_APP_SERVER}/tags/id/${user_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              tag_name,
            }),
          }
        );

        if (!response.ok) {
          throw Promise.reject("Failed to create tag");
        }

        const newTag = await response.json();
        this.tags.push(newTag);
        return Promise.resolve("Tag created successfully");
      } catch (error) {
        return Promise.reject("Failed to create tag");
      }
    },
    async editTag(tag_name, id) {
      if (!tag_name || !id) return Promise.reject("Invalid tag name and/or id");
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await fetch(
          `${process.env.VUE_APP_SERVER}/tags/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              tag_name,
            }),
          }
        );

        if (!response.ok) {
          return Promise.reject("Failed to update tag");
        }
        const result = await response.json();
        const index = this.tags.findIndex((t) => t.tag_id === id);
        this.tags[index] = result;
        return Promise.resolve("Tag updated successfully");
      } catch (error) {
        return Promise.reject("Failed to update tag");
      }
    },
    async deleteTag(id) {
      if (!id) return Promise.reject("Invalid tag id");
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await fetch(
          `${process.env.VUE_APP_SERVER}/tags/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          return Promise.reject("Failed to delete tag");
        }

        this.tags = this.tags.filter((t) => t.tag_id !== id);
        return Promise.resolve("Tag deleted successfully");
      } catch (error) {
        return Promise.reject("Failed to delete tag");
      }
    },
    async connectTag(tag, note_id) {
      if (!tag || !tag.tag_id || !note_id)
        return Promise.reject("Invalid tag and/or note id");
      const { tag_id } = tag;
      try {
        const token = localStorage.getItem("zettelkasten_token");

        const response = await fetch(
          `${process.env.VUE_APP_SERVER}/tags/link`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              tag_id,
              note_id,
            }),
          }
        );

        if (response.status === 201) {
          const notesStore = useNotesStore();
          notesStore.pushTagToNote(tag, note_id);
          return Promise.resolve("Tag linked successfully");
        } else {
          return Promise.reject("Failed to link tag");
        }
      } catch (error) {
        return Promise.reject("Failed to link tag");
      }
    },
    resetTagsStore() {
      this.tags = [];
      this.error = false;
    },
  },
});
