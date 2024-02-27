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
    class="btn btn-success"
    style="width: 100px; align-self: center"
    id="edit-submit-button"
    @click.stop="editNote"
  >
    Submit
  </button>
</template>

<script>
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
      localNote: this.selectedNote,
    };
  },
  emits: ["edited"],
  watch: {
    selectedNote(newVal) {
      this.localNote = newVal;
    },
  },
  methods: {
    edited() {
      this.$emit("edited");
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

        await response.json();

        this.edited();
      } catch (error) {
        console.error(error);
      }
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
</style>