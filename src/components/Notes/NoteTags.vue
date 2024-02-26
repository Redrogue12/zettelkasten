<template>
  <div>
    <h2>Tags</h2>
    <div class="form-group">
      <input
        ref="tagSearchInput"
        class="form-control"
        type="text"
        v-model="tagSearch"
      />
    </div>
    <hr />
    <div>
      <TagPill
        v-for="tag in filteredTags"
        :key="tag.tag_id"
        :tag="tag"
        @click.stop="connectTag(tag.tag_id)"
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
    filteredTags() {
      return this.tags.filter((tag) =>
        tag.tag_name.toLowerCase().includes(this.tagSearch.toLowerCase())
      );
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
      }
    },
    async connectTag(tag_id) {
      const note_id = this.note.id;
      try {
        const response = await axios.post(`http://localhost:3000/tags/link`, {
          note_id,
          tag_id,
        });

        if (response.status === 201) {
          console.log("Tag linked successfully");
        } else {
          console.log("Failed to link tag");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
