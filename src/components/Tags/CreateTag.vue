<template>
  <h2>Create a Tag</h2>
  <div class="form-group">
    <label class="mb-3 w-100">
      <span>Title:</span>
      <input ref="tagNameInput" class="form-control" v-model="tagName" />
    </label>
  </div>
  <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  <button
    class="btn btn-success centered-btn"
    @click.stop="
      createTag(tagName);
      $emit('created');
    "
  >
    Submit
  </button>
</template>

<script>
import { useTagsStore as tagsStore } from "../../stores/tagsStore";
import { mapState, mapActions } from "pinia";
export default {
  name: "CreateTag",
  data() {
    return {
      tagName: "",
    };
  },
  emits: ["created"],
  mounted() {
    if (this.$refs.tagNameInput) {
      this.$refs.tagNameInput.focus();
    }
  },
  computed: {
    ...mapState(tagsStore, ["error"]),
  },
  methods: {
    ...mapActions(tagsStore, ["createTag"]),
  },
};
</script>
