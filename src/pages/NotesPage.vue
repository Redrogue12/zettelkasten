<template>
  <div class="container" v-if="error">
    <h3>Failed to fetch notes</h3>
  </div>
  <div class="container" v-else>
    <p class="mt-3 mb-0 ml-3">Welcome, {{ user?.username }}!</p>
    <div class="d-flex align-items-baseline">
      <h1 class="m-3">Notes</h1>
      <font-awesome-icon
        class="pointer fa-xl"
        icon="plus"
        @click.stop="create = true"
      />
    </div>

    <div class="notes-container">
      <NoteCard
        v-for="(note, i) in notes"
        :index="i"
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
import Dialog from "../components/Dialog";

import { useNotesStore as notesStore } from "../stores/notesStore";
import { useUserStore as userStore } from "../stores/userStore";
import { mapState, mapActions } from "pinia";

export default {
  name: "NotesPage",
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
  computed: {
    ...mapState(notesStore, { notes: "getNotes", error: "getError" }),
    ...mapState(userStore, { user: "getUser" }),
  },
  methods: {
    ...mapActions(notesStore, ["fetchNotes"]),
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
    },
    toggleDelete() {
      this.delete = !this.delete;
    },
    deleted() {
      this.delete = false;
      this.view = false;
      this.selectedNote = null;
    },
    onNoteCreated() {
      this.create = false;
    },
  },
};
</script>

<style scoped>
.notes-container {
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 499px) {
  .notes-container {
    justify-content: center;
  }
}
</style>
