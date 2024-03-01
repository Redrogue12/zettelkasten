<template>
  <h3>Edit Tag</h3>
  <div class="form-group">
    <label class="w-100">
      <span>Title:</span>
      <input
        class="form-control"
        ref="tagNameInput"
        v-model="localTag.tag_name"
      />
    </label>
  </div>

  <button
    class="btn btn-success centered-btn"
    id="edit-submit-button"
    @click.stop="onEdit(tag)"
  >
    Submit
  </button>
</template>

<script>
import { useTagsStore as tagsStore } from "@/stores/tagsStore";
import { mapState, mapActions } from "pinia";

export default {
  name: "EditTag",
  data() {
    return {
      localTag: { tag_name: "" },
    };
  },
  emits: ["edited"],
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(tagsStore, ["error"]),
  },
  mounted() {
    if (this.$refs.tagNameInput) {
      this.$refs.tagNameInput.focus();
      this.localTag = { ...this.tag };
    }
  },
  methods: {
    ...mapActions(tagsStore, ["editTag"]),
    onEdit(tag) {
      this.editTag(tag);
      this.$emit("edited");
    },
  },
};
</script>
