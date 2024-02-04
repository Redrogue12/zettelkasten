<template>
  <div class="dashboard">
    <NoteCard
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @open-dialog="openDialog"
    />

    <NoteDialog
      v-if="selectedNote"
      :selectedNote="selectedNote"
      @close-dialog="closeDialog"
      @edit-note="editNote"
    />
  </div>
</template>

<script>
import NoteCard from "../components/NoteCard.vue";
import NoteDialog from "../components/NoteDialog.vue";

export default {
  components: {
    NoteCard,
    NoteDialog,
  },
  data() {
    return {
      name: "DashboardPage",
      notes: [],
      selectedNote: null,
    };
  },
  async created() {
    try {
      const response = await fetch("http://localhost:3000/notes");
      this.notes = await response.json();
    } catch (error) {
      console.error("Failed to fetch notes");
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
        const response = await fetch(
          `http://localhost:3000/notes/${this.selectedNote.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              note_title: this.selectedNote.note_title,
              note_text: this.selectedNote.note_text,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update note");
        } else console.log("Note updated successfully");

        const updatedNote = await response.json();

        // Update the note in the notes array
        const index = this.notes.findIndex(
          (note) => note.id === updatedNote.id
        );
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
</style>
