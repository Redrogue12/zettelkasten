<template>
  <PageHeader
    page-type="Notes"
    :error="error"
    :user="user"
    :loading="loading"
    @create-clicked="create = true"
  >
    <div v-if="notes.length > 0" class="notes-container">
      <NoteCard
        v-for="(note, i) in notes"
        :index="i"
        :key="note.note_id"
        :note="note"
        @click="viewNote(note)"
      />
    </div>
    <div class="center-content" v-else>
      <h3 class="ml-3 text-muted">Click + to start writing your first note</h3>
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
  </PageHeader>
</template>

<script>
import {
  NoteCard,
  EditNote,
  CreateNote,
  ViewNote,
  DeleteNote,
} from "../components/Notes";
import PageHeader from "../components/PageHeader";
import Dialog from "../components/Dialog";

import { useNotesStore as notesStore } from "../stores/notesStore";
import { useUserStore as userStore } from "../stores/userStore";
import { mapState, mapActions } from "pinia";

export default {
  name: "NotesPage",
  components: {
    PageHeader,
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
      loading: true,
    };
  },
  async created() {
    await this.fetchNotes(this.user?.user_id);
    this.loading = false;
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
