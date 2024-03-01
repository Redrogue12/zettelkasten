import { defineStore } from "pinia";
import { useNotesStore } from "./notesStore";
import { mapState } from "pinia";
import axios from "axios";

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
    async fetchTags() {
      try {
        const response = await fetch("http://localhost:3000/tags");

        if (!response.ok) {
          this.error = true;
          throw new Error("Failed to fetch tags");
        }

        this.tags = await response.json();
      } catch (error) {
        console.error(error);
        this.error = true;
      }
    },
    async createTag(tag_name) {
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await fetch("http://localhost:3000/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tag_name,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create tag");
        }

        const newTag = await response.json();
        this.tags.push(newTag);
      } catch (error) {
        console.error(error);
      }
    },
    async editTag(tag_name, id) {
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await fetch(`http://localhost:3000/tags/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tag_name,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update tag");
        } else console.log("Tag updated successfully");

        const result = await response.json();
        const index = this.tags.findIndex((t) => t.tag_id === id);
        this.tags[index] = result;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTag(id) {
      if (!id) return console.error("No tag id provided");
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await fetch(`http://localhost:3000/tags/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete tag");
        } else console.log("Tag deleted successfully");

        this.tags = this.tags.filter((t) => t.tag_id !== id);
      } catch (error) {
        console.error(error);
      }
    },
    async connectTag(tag, note_id) {
      const { tag_id } = tag;
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await axios.post(
          `http://localhost:3000/tags/link`,
          {
            note_id,
            tag_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          console.log("Tag linked successfully");
          const notesStore = useNotesStore();
          notesStore.pushTagToNote(tag, note_id);
        } else {
          console.log("Failed to link tag");
          throw new Error("Failed to link tag");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
