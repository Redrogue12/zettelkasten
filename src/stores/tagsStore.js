import { defineStore, mapState } from "pinia";
import { useNotesStore } from "./notesStore";
import { http } from "./http";

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
        const { data } = await http.get(`/tags/${user_id}`);

        this.tags = data;
      } catch (error) {
        console.error("tags error", error);
        this.error = true;
      }
    },
    async createTag(tag_name, id) {
      if (!tag_name || !id) return console.error("Invalid tag");
      try {
        const response = await http.post(`/tags/id/${id}`, {
          tag_name,
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
      if (!tag_name || !id) return console.error("Invalid tag");
      try {
        const { data } = await http.put(`/tags/${id}`, {
          tag_name,
        });

        const index = this.tags.findIndex((t) => t.tag_id === id);
        this.tags[index] = data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTag(id) {
      if (!id) return console.error("No tag id provided");
      try {
        await http.delete(`/tags/${id}`);

        this.tags = this.tags.filter((t) => t.tag_id !== id);
      } catch (error) {
        console.error(error);
      }
    },
    async connectTag(tag, note_id) {
      if (!tag || !tag.tag_id || !note_id)
        return console.error("Invalid tag or note id");
      const { tag_id } = tag;
      try {
        const response = await http.post(`/tags/link`, {
          tag_id,
          note_id,
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
        console.error("tags/link error", error);
      }
    },
    resetTagsStore() {
      this.tags = [];
      this.error = false;
    },
  },
});
