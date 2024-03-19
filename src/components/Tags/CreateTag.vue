<template>
  <h2>Create Tag</h2>
  <div class="form-group">
    <label class="mb-3 w-100">
      <span>Title:</span>
      <input ref="tagNameInput" class="form-control" v-model="tagName" />
    </label>
  </div>
  <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  <button
    class="btn btn-success centered-btn"
    @click.stop="onCreateTag(tagName, user.user_id)"
  >
    Submit
  </button>
</template>

<script>
import { useTagsStore as tagsStore } from "../../stores/tagsStore";
import { useUserStore as userStore } from "../../stores/userStore";
import { mapState, mapActions } from "pinia";
export default {
  name: "CreateTag",
  data() {
    return {
      tagName: "",
      error: "",
    };
  },
  emits: ["created"],
  mounted() {
    if (this.$refs.tagNameInput) {
      this.$refs.tagNameInput.focus();
    }
  },
  computed: {
    ...mapState(userStore, { user: "getUser" }),
  },
  methods: {
    ...mapActions(tagsStore, ["createTag"]),
    async onCreateTag(tagName, userId) {
      if (!tagName) {
        this.error = "Tag name is required";
        return;
      }
      await this.createTag(tagName, userId)
        .then(() => {
          this.$emit("created");
        })
        .catch((error) => {
          console.log("error:", error);
          this.error = error;
        });
    },
  },
};
</script>
