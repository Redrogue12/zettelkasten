<template>
  <h3>Edit Tag</h3>
  <div class="form-group d-flex flex-column">
    <label class="mb-3">
      <span>Tag Name:</span>
      <input
        class="form-control"
        ref="tagNameInput"
        v-model="localTag.tag_name"
      />
    </label>
    <button
      class="btn btn-success"
      style="width: 120px; align-self: center"
      id="edit-submit-button"
      @click.stop="editTag"
    >
      Submit
    </button>
  </div>
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
