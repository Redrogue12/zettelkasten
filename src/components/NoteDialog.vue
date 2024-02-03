<template>
  <div class="dialog" v-if="selectedNote">
    <h2>Edit Note</h2>
    <div class="form-group">
      <label
        ><span>Title:</span>
        <input ref="titleInput" v-model="localNote.note_title" />
      </label>
      <label
        ><span>Content:</span>
        <textarea v-model="localNote.note_text"></textarea>
      </label>
    </div>
    <button @click="editNote">Submit</button>
    <button @click="$emit('closeDialog')">Close</button>
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
      required: false,
      default: null,
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
  },
  mounted() {
    this.$refs.titleInput?.focus();
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
