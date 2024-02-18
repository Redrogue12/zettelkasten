<template>
  <div class="container">
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
        @deleted="deleted"
      />
    </Dialog>

    <Dialog v-if="edit" @close-dialog="closeEdit">
      <EditNote :selectedNote="selectedNote" @edited="closeEdit" />
    </Dialog>
    <Dialog v-if="create" @close-dialog="create = false">
      <CreateNote @created="onNoteCreated" />
    </Dialog>
  </div>
</template>

<script>
import NoteCard from "../components/NoteCard.vue";
import EditNote from "../components/EditNote.vue";
import CreateNote from "../components/CreateNote.vue";
import ViewNote from "../components/ViewNote.vue";
import Dialog from "../components/Dialog.vue";

export default {
  name: "DashboardPage",
  components: {
    NoteCard,
    EditNote,
    CreateNote,
    ViewNote,
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
    deleted() {
      this.view = false;
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
