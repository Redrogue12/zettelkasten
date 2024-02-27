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
        @click.stop="connectTag(tag)"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TagPill from "../Tags/TagPill.vue";
export default {
  name: "NoteTags",
  components: {
    TagPill,
  },
  data() {
    return {
      error: false,
      tags: [],
      tagSearch: "",
    };
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if (this.$refs.tagSearchInput) {
      this.$refs.tagSearchInput.focus();
    }
    this.fetchTags();
  },
  computed: {
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
        throw new Error("Failed to fetch tags");
      }
    },
    async connectTag(tag) {
      const { tag_id } = tag;
      const note_id = this.note.id;
      try {
        const response = await axios.post(`http://localhost:3000/tags/link`, {
          note_id,
          tag_id,
        });

        if (response.status === 201) {
          console.log("Tag linked successfully");
          this.$emit("tag-linked", tag);
        } else {
          console.log("Failed to link tag");
          throw new Error("Failed to link tag");
        }
      } catch (error) {
        console.error(error);
      }
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
