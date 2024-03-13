<template>
  <h2>Edit Tag</h2>
  <div class="form-group">
    <label class="w-100">
      <span>Title:</span>
      <input
        class="form-control mb-3"
        ref="tagNameInput"
        v-model="localTag.tag_name"
      />
    </label>
  </div>

  <div v-if="error" class="alert alert-danger" role="alert">
    {{ error }}
  </div>

  <font-awesome-icon
    class="delete-icon fa-lg pointer"
    icon="trash"
    @click.stop="$emit('delete')"
  />
  <hr />

  <button
    class="btn btn-success centered-btn"
    id="edit-submit-button"
    @click.stop="onEdit(localTag.tag_name, tag.tag_id)"
  >
    Submit
  </button>
</template>

<script>
import { useTagsStore as tagsStore } from "@/stores/tagsStore";
import { mapActions } from "pinia";

export default {
  name: "EditTag",
  data() {
    return {
      localTag: { tag_name: "" },
      error: "",
    };
  },
  emits: ["edited", "delete"],
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if (this.$refs.tagNameInput) {
      this.$refs.tagNameInput.focus();
      this.localTag = { ...this.tag };
    }
  },
  methods: {
    ...mapActions(tagsStore, ["editTag"]),
    async onEdit(tag, id) {
      if (!tag || !id) return;
      await this.editTag(tag, id)
        .then(() => {
          this.$emit("edited");
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>

<style scoped>
.delete-icon {
  align-self: flex-end;
}
</style>
