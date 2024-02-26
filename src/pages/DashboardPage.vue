<template>
  <div class="container" v-if="error">
    <h3>Failed to fetch notes</h3>
  </div>
  <div class="container" v-else>
    <font-awesome-icon
      class="m-3 mb-1 pointer fa-xl"
      icon="plus"
      @click.stop="create = true"
    />

    <div class="dashboard">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @click="viewNote(note)"
      />
    </div>

    <Dialog v-if="view" @close-dialog="view = false">
      <ViewNote
        :note="selectedNote"
        @edit-dialog="editDialog"
        @deleted="toggleDelete"
      />
    </Dialog>

    <Dialog v-if="edit" @close-dialog="closeEdit">
      <EditNote :selectedNote="selectedNote" @edited="closeEdit" />
    </Dialog>
    <Dialog v-if="create" @close-dialog="create = false">
      <CreateNote @created="onNoteCreated" />
    </Dialog>

    <!-- eslint-disable -->
    <Dialog v-if="delete" @close-dialog="deleted">
      <DeleteNote :note="selectedNote" @deleted="deleted" />
    </Dialog>
  </div>
</template>

<script>
import {
  NoteCard,
  EditNote,
  CreateNote,
  ViewNote,
  DeleteNote,
} from "../components/Notes";
import Dialog from "../components/Dialog.vue";

export default {
  name: "DashboardPage",
  components: {
    NoteCard,
    EditNote,
    CreateNote,
    ViewNote,
    DeleteNote,
    Dialog,
  },
  data() {
    return {
      error: false,
      notes: [],
      selectedNote: null,
      edit: false,
      create: false,
      view: false,
      delete: false,
    };
  },
  async created() {
    this.fetchNotes();
  },
  methods: {
    async fetchNotes() {
      try {
        const response = await fetch("http://localhost:3000/notes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.notes = await response.json();
      } catch (error) {
        console.error("Failed to fetch notes");
        this.error = true;
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
    toggleDelete() {
      this.delete = !this.delete;
    },
    deleted() {
      this.delete = false;
      this.view = false;
      this.selectedNote = null;
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
</style>
