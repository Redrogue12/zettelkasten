<template>
  <div class="dashboard">
    <div class="note-card" v-for="note in notes" :key="note.id">
      <h2>{{ note.title }}</h2>
      <p>{{ note.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Dashboard Page',
      notes: [
        { id: 1, title: 'Note 1', content: 'This is note 1' },
        { id: 2, title: 'Note 2', content: 'This is note 2' },
        { id: 3, title: 'Note 3', content: 'This is note 3' },
        { id: 4, title: 'Note 4', content: 'This is note 4' },
        { id: 5, title: 'Note 5', content: 'This is note 5' },
        { id: 6, title: 'Note 6', content: 'This is note 6' },
        { id: 1, title: 'Note 1', content: 'This is note 1' },
        { id: 2, title: 'Note 2', content: 'This is note 2' },
        { id: 3, title: 'Note 3', content: 'This is note 3' },
        { id: 4, title: 'Note 4', content: 'This is note 4' },
        { id: 5, title: 'Note 5', content: 'This is note 5' },
        { id: 6, title: 'Note 6', content: 'This is note 6' },
        // Add more notes here...
      ],
    };
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