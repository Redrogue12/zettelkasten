<template>
  <div class="d-flex flex-column justify-content-between h-100 flex-grow-1">
    <h2>
      Are you sure you want to delete this tag:
      <strong>"{{ tag?.tag_name }}"</strong>?
    </h2>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-danger" @click.stop="onDeleteTag(tag.tag_id)">
        Yes
      </button>
    </div>
  </div>
</template>

<script>
import { useTagsStore as tagsStore } from "@/stores/tagsStore";
import { mapActions } from "pinia";
export default {
  name: "DeleteTag",
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      error: "",
    };
  },
  methods: {
    ...mapActions(tagsStore, ["deleteTag"]),
    async onDeleteTag(tagId) {
      if (!tagId) return;
      await this.deleteTag(tagId)
        .then(() => {
          this.$emit("close");
        })
        .catch(() => {
          this.error = "Error deleting tag";
        });
    },
  },
};
</script>
