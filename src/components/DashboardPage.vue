<template>
  <div class="dashboard">
    <div
      class="note-card"
      v-for="note in notes"
      :key="note.id"
    >
      <h2>{{ note.note_title }}</h2>
      <p>{{ note.note_text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Dashboard Page',
      notes: [],
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:3000/notes');
      this.notes = await response.json();
    } catch (error) {
      console.error('Failed to fetch notes');
    }
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.note-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  width: 200px;
}
</style>