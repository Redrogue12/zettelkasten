<template>
  <div class="container">
    <button class="btn btn-primary ml-3" @click.stop="create = true">
      Create Note
    </button>

    <div class="dashboard">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @click="viewNote(note)"
      />
    </div>

    <Dialog :open="view" @close-dialog="view = false">
      <font-awesome-icon
        class="dialog-edit-icon"
        icon="edit"
        @click.stop="editDialog(selectedNote)"
      />
      <h3>{{ selectedNote?.note_title }}</h3>
      <p>{{ selectedNote?.note_text }}</p>
    </Dialog>

    <Dialog :open="edit" @close-dialog="closeEdit">
      <EditNote :selectedNote="selectedNote" @edited="closeEdit" />
    </Dialog>
    <Dialog :open="create" @close-dialog="create = false">
      <CreateNote @created="onNoteCreated" />
    </Dialog>
  </div>
</template>

<script>
import NoteCard from "../components/NoteCard.vue";
import EditNote from "../components/EditNote.vue";
import CreateNote from "../components/CreateNote.vue";
import Dialog from "../components/Dialog.vue";

export default {
  name: "DashboardPage",
  components: {
    NoteCard,
    EditNote,
    CreateNote,
    Dialog,
  },
  data() {
    return {
      notes: [],
      selectedNote: null,
      edit: false,
      create: false,
      view: false,
    };
  },
  async created() {
    this.fetchNotes();
  },
  methods: {
    async fetchNotes() {
      try {
        const response = await fetch("http://localhost:3000/notes");
        this.notes = await response.json();
      } catch (error) {
        console.error("Failed to fetch notes");
      }
    },
    viewNote(note) {
      this.setNote(note);
      this.view = true;
    },
    setNote(note) {
      this.selectedNote = { ...note };
    },
    editDialog(note) {
      this.view = false;
      this.setNote(note);
      this.edit = true;
    },
    closeEdit() {
      this.selectedNote = null;
      this.edit = false;
      this.fetchNotes();
    },
    onNoteCreated() {
      this.create = false;
      this.fetchNotes();
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
}
.dialog-edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
