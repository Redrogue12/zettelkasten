<template>
  <div
    id="deleteNote"
    class="d-flex flex-column justify-content-between h-100 flex-grow-1"
  >
    <h2>
      Are you sure you want to delete this note: "{{ note?.note_title }}"?
    </h2>
    <div v-if="error" id="delete-note-error" class="alert alert-danger mt-3">
      {{ this.error }}
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-danger" @click.stop="onDelete(note.note_id)">
        Yes
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useNotesStore as notesStore } from "../../stores/notesStore";
export default {
  name: "DeleteNote",
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      error: "",
    };
  },
  methods: {
    ...mapActions(notesStore, ["deleteNote"]),
    async onDelete(noteId) {
      if (!noteId) {
        this.error = "Note ID is required.";
        return;
      }
      try {
        await this.deleteNote(noteId);
        this.$emit("deleted");
      } catch (error) {
        this.error = "An error occurred while deleting the note.";
      }
    },
  },
};
</script>
