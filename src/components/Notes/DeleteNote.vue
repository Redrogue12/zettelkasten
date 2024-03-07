<template>
  <div class="d-flex flex-column justify-content-between h-100 flex-grow-1">
    <h2>
      Are you sure you want to delete this note: "{{ note?.note_title }}"?
    </h2>
    <div class="d-flex justify-content-center">
      <button
        class="btn btn-danger"
        @click.stop="
          deleteNote(note.note_id);
          $emit('deleted');
        "
      >
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
  methods: {
    ...mapActions(notesStore, ["deleteNote"]),
  },
};
</script>
