<template>
  <div class="note-card" @click.stop="handleClick">
    <h5>{{ truncatedNoteTitle }}</h5>
    <p>{{ truncatedNoteText }}</p>
  </div>
</template>

<script>
export default {
  name: "NoteCard",
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  emits: ["click"],
  computed: {
    truncatedNoteText() {
      return this.note.note_text.length > 88
        ? this.note.note_text.substring(0, 88) + "..."
        : this.note.note_text;
    },
    truncatedNoteTitle() {
      return this.note.note_title.length > 23
        ? this.note.note_title.substring(0, 23) + "..."
        : this.note.note_title;
    },
  },
  methods: {
    handleClick() {
      this.$emit("click", this.note);
    },
  },
};
</script>

<style scoped>
.note-card {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  width: 250px;
  height: 125px;
  cursor: pointer;
}

.note-dates {
  font-size: 0.8em;
  color: #888;
}
</style>
