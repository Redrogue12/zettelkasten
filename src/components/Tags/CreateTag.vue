<template>
  <h3>Create a Tag</h3>
  <form @submit.prevent="createTag">
    <label for="tagName">Tag Name:</label>
    <input id="tagName" class="form-control" v-model="tagName" required />

    <button class="btn btn-success" type="submit">Create Tag</button>
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

        this.tags.push(newTag);
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
