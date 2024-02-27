<template>
  <h3>Create a Tag</h3>
  <form @submit.prevent="createTag">
    <label for="tagName">Tag Name:</label>
    <input
      id="tagName"
      ref="tagNameInput"
      class="form-control"
      v-model="tagName"
      required
    />

    <button
      class="btn btn-success"
      style="width: 120px; align-self: center"
      type="submit"
    >
      Create Tag
    </button>
  </form>
</template>

<script>
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
      this.localTag = { ...this.tag };
    }
  },
  methods: {
    async createTag() {
      try {
        const response = await fetch("http://localhost:3000/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tag_name: this.tagName,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create tag");
        }

        const newTag = await response.json();

        this.$emit("created", newTag);
        this.tagName = "";
        alert("Tag created successfully!");
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
