<template>
  <div class="note-card" @click.stop="handleClick">
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
  emits: ["click"],
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
  width: 200px;
  cursor: pointer;
}

.note-dates {
  font-size: 0.8em;
  color: #888;
}
</style>
