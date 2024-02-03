<template>
  <div class="tag-creation-page">
    <div>
      <h1>Tags</h1>
      <ul>
        <li v-for="tag in tags" :key="tag.id">{{ tag.tag_name }}</li>
      </ul>
    </div>

    <h1>Create a Tag</h1>

    <form @submit.prevent="createTag">
      <label for="tagName">Tag Name:</label>
      <input id="tagName" v-model="tagName" required />

      <button type="submit">Create Tag</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TagCreationPage',
  data() {
    return {
      tags: [],
      tagName: '',
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:3000/tags');

      if (!response.ok) {
        throw new Error('Failed to fetch tags');
      }

      this.tags = await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async createTag() {
      try {
        const response = await fetch('http://localhost:3000/tags', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tag_name: this.tagName,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create tag');
        }

        const newTag = await response.json();

        this.tags.push(newTag);
        this.tagName = '';
        alert('Tag created successfully!');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.tag-creation-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>