<template>
  <h3>Edit Tag</h3>
  <form @submit.prevent="editTag">
    <label for="editTagName">Tag Name:</label>
    <input
      class="form-control mb-3"
      ref="tagNameInput"
      id="ediTagName"
      v-model="localTag.tag_name"
    />
    <button
      class="btn btn-success"
      style="width: 120px; align-self: center"
      id="edit-submit-button"
      type="submit"
    >
      Submit
    </button>
  </form>
</template>

<script>
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
  mounted() {
    if (this.$refs.tagNameInput) {
      this.$refs.tagNameInput.focus();
      this.localTag = { ...this.tag };
    }
  },
  methods: {
    async editTag() {
      try {
        const response = await fetch(
          `http://localhost:3000/tags/${this.tag.tag_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tag_name: this.localTag.tag_name,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update tag");
        } else console.log("Tag updated successfully");

        const result = await response.json();

        this.$emit("edited", result);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
