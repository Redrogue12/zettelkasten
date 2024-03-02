<template>
  <div v-if="error">
    <h2>Failed to fetch tags</h2>
  </div>
  <div v-else>
    <h2>Tags</h2>
    <div class="form-group">
      <input
        ref="tagSearchInput"
        class="form-control"
        type="text"
        placeholder="Search tags..."
        v-model="tagSearch"
      />
    </div>
    <hr />
    <div class="note-tags-tags-container">
      <TagPill
        v-for="tag in filteredTags"
        :key="tag.tag_id"
        :tag="tag"
        @click.stop="onConnect(tag, note.id)"
      />
    </div>
  </div>
</template>

<script>
import TagPill from "../Tags/TagPill.vue";

import { useTagsStore as tagsStore } from "../../stores/tagsStore";
import { useUserStore as userStore } from "../../stores/userStore";
import { mapState, mapActions } from "pinia";
export default {
  name: "NoteTags",
  components: {
    TagPill,
  },
  data() {
    return {
      tagSearch: "",
    };
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  async mounted() {
    if (this.$refs.tagSearchInput) {
      this.$refs.tagSearchInput.focus();
    }
    if (this.user?.user_id) await this.fetchTags(this.user.user_id);
  },
  computed: {
    ...mapState(tagsStore, ["tags", "error"]),
    ...mapState(userStore, { user: "getUser" }),
    tagIds() {
      return this.note?.tags.map((tag) => tag.tag_id) || [];
    },
    filteredTags() {
      return this.tags
        .filter((tag) =>
          tag.tag_name.toLowerCase().includes(this.tagSearch.toLowerCase())
        )
        .filter((tag) => !this.tagIds.includes(tag.tag_id));
    },
  },
  methods: {
    ...mapActions(tagsStore, ["fetchTags", "connectTag"]),
    onConnect(tag, note_id) {
      this.connectTag(tag, note_id);
      this.$emit("tag-linked");
    },
  },
};
</script>

<style scoped>
.tags-container {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  gap: 5px;
}
</style>
