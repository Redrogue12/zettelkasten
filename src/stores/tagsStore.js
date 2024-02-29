import { defineStore } from "pinia";

export const useTagsStore = defineStore("Tags", {
  state: () => ({
    tags: [],
  }),
  getters: {
    getTags: (state) => state.tags,
  },
  actions: {
    fetchTags() {
      this.tags = ["note1", "note2", "note3"];
    },
  },
});
