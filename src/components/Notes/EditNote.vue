<template>
  <h2>Edit Note</h2>
  <div class="form-group">
    <label class="mb-3">
      <span>Title:</span>
      <input
        class="form-control"
        ref="titleInput"
        v-model="localNote.note_title"
      />
    </label>
    <label class="mb-3">
      <span>Note:</span>
      <textarea
        class="form-control"
        cols="50"
        rows="10"
        ref="textInput"
        v-model="localNote.note_text"
      />
    </label>
  </div>
  <p class="note-dates">
    Created: {{ new Date(selectedNote.date_created).toLocaleDateString() }}
    <br />
    Modified: {{ new Date(selectedNote.date_modified).toLocaleDateString() }}
  </p>
  <button
    class="btn btn-success centered-btn"
    id="edit-submit-button"
    @click.stop="onEdit(localNote)"
  >
    Submit
  </button>
</template>

<script>
import { useNotesStore as notesStore } from "@/stores/notesStore";
import { mapActions } from "pinia";

export default {
  name: "EditNote",
  props: {
    selectedNote: {
      type: Object,
      required: true,
      default: () => ({ note_title: "", note_text: "" }),
      validator: function (value) {
        // If the value is null or undefined, it's not valid
        if (value == null) return false;

        // If the value is an object with note_title and note_text properties, it's valid
        return (
          typeof value === "object" &&
          "note_title" in value &&
          "note_text" in value &&
          "id" in value &&
          "date_created" in value &&
          "date_modified" in value
        );
      },
    },
  },
  data() {
    return {
      localNote: { ...this.selectedNote },
    };
  },
  emits: ["edited"],
  mounted() {
    if (this.$refs.titleInput) {
      this.$refs.titleInput.focus();
    }
  },
  methods: {
    ...mapActions(notesStore, ["editNote"]),
    onEdit(note) {
      this.editNote(note);
      this.$emit("edited");
    },
  },
};
</script>

<style scoped>
.form-group label {
  display: flex;
  width: 100%;
}

.form-group label span {
  width: 70px;
}
</style>
