<template>
  <div class="note-card" @click="openDialog">
    <h2>{{ note.note_title }}</h2>
    <p>{{ note.note_text }}</p>
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
  methods: {
    openDialog() {
      this.$emit("open-dialog", this.note);
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
  width: 200px;
}

.note-dates {
  font-size: 0.8em;
  color: #888;
}
</style>
