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
        const response = await fetch("http://localhost:3000/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        alert("Tag created successfully!");
      } catch (error) {
        console.error(error);
      }
    },
    async editTag(tag) {
      try {
        const response = await fetch(
          `http://localhost:3000/tags/${tag.tag_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tag_name: tag.tag_name,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update tag");
        } else console.log("Tag updated successfully");

        const result = await response.json();
        const index = this.tags.findIndex((t) => t.tag_id === tag.tag_id);
        this.tags[index] = result;
      } catch (error) {
        console.error(error);
      }
    },
    async connectTag(tag, note_id) {
      const { tag_id } = tag;
      try {
        const response = await axios.post(`http://localhost:3000/tags/link`, {
          note_id,
          tag_id,
        });

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
