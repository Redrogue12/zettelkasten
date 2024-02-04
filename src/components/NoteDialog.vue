<template>
  <div class="dialog">
    <h2>Edit Note</h2>
    <div class="form-group">
      <label>
        <span>Title:</span>
        <input ref="titleInput" v-model="localNote.note_title" />
      </label>
      <label>
        <span>Note:</span>
        <textarea ref="textInput" v-model="localNote.note_text" />
      </label>
    </div>
    <button id="dialog-submit-button" @click="editNote">Submit</button>
    <button @click="closeDialog">Close</button>
    <p class="note-dates">
      Created: {{ new Date(selectedNote.date_created).toLocaleDateString() }}
      <br />
      Modified: {{ new Date(selectedNote.date_modified).toLocaleDateString() }}
    </p>
  </div>
</template>

<script>
export default {
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
      localNote: this.selectedNote,
    };
  },
  watch: {
    selectedNote(newVal) {
      this.localNote = newVal;
    },
  },
  methods: {
    editNote() {
      this.$emit("edit-note", this.localNote);
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
  mounted() {
    if (this.$refs.titleInput) {
      this.$refs.titleInput.focus();
    }
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
