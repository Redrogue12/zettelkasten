<template>
  <div class="dashboard">
    <NoteCard v-for="note in notes" :key="note.id" :note="note" @open-dialog="openDialog" />

    <div class="dialog" v-if="selectedNote">
      <h2>Edit Note</h2>
      <div class="form-group">
        <label><span>Title:</span> <input v-model="selectedNote.note_title"></label>
        <label><span>Content:</span> <textarea v-model="selectedNote.note_text"></textarea></label>
      </div>
      <button @click="editNote">Submit</button>
      <button @click="closeDialog">Close</button>
      <p class="note-dates">
        Created: {{ new Date(selectedNote.date_created).toLocaleDateString() }}
        <br>
        Modified: {{ new Date(selectedNote.date_modified).toLocaleDateString() }}
      </p>
    </div>
  </div>
</template>

<script>
import NoteCard from '../components/NoteCard.vue';

export default {
  components: {
    NoteCard,
  },
  data() {
    return {
      name: 'DashboardPage',
      notes: [],
      selectedNote: null,
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
  methods: {
    openDialog(note) {
      this.selectedNote = { ...note };
    },
    closeDialog() {
      this.selectedNote = null;
    },
    async editNote() {
      try {
        const response = await fetch(`http://localhost:3000/notes/${this.selectedNote.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            note_title: this.selectedNote.note_title,
            note_text: this.selectedNote.note_text,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update note');
        } else console.log('Note updated successfully')

        const updatedNote = await response.json();

        // Update the note in the notes array
        const index = this.notes.findIndex(note => note.id === updatedNote.id);
        this.notes.splice(index, 1, updatedNote);

        this.closeDialog();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.form-group label {
  display: flex;
  width: 100%;
}

.form-group label span {
  width: 70px;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}
</style>